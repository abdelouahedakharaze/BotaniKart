from django.urls import path
from .views import SubscribeView, UnsubscribeView, CreateNewsletterView, SendNewsletterView

urlpatterns = [
    path('subscribe/', SubscribeView.as_view(), name='subscribe'),
    path('unsubscribe/<str:email>/', UnsubscribeView.as_view(), name='unsubscribe'),
    path('create/', CreateNewsletterView.as_view(), name='create-newsletter'),
    path('send/<int:pk>/', SendNewsletterView.as_view(), name='send-newsletter'),
]