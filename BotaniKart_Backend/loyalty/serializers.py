from rest_framework import serializers
from .models import LoyaltyProgram, LoyaltyMember, LoyaltyReward, LoyaltyTransaction

class LoyaltyProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoyaltyProgram
        fields = ['id', 'name', 'description', 'points_per_purchase']

class LoyaltyMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoyaltyMember
        fields = ['id', 'user', 'program', 'points', 'joined_at']
        read_only_fields = ['user', 'points', 'joined_at']

class LoyaltyRewardSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoyaltyReward
        fields = ['id', 'name', 'description', 'points_required', 'product', 'discount_percentage']

class LoyaltyTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoyaltyTransaction
        fields = ['id', 'points', 'description', 'created_at']