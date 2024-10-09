from django.contrib import admin
from .models import Product, Purchase

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'seller', 'created_at', 'updated_at')
    list_filter = ('seller', 'created_at')
    search_fields = ('name', 'description', 'seller__username')

@admin.register(Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    list_display = ('product', 'buyer', 'quantity', 'total_price', 'purchase_date')
    list_filter = ('purchase_date', 'product', 'buyer')
    search_fields = ('product__name', 'buyer__username')