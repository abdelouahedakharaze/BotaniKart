from django.db import models
from django.contrib.auth.models import User
from product.models import Product

# Model for managing product reviews
class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)  # Product being reviewed
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)  # User who wrote the review
    name = models.CharField(max_length=200, null=True, blank=True)  # Reviewer's name
    rating = models.IntegerField(null=True, blank=True, default=0)  # Rating given to the product
    comment = models.TextField(null=True, blank=True)  # Review comments
    createdAt = models.DateTimeField(auto_now_add=True)  # Timestamp when the review was created
    _id = models.AutoField(primary_key=True, editable=False)  # Primary key

    def __str__(self):
        return str(self.rating)  # Display rating as string representation
