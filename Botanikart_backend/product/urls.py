from django.urls import path
from .views import *
# URL patterns for product-related API endpoints
urlpatterns = [

    # Endpoint to get a list of all products
    path('', getProducts, name="products"),

    # Endpoint to create a new product
    path('create/', createProduct, name="product-create"),

    # Endpoint to upload an image for a product
    path('upload/', uploadImage, name="image-upload"),

    # Endpoint to create a review for a specific product, identified by its primary key (pk)
    path('<str:pk>/reviews/', createProductReview, name="create-review"),

    # Endpoint to get the top-rated products
    path('top/', getTopProducts, name='top-products'),

    # Endpoint to get details of a specific product, identified by its primary key (pk)
    path('<str:pk>/', getProduct, name="product"),

    # Endpoint to update the details of a specific product, identified by its primary key (pk)
    path('update/<str:pk>/', updateProduct, name="product-update"),

    # Endpoint to delete a specific product, identified by its primary key (pk)
    path('delete/<str:pk>/', deleteProduct, name="product-delete"),
]
