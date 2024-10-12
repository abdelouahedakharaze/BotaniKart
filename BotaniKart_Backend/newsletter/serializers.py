from rest_framework import serializers
from .models import Subscriber, Newsletter

class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = ['email']

class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newsletter
        fields = ['id', 'title', 'content', 'created_at', 'sent_at']
        read_only_fields = ['created_at', 'sent_at']