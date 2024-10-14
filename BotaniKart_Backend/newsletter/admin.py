from django.contrib import admin

# Register your models here.
from .models import Newsletter, Subscriber

admin.site.register(Newsletter)
admin.site.register(Subscriber)