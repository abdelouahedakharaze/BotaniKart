from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import PageView, ProductView, SearchQuery
from .serializers import PageViewSerializer, ProductViewSerializer, SearchQuerySerializer
from django.db.models import Count
from django.utils import timezone
from datetime import timedelta

class RecordPageViewView(generics.CreateAPIView):
    serializer_class = PageViewSerializer
    permission_classes = [permissions.AllowAny]

class RecordProductViewView(generics.CreateAPIView):
    serializer_class = ProductViewSerializer
    permission_classes = [permissions.AllowAny]

class RecordSearchQueryView(generics.CreateAPIView):
    serializer_class = SearchQuerySerializer
    permission_classes = [permissions.AllowAny]

class GetAnalyticsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        end_date = timezone.now()
        start_date = end_date - timedelta(days=30)

        page_views = PageView.objects.filter(timestamp__range=(start_date, end_date)).count()
        unique_visitors = PageView.objects.filter(timestamp__range=(start_date, end_date)).values('session_id').distinct().count()
        
        top_products = ProductView.objects.filter(timestamp__range=(start_date, end_date)) \
            .values('product__name') \
            .annotate(view_count=Count('id')) \
            .order_by('-view_count')[:5]
        
        top_searches = SearchQuery.objects.filter(timestamp__range=(start_date, end_date)) \
            .values('query') \
            .annotate(search_count=Count('id')) \
            .order_by('-search_count')[:5]

        return Response({
            'page_views': page_views,
            'unique_visitors': unique_visitors,
            'top_products': top_products,
            'top_searches': top_searches,
        })