from django.urls import path
from .views import CartItemList, CartItemDetail, ClearCart

urlpatterns = [
    path('', CartItemList.as_view(), name='cart-list'),
    path('add/', CartItemList.as_view(), name='cart-add'),
    path('update/<int:pk>/', CartItemDetail.as_view(), name='cart-update'),
    path('remove/<int:pk>/', CartItemDetail.as_view(), name='cart-remove'),
    path('clear/', ClearCart.as_view(), name='cart-clear'),
]