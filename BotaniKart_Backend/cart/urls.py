from django.urls import path
from .views import CartView, AddToCartView, RemoveFromCartView, UpdateCartItemView

urlpatterns = [
    path('', CartView.as_view(), name='cart'),
    path('add/', AddToCartView.as_view(), name='add-to-cart'),
    path('remove/', RemoveFromCartView.as_view(), name='remove-from-cart'),
    path('update/', UpdateCartItemView.as_view(), name='update-cart-item'),
]