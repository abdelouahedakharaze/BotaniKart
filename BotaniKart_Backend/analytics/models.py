from django.db import models
from django.conf import settings
from products.models import Product

class PageView(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    page_url = models.URLField()
    timestamp = models.DateTimeField(auto_now_add=True)
    session_id = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.page_url} - {self.timestamp}"

class ProductView(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    session_id = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.product.name} - {self.timestamp}"

class SearchQuery(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    query = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    session_id = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.query} - {self.timestamp}"