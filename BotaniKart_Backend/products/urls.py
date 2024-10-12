from django.urls import path
from .views import (
    ProductList, ProductDetail, PurchaseProduct, UserPurchaseList, 
    VendorStatistics, CreatePayPalPayment, ExecutePayPalPayment, 
    CreateStripeCheckoutSession, StripeSuccessView, StripeCancelView,
    CouponCreate, CouponList, ApplyCoupon, CategoryList, SubCategoryList,
    ProductAttributeList, ProductSKUList, WishlistView, WishlistDetailView
)

urlpatterns = [
    path('', ProductList.as_view(), name='product-list'),
    path('<int:pk>/', ProductDetail.as_view(), name='product-detail'),
    path('<int:pk>/purchase/', PurchaseProduct.as_view(), name='purchase-product'),
    path('purchases/', UserPurchaseList.as_view(), name='user-purchases'),
    path('vendor/statistics/', VendorStatistics.as_view(), name='vendor-statistics'),
    path('<int:pk>/create-paypal-payment/', CreatePayPalPayment.as_view(), name='create-paypal-payment'),
    path('execute-paypal-payment/', ExecutePayPalPayment.as_view(), name='execute-paypal-payment'),
    path('<int:pk>/create-stripe-session/', CreateStripeCheckoutSession.as_view(), name='create-stripe-session'),
    path('stripe-success/', StripeSuccessView.as_view(), name='stripe-success'),
    path('stripe-cancel/', StripeCancelView.as_view(), name='stripe-cancel'),
    path('coupons/create/', CouponCreate.as_view(), name='coupon-create'),
    path('coupons/', CouponList.as_view(), name='coupon-list'),
    path('coupons/apply/', ApplyCoupon.as_view(), name='apply-coupon'),
    path('categories/', CategoryList.as_view(), name='category-list'),
    path('subcategories/', SubCategoryList.as_view(), name='subcategory-list'),
    path('attributes/', ProductAttributeList.as_view(), name='attribute-list'),
    path('skus/', ProductSKUList.as_view(), name='sku-list'),
    path('wishlist/', WishlistView.as_view(), name='wishlist'),
    path('wishlist/<int:pk>/', WishlistDetailView.as_view(), name='wishlist-detail'),
]