from django.urls import path
from .views import *

# URL patterns for user-related API endpoints
urlpatterns = [
    
    # Endpoint for user login, which uses the custom token view for JWT authentication
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    # Endpoint for user registration
    path('register/', registerUser, name='register'),

    # Endpoint to get the profile of the currently authenticated user
    path('profile/', getUserProfile, name="users-profile"),

    # Endpoint to update the profile of the currently authenticated user
    path('profile/update/', updateUserProfile, name="user-profile-update"),

    # Endpoint to get a list of all users (accessible only to admins)
    path('', getUsers, name="users"),

    # Endpoint to get the details of a specific user by their primary key (pk)
    path('<str:pk>/', getUserById, name='user'),

    # Endpoint to update a specific user, identified by their primary key (pk)
    path('update/<str:pk>/', updateUser, name='user-update'),

    # Endpoint to delete a specific user, identified by their primary key (pk)
    path('delete/<str:pk>/', deleteUser, name='user-delete'),
]
