from django.contrib import admin

# Register your models here.
from .models import Post, Comment, Tag, Category 

admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Tag)
admin.site.register(Category)
# This code registers the Post, Comment, Tag, and Category models with the Django admin site.