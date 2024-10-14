from django.contrib import admin

# Register your models here.
from .models import Cart, CartItem

admin.site.register(Cart)
admin.site.register(CartItem)
# This code registers the Cart and CartItem models with the Django admin site.