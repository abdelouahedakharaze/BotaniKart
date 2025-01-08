from rest_framework import serializers
from .models import Product, Review

# Serializer for reviews
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'  # Includes all fields in the serialized output


# Serializer for products
class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)  # Nested reviews data

    class Meta:
        model = Product
        fields = '__all__'  # Includes all fields in the serialized output

    def get_reviews(self, obj):
        reviews = obj.review_set.all()  # Fetches all reviews related to the product
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data
