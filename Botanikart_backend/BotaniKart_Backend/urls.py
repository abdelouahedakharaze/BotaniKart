from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView



from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
   openapi.Info(
      title="BotaniKart API",
      default_version='v1',
      description="API documentation for BotaniKart",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@botanikart.com"),
      license=openapi.License(name="MIT License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)
# Main backend URL Configuration
urlpatterns = [
    path('admin/', admin.site.urls),  # Admin panel access
    
    
    path('api/', include('blog.urls')),

    path('api/products/', include('product.urls')),  # Product-related endpoints
    path('api/users/', include('user.urls')),  # User-related endpoints
    path('api/orders/', include('order.urls')),  # Order-related endpoints
    path('swagger/', schema_view.as_view(), name='swagger'),
]

# Serving media files during development
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Serving static files
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
