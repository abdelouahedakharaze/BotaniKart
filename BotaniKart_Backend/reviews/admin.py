from django.contrib import admin

# Register your models here.
from .models import Review

admin.site.register(Review)
# This code registers the Review model with the Django admin site.