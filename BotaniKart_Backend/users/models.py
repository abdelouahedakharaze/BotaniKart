from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    bio = models.TextField(blank=True)
    is_vendor = models.BooleanField(default=False)
    store_name = models.CharField(max_length=100, blank=True)
    store_description = models.TextField(blank=True)
    
    def __str__(self):
        return self.username