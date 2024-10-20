from django.urls import path
from .views import (
    AddressManageView,
    RegisterView,
    LoginView,
    UserProfileUpdateView,
    UserProfileView,
    VendorRegistrationView,
    
)
from rest_framework_simplejwt.views import TokenRefreshView

# Define URL patterns for the application
urlpatterns = [
    # URL pattern for user registration
    path('register/', RegisterView.as_view(), name='register'),

    # URL pattern for user login
    path('login/', LoginView.as_view(), name='login'),

    # URL pattern for refreshing JWT tokens
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # URL pattern for updating user profile information
    path('profile/update/', UserProfileUpdateView.as_view(), name='profile_update'),

    path('profile/', UserProfileView.as_view(), name='user-profile'),

    # URL pattern for vendor registration
    path('vendor/register/', VendorRegistrationView.as_view(), name='vendor_register'),

    # URL pattern for managing a single address
    path('address/', AddressManageView.as_view(), name='address_detail'),
]
