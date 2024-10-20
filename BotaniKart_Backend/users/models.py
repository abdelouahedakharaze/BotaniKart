from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    """
    CustomUser model that extends Django's AbstractUser.
    
    This model represents regular users of the platform, 
    containing only essential fields like email, bio, avatar, etc.
    """
    email = models.EmailField(unique=True)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    birth_of_date = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    deleted_at = models.DateTimeField(null=True, blank=True)  # Soft deletion field
    
    def __str__(self):
        return self.username


class Vendor(models.Model):
    """
    Vendor model that links to CustomUser and adds store-specific information.
    
    This model is used for users who want to sell items on the platform.
    """
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='vendor_profile')
    store_name = models.CharField(max_length=100, blank=True)
    store_description = models.TextField(blank=True)
    paypal_email = models.EmailField(blank=True)
    paypal_client_id = models.CharField(max_length=255, blank=True)
    paypal_client_secret = models.CharField(max_length=255, blank=True)
    stripe_account_id = models.CharField(max_length=255, blank=True)
    
    def __str__(self):
        return f"Vendor: {self.store_name} ({self.user.username})"


class Address(models.Model):
    """
    Address model to store user addresses.
    
    This is simplified to only include key fields needed for address storage.
    """
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='address')
    address_line = models.CharField(max_length=255)  # Only one address line for simplicity
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=20)  # Phone number is required for shipping purposes
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(null=True, blank=True)  # Soft deletion field
    
    def __str__(self):
        return f"Address for {self.user.username}: {self.address_line}, {self.city}"
