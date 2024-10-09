from django.urls import path
from .views import ProductList, ProductDetail, PurchaseProduct, UserPurchaseList

urlpatterns = [
    path('', ProductList.as_view(), name='product-list'),
    path('<int:pk>/', ProductDetail.as_view(), name='product-detail'),
    path('<int:pk>/purchase/', PurchaseProduct.as_view(), name='purchase-product'),
    path('purchases/', UserPurchaseList.as_view(), name='user-purchases'),
]