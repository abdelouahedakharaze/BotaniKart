from django.contrib import admin

# Register your models here.



from .models import Post, Comment, Heart

admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Heart)