from django.db import models
from django.conf import settings
from products.models import Product

class UserProductInteraction(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    view_count = models.PositiveIntegerField(default=0)
    purchase_count = models.PositiveIntegerField(default=0)
    last_interaction = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'product')

    def __str__(self):
        return f"{self.user.username} - {self.product.name}"

class ProductSimilarity(models.Model):
    product1 = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='similarities')
    product2 = models.ForeignKey(Product, on_delete=models.CASCADE)
    similarity_score = models.FloatField()

    class Meta:
        unique_together = ('product1', 'product2')

    def __str__(self):
        return f"{self.product1.name} - {self.product2.name}: {self.similarity_score}"