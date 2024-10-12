from rest_framework import generics, permissions, status, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Product, Purchase, Coupon, Category, SubCategory, ProductAttribute, ProductSKU, Wishlist
from .serializers import ProductSerializer, PurchaseSerializer, CouponSerializer, CategorySerializer, SubCategorySerializer, ProductAttributeSerializer, ProductSKUSerializer, WishlistSerializer
from django.shortcuts import get_object_or_404
from payments.paypal import create_payment, execute_payment
from payments.stripe_utils import create_stripe_checkout_session, retrieve_stripe_session
from django.urls import reverse
from django.conf import settings
from django.db.models import Q

class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']

    def perform_create(self, serializer):
        serializer.save(vendor=self.request.user)

    def get_queryset(self):
        queryset = Product.objects.all()
        search_query = self.request.query_params.get('search', None)
        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) | 
                Q(description__icontains=search_query)
            )
        return queryset

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class PurchaseProduct(generics.CreateAPIView):
    serializer_class = PurchaseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        product = get_object_or_404(Product, pk=kwargs['pk'])
        quantity = int(request.data.get('quantity', 1))
        total_price = product.price * quantity

        purchase = Purchase.objects.create(
            product=product,
            buyer=request.user,
            quantity=quantity,
            total_price=total_price
        )

        serializer = self.get_serializer(purchase)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class UserPurchaseList(generics.ListAPIView):
    serializer_class = PurchaseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Purchase.objects.filter(buyer=self.request.user)

class VendorStatistics(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if not request.user.is_vendor:
            return Response({"error": "User is not a vendor"}, status=status.HTTP_403_FORBIDDEN)
        # Implement vendor statistics logic here
        return Response({"message": "Vendor statistics"})

class CreatePayPalPayment(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        quantity = int(request.data.get('quantity', 1))
        total = product.price * quantity

        payment = create_payment(product, quantity, request.build_absolute_uri(reverse('execute-paypal-payment')), request.build_absolute_uri('/'))

        if payment.create():
            for link in payment.links:
                if link.rel == "approval_url":
                    return Response({"approval_url": link.href})

        return Response({"error": "Failed to create PayPal payment"}, status=status.HTTP_400_BAD_REQUEST)

class ExecutePayPalPayment(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        payment_id = request.query_params.get('paymentId')
        payer_id = request.query_params.get('PayerID')

        if not payment_id or not payer_id:
            return Response({"error": "Missing payment information"}, status=status.HTTP_400_BAD_REQUEST)

        if execute_payment(payment_id, payer_id):
            # Create purchase record
            return Response({"message": "Payment executed successfully"})
        else:
            return Response({"error": "Failed to execute payment"}, status=status.HTTP_400_BAD_REQUEST)

class CreateStripeCheckoutSession(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        quantity = int(request.data.get('quantity', 1))
        
        success_url = request.build_absolute_uri(reverse('stripe-success'))
        cancel_url = request.build_absolute_uri(reverse('stripe-cancel'))
        
        checkout_session = create_stripe_checkout_session(product, quantity, success_url, cancel_url)
        
        if checkout_session:
            return Response({
                "session_id": checkout_session.id,
                "stripe_public_key": settings.STRIPE_PUBLISHABLE_KEY,
            })
        return Response({"error": "Failed to create Stripe checkout session"}, status=status.HTTP_400_BAD_REQUEST)

class StripeSuccessView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        session_id = request.GET.get('session_id')
        if not session_id:
            return Response({"error": "No session ID provided"}, status=status.HTTP_400_BAD_REQUEST)

        session = retrieve_stripe_session(session_id)
        if not session:
            return Response({"error": "Invalid session ID"}, status=status.HTTP_400_BAD_REQUEST)

        # Create purchase record
        line_item = session.line_items.data[0]
        product = get_object_or_404(Product, name=line_item.description)
        quantity = line_item.quantity
        total_price = line_item.amount_total / 100  # Convert cents to dollars

        purchase = Purchase.objects.create(
            product=product,
            buyer=request.user,
            quantity=quantity,
            total_price=total_price
        )

        return Response({"message": "Payment successful", "purchase_id": purchase.id})

class StripeCancelView(APIView):
    def get(self, request):
        return Response({"message": "Payment was cancelled"}, status=status.HTTP_400_BAD_REQUEST)

class CouponCreate(generics.CreateAPIView):
    serializer_class = CouponSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(vendor=self.request.user)

class CouponList(generics.ListAPIView):
    serializer_class = CouponSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Coupon.objects.filter(vendor=self.request.user)

class ApplyCoupon(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        code = request.data.get('code')
        product_id = request.data.get('product_id')
        
        try:
            coupon = Coupon.objects.get(code=code, is_active=True)
            product = Product.objects.get(id=product_id)
            
            if coupon.vendor != product.vendor:
                return Response({"error": "This coupon is not valid for this product"}, status=status.HTTP_400_BAD_REQUEST)
            
            discounted_price = product.price * (1 - coupon.discount / 100)
            return Response({"discounted_price": discounted_price})
        except Coupon.DoesNotExist:
            return Response({"error": "Invalid coupon code"}, status=status.HTTP_400_BAD_REQUEST)
        except Product.DoesNotExist:
            return Response({"error": "Invalid product"}, status=status.HTTP_400_BAD_REQUEST)

class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class SubCategoryList(generics.ListCreateAPIView):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ProductAttributeList(generics.ListCreateAPIView):
    queryset = ProductAttribute.objects.all()
    serializer_class = ProductAttributeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ProductSKUList(generics.ListCreateAPIView):
    queryset = ProductSKU.objects.all()
    serializer_class = ProductSKUSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class WishlistView(generics.ListCreateAPIView):
    serializer_class = WishlistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        product_id = self.request.data.get('product')
        product = get_object_or_404(Product, id=product_id)
        serializer.save(user=self.request.user, product=product)

class WishlistDetailView(generics.DestroyAPIView):
    queryset = Wishlist.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)