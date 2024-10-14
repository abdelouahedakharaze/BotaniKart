from django.contrib import admin

# Register your models here.
from .models import Order, OrderItem

admin.site.register(Order)
admin.site.register(OrderItem)
# This code registers the Order and OrderItem models with the Django admin site.