from django.db import models
from django.contrib.auth.models import User

# Model for managing product information
class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)  # User who added the product
    name = models.CharField(max_length=200, null=True, blank=True)  # Product name
    image = models.ImageField(null=True, blank=True, default='/placeholder.png')  # Product image
    brand = models.CharField(max_length=200, null=True, blank=True)  # Brand of the product
    category = models.CharField(max_length=200, null=True, blank=True)  # Product category
    description = models.TextField(null=True, blank=True)  # Product description
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)  # Average rating
    numReviews = models.IntegerField(null=True, blank=True, default=0)  # Number of reviews for the product
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)  # Price of the product
    countInStock = models.IntegerField(null=True, blank=True, default=0)  # Stock count
    createdAt = models.DateTimeField(auto_now_add=True)  # Timestamp when the product was added
    _id = models.AutoField(primary_key=True, editable=False)  # Primary key

    def __str__(self):
        return self.name  # Display product name as string representation


# Model for managing product reviews
class Review(models.Model):
    product = models.ForeignKey(
        Product, 
        on_delete=models.SET_NULL, 
        null=True, 
        related_name='reviews'  # Avoids reverse accessor conflicts
    )
    user = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        related_name='product_reviews'  # Avoids reverse accessor conflicts
    )
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)
