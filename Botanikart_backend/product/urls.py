from django.urls import path
from base.views import product_views as views

# URL patterns for product-related API endpoints
urlpatterns = [

    # Endpoint to get a list of all products
    path('', views.getProducts, name="products"),

    # Endpoint to create a new product
    path('create/', views.createProduct, name="product-create"),

    # Endpoint to upload an image for a product
    path('upload/', views.uploadImage, name="image-upload"),

    # Endpoint to create a review for a specific product, identified by its primary key (pk)
    path('<str:pk>/reviews/', views.createProductReview, name="create-review"),

    # Endpoint to get the top-rated products
    path('top/', views.getTopProducts, name='top-products'),

    # Endpoint to get details of a specific product, identified by its primary key (pk)
    path('<str:pk>/', views.getProduct, name="product"),

    # Endpoint to update the details of a specific product, identified by its primary key (pk)
    path('update/<str:pk>/', views.updateProduct, name="product-update"),

    # Endpoint to delete a specific product, identified by its primary key (pk)
    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),
]
