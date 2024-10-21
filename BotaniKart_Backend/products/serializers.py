# products/serializers.py

from rest_framework import serializers
from .models import Category, Product

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'parent']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), source='category', write_only=True)
    vendor_name = serializers.CharField(source='vendor.store_name', read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'quantity', 'image', 'category', 'category_id', 'vendor_name', 'created_at', 'updated_at']
        read_only_fields = ['vendor_name', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['vendor'] = self.context['request'].user.vendor_profile
        return super().create(validated_data)