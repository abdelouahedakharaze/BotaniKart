from rest_framework import serializers
from products.models import Product

class ProductRecommendationSerializer(serializers.ModelSerializer):
    # Specify max_digits and decimal_places for the price field
    price = serializers.DecimalField(max_digits=10, decimal_places=2, source='skus.first.price', read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price']
