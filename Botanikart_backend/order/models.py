from django.db import models
from django.contrib.auth.models import User
from product.models import Product

# Model for managing orders
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)  # User who placed the order
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)  # Payment method used
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)  # Tax amount
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)  # Shipping cost
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)  # Total order price
    isPaid = models.BooleanField(default=False)  # Payment status
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)  # Payment timestamp
    isDelivered = models.BooleanField(default=False)  # Delivery status
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)  # Delivery timestamp
    createdAt = models.DateTimeField(auto_now_add=True)  # Timestamp when the order was created
    _id = models.AutoField(primary_key=True, editable=False)  # Primary key

    def __str__(self):
        return str(self.createdAt)  # Display created timestamp as string representation

# Model for managing items in an order
class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)  # Product in the order
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)  # Order this item belongs to
    name = models.CharField(max_length=200, null=True, blank=True)  # Product name
    qty = models.IntegerField(null=True, blank=True, default=0)  # Quantity ordered
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)  # Price of the item
    image = models.CharField(max_length=200, null=True, blank=True)  # Image of the product
    _id = models.AutoField(primary_key=True, editable=False)  # Primary key

    def __str__(self):
        return str(self.name)  # Display product name as string representation

# Model for managing shipping address details
class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)  # Order this address belongs to
    address = models.CharField(max_length=200, null=True, blank=True)  # Shipping address
    city = models.CharField(max_length=200, null=True, blank=True)  # City of delivery
    postalCode = models.CharField(max_length=200, null=True, blank=True)  # Postal code
    country = models.CharField(max_length=200, null=True, blank=True)  # Country of delivery
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)  # Additional shipping cost
    _id = models.AutoField(primary_key=True, editable=False)  # Primary key

    def __str__(self):
        return str(self.address)  # Display address as string representation
