from django.contrib import admin

# Register your models here.
from .models import PageView, ProductView, SearchQuery

admin.site.register(PageView)
admin.site.register(ProductView)
admin.site.register(SearchQuery)
# This code registers the PageView, ProductView, and SearchQuery models with the Django admin site.