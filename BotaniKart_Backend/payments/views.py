import stripe
import paypalrestsdk
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Payment
from .serializers import PaymentSerializer
from orders.models import Order

# Configure Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY

# Configure PayPal
paypalrestsdk.configure({
    "mode": settings.PAYPAL_MODE,  # "sandbox" or "live"
    "client_id": settings.PAYPAL_CLIENT_ID,
    "client_secret": settings.PAYPAL_CLIENT_SECRET
})

class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'])
    def stripe_payment(self, request):
        # Get the order ID from the request data
        order_id = request.data.get('order_id')
        
        try:
            # Retrieve the order
            order = Order.objects.get(id=order_id, user=request.user)
        except Order.DoesNotExist:
            return Response({"detail": "Order not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            # Create a Stripe PaymentIntent
            intent = stripe.PaymentIntent.create(
                amount=int(order.total_price * 100),  # Stripe expects amount in cents
                currency='usd',
                customer=request.user.stripe_customer_id,
                metadata={'order_id': order.id}
            )
            
            # Create a pending Payment object
            Payment.objects.create(
                user=request.user,
                order=order,
                amount=order.total_price,
                payment_method='stripe',
                transaction_id=intent.id,
                status='pending'
            )
            
            # Return the client secret to the frontend
            return Response({'client_secret': intent.client_secret})
        except stripe.error.StripeError as e:
            # Handle any Stripe errors
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def paypal_payment(self, request):
        # Get the order ID from the request data
        order_id = request.data.get('order_id')
        
        try:
            # Retrieve the order
            order = Order.objects.get(id=order_id, user=request.user)
        except Order.DoesNotExist:
            return Response({"detail": "Order not found."}, status=status.HTTP_404_NOT_FOUND)

        # Create PayPal payment
        payment = paypalrestsdk.Payment({
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:8000/payment/execute",
                "cancel_url": "http://localhost:8000/payment/cancel"
            },
            "transactions": [{
                "amount": {
                    "total": str(order.total_price),
                    "currency": "USD"
                },
                "description": f"Payment for Order {order.id}"
            }]
        })

        if payment.create():
            # Payment created successfully
            # Create a pending Payment object
            Payment.objects.create(
                user=request.user,
                order=order,
                amount=order.total_price,
                payment_method='paypal',
                transaction_id=payment.id,
                status='pending'
            )
            
            # Extract approval URL to redirect the user
            for link in payment.links:
                if link.rel == "approval_url":
                    approval_url = str(link.href)
                    return Response({"approval_url": approval_url})
        else:
            return Response({"detail": payment.error}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def confirm_stripe_payment(self, request):
        payment_intent_id = request.data.get('payment_intent_id')
        
        try:
            # Retrieve the PaymentIntent from Stripe
            intent = stripe.PaymentIntent.retrieve(payment_intent_id)
            
            # Get the corresponding Payment object
            payment = Payment.objects.get(transaction_id=payment_intent_id)
            
            if intent.status == 'succeeded':
                # Update Payment status
                payment.status = 'completed'
                payment.save()
                
                # Update Order status
                payment.order.status = 'processing'
                payment.order.save()
                
                serializer = self.get_serializer(payment)
                return Response(serializer.data)
            else:
                # Update Payment status to failed
                payment.status = 'failed'
                payment.save()
                return Response({"detail": "Payment failed."}, status=status.HTTP_400_BAD_REQUEST)
        except stripe.error.StripeError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def execute_paypal_payment(self, request):
        payment_id = request.query_params.get('paymentId')
        payer_id = request.query_params.get('PayerID')
        
        payment = paypalrestsdk.Payment.find(payment_id)
        
        if payment.execute({"payer_id": payer_id}):
            # Payment executed successfully
            # Update the corresponding Payment object
            try:
                db_payment = Payment.objects.get(transaction_id=payment_id)
                db_payment.status = 'completed'
                db_payment.save()
                
                # Update Order status
                db_payment.order.status = 'processing'
                db_payment.order.save()
                
                serializer = self.get_serializer(db_payment)
                return Response(serializer.data)
            except Payment.DoesNotExist:
                return Response({"detail": "Payment not found."}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Payment execution failed
            return Response({"detail": payment.error}, status=status.HTTP_400_BAD_REQUEST)