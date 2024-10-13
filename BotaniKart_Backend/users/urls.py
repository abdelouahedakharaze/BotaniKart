from django.urls import path
from .views import RegisterView, LoginView, UpdateVendorPayment, AddressListCreateView, AddressDetailView
from rest_framework_simplejwt.views import TokenRefreshView

# Define URL patterns for the application
urlpatterns = [
    # URL pattern for user registration
    path('register/', RegisterView.as_view(), name='register'),
    
    # URL pattern for user login
    path('login/', LoginView.as_view(), name='login'),
    
    # URL pattern for refreshing JWT tokens
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # URL pattern for updating vendor payment information
    path('update-payment-info/', UpdateVendorPayment.as_view(), name='update-payment-info'),
]