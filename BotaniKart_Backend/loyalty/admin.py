from django.contrib import admin

# Register your models here.
from .models import LoyaltyMember, LoyaltyProgram, LoyaltyReward, LoyaltyTransaction


admin.site.register(LoyaltyMember)
admin.site.register(LoyaltyProgram)
admin.site.register(LoyaltyReward)
admin.site.register(LoyaltyTransaction)
# This code registers the LoyaltyMember, LoyaltyProgram, LoyaltyReward, and LoyaltyTransaction models with the Django admin site.