from django.db import models
from django.conf import settings
from products.models import Product

class LoyaltyProgram(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    points_per_purchase = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class LoyaltyMember(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    program = models.ForeignKey(LoyaltyProgram, on_delete=models.CASCADE)
    points = models.PositiveIntegerField(default=0)
    joined_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.program.name}"

class LoyaltyReward(models.Model):
    program = models.ForeignKey(LoyaltyProgram, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    points_required = models.PositiveIntegerField()
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    discount_percentage = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} - {self.points_required} points"

class LoyaltyTransaction(models.Model):
    member = models.ForeignKey(LoyaltyMember, on_delete=models.CASCADE)
    points = models.IntegerField()  # Can be positive (earned) or negative (redeemed)
    description = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.member.user.username} - {self.points} points - {self.description}"