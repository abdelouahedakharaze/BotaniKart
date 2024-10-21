from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer
from cart.models import Cart

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def create(self, request):
        cart = Cart.objects.get(user=request.user)
        cart_items = cart.items.filter(is_wishlist_item=False)
        
        if not cart_items.exists():
            return Response({"detail": "Your cart is empty."}, status=status.HTTP_400_BAD_REQUEST)
        
        order_data = request.data
        order_data['user'] = request.user.id
        
        items_data = [
            {
                'product': item.product.id,
                'quantity': item.quantity,
                'price': item.product.price
            } for item in cart_items
        ]
        
        serializer = self.get_serializer(data=order_data, context={'items': items_data})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        cart_items.delete()
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class OrderItemViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return OrderItem.objects.filter(order__user=self.request.user)