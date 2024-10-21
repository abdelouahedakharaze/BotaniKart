from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PaymentViewSet

router = DefaultRouter()
router.register(r'payments', PaymentViewSet, basename='payment')

urlpatterns = [
    path('', include(router.urls)),
    path('stripe/', PaymentViewSet.as_view({'post': 'stripe_payment'}), name='stripe-payment'),
    path('paypal/', PaymentViewSet.as_view({'post': 'paypal_payment'}), name='paypal-payment'),
    path('stripe/confirm/', PaymentViewSet.as_view({'post': 'confirm_stripe_payment'}), name='confirm-stripe-payment'),
    path('paypal/execute/', PaymentViewSet.as_view({'get': 'execute_paypal_payment'}), name='execute-paypal-payment'),
]