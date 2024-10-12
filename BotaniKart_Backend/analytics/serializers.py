from rest_framework import serializers
from .models import PageView, ProductView, SearchQuery

class PageViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageView
        fields = ['page_url', 'session_id']

class ProductViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductView
        fields = ['product', 'session_id']

class SearchQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchQuery
        fields = ['query', 'session_id']