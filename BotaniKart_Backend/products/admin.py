from django.contrib import admin

# Register your models here.
from  .models import (Product, Category, SubCategory,
                      ProductAttribute, Coupon,ProductSKU,
                      Purchase,Coupon,Wishlist)



admin.site.register(Product)
admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(ProductAttribute)
# admin.site.register(Coupon)
admin.site.register(ProductSKU)
admin.site.register(Purchase)
admin.site.register(Coupon)
admin.site.register(Wishlist)
# This code registers the Product, Category, SubCategory, ProductAttribute, Coupon, ProductSKU, Purchase, coupon, and Wishlist models with the Django admin site.