from rest_framework import serializers
from .models import Product, Purchase, Coupon, Category, SubCategory, ProductAttribute, ProductSKU, Wishlist
from users.serializers import UserSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ['id', 'parent', 'name', 'description']

class ProductAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAttribute
        fields = ['id', 'type', 'value']

class ProductSKUSerializer(serializers.ModelSerializer):
    size_attribute = ProductAttributeSerializer(read_only=True)
    color_attribute = ProductAttributeSerializer(read_only=True)

    class Meta:
        model = ProductSKU
        fields = ['id', 'sku', 'price', 'quantity', 'size_attribute', 'color_attribute']

class ProductSerializer(serializers.ModelSerializer):
    vendor = UserSerializer(read_only=True)
    category = SubCategorySerializer(read_only=True)
    skus = ProductSKUSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'summary', 'cover', 'vendor', 'category', 'skus', 'created_at', 'updated_at']

class PurchaseSerializer(serializers.ModelSerializer):
    buyer = UserSerializer(read_only=True)
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Purchase
        fields = ['id', 'product', 'buyer', 'quantity', 'total_price', 'purchase_date']

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ['id', 'code', 'discount', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class WishlistSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Wishlist
        fields = ['id', 'product', 'created_at']