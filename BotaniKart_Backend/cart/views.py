from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import CartItem
from .serializers import CartItemSerializer

class CartItemList(generics.ListCreateAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CartItemDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

class ClearCart(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        CartItem.objects.filter(user=request.user).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)