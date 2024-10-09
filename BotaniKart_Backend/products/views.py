from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Product, Purchase
from .serializers import ProductSerializer, PurchaseSerializer
from django.shortcuts import get_object_or_404

class IsSellerOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.is_seller

class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsSellerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsSellerOrReadOnly]

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