from rest_framework import serializers
from .models import Order, OrderItem
from products.serializers import ProductSKUSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product_sku = ProductSKUSerializer(read_only=True)
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product_sku', 'quantity', 'price', 'subtotal']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['subtotal'] = instance.subtotal()
        return representation

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'status', 'total_price', 'items', 'created_at', 'updated_at',
                  'shipping_address', 'shipping_city', 'shipping_country', 'shipping_zip_code']
        read_only_fields = ['user', 'total_price', 'created_at', 'updated_at']