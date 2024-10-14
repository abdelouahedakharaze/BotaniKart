from django.contrib import admin

# Register your models here.

from .models import UserProductInteraction,ProductSimilarity


admin.site.register(UserProductInteraction)
admin.site.register(ProductSimilarity)
# This code registers the UserProductInteraction and ProductSimilarity models with the Django admin site.