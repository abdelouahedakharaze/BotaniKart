from rest_framework import serializers
from .models import Cart, CartItem
from products.serializers import ProductSKUSerializer

class CartItemSerializer(serializers.ModelSerializer):
    product_sku = ProductSKUSerializer(read_only=True)
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product_sku', 'quantity', 'subtotal']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['subtotal'] = instance.subtotal()
        return representation

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'total_price', 'created_at', 'updated_at']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['total_price'] = instance.total_price()
        return representation