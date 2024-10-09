from rest_framework import serializers
from .models import Product, Purchase

class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.ReadOnlyField(source='seller.username')

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'seller', 'created_at', 'updated_at']

class PurchaseSerializer(serializers.ModelSerializer):
    buyer = serializers.ReadOnlyField(source='buyer.username')
    product = serializers.ReadOnlyField(source='product.name')

    class Meta:
        model = Purchase
        fields = ['id', 'product', 'buyer', 'quantity', 'total_price', 'purchase_date']