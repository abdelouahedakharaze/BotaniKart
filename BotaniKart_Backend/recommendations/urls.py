from django.urls import path
from .views import RecordProductInteractionView, GetProductRecommendationsView

urlpatterns = [
    path('record-interaction/', RecordProductInteractionView.as_view(), name='record-interaction'),
    path('get-recommendations/', GetProductRecommendationsView.as_view(), name='get-recommendations'),
]