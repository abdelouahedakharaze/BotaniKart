from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Review
from .serializers import ReviewSerializer
from products.models import Product

class CreateReviewView(generics.CreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        product_id = self.kwargs.get('product_id')
        product = Product.objects.get(id=product_id)
        serializer.save(user=self.request.user, product=product)

class UpdateReviewView(generics.UpdateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Review.objects.all()

    def get_object(self):
        return Review.objects.get(
            user=self.request.user,
            product_id=self.kwargs.get('product_id')
        )

class DeleteReviewView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Review.objects.all()

    def get_object(self):
        return Review.objects.get(
            user=self.request.user,
            product_id=self.kwargs.get('product_id')
        )

class ProductReviewsView(generics.ListAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        product_id = self.kwargs.get('product_id')
        return Review.objects.filter(product_id=product_id)