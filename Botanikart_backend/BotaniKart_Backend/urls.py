from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

# Main backend URL Configuration
urlpatterns = [
    path('admin/', admin.site.urls),  # Admin panel access
    
    # API endpoints for different apps
    path('api/products/', include('base.urls.product_urls')),  # Product-related endpoints
    path('api/users/', include('base.urls.user_urls')),  # User-related endpoints
    path('api/orders/', include('base.urls.order_urls')),  # Order-related endpoints
]

# Serving media files during development
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Serving static files
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
