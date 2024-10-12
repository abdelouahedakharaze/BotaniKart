from django.urls import path
from .views import RecordPageViewView, RecordProductViewView, RecordSearchQueryView, GetAnalyticsView

urlpatterns = [
    path('record-page-view/', RecordPageViewView.as_view(), name='record-page-view'),
    path('record-product-view/', RecordProductViewView.as_view(), name='record-product-view'),
    path('record-search-query/', RecordSearchQueryView.as_view(), name='record-search-query'),
    path('get-analytics/', GetAnalyticsView.as_view(), name='get-analytics'),
]