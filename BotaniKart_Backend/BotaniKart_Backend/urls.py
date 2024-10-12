from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from utils.translation import LanguageView

# Schema view for Swagger
schema_view = get_schema_view(
   openapi.Info(
      title="Your API Title",
      default_version='v1',
      description="API documentation for your project",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@yourapi.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/products/', include('products.urls')),
    path('api/blog/', include('blog.urls')),
    path('api/cart/', include('cart.urls')),
    path('api/orders/', include('orders.urls')),
    path('api/reviews/', include('reviews.urls')),
    path('api/newsletter/', include('newsletter.urls')),
    path('api/recommendations/', include('recommendations.urls')),
    path('api/analytics/', include('analytics.urls')),
    path('api/loyalty/', include('loyalty.urls')),
    path('api/social/', include('social.urls')),
    path('api/language/', LanguageView.as_view(), name='language-test'),

    # Swagger UI
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    # Redoc UI
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
