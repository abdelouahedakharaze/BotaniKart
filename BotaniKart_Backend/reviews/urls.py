from django.urls import path
from .views import CreateReviewView, UpdateReviewView, DeleteReviewView, ProductReviewsView

urlpatterns = [
    path('product/<int:product_id>/create/', CreateReviewView.as_view(), name='create-review'),
    path('product/<int:product_id>/update/', UpdateReviewView.as_view(), name='update-review'),
    path('product/<int:product_id>/delete/', DeleteReviewView.as_view(), name='delete-review'),
    path('product/<int:product_id>/list/', ProductReviewsView.as_view(), name='product-reviews'),
]