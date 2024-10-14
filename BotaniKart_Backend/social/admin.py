from django.contrib import admin

# Register your models here.
from .models import Share,SocialPost,Like,Comment


admin.site.register(Share)
admin.site.register(SocialPost)
admin.site.register(Like)
admin.site.register(Comment)
# This code registers the Share, SocialPost, Like, and Comment models with the Django admin site.