from rest_framework import serializers
from .models import Post, Comment, Heart
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  
        fields = ['id', 'username']

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Add this line
    
    class Meta:
        model = Comment
        fields = ['id', 'text', 'created_at', 'user']


class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    hearts_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'text', 'image', 'created_at', 'updated_at', 'comments', 'hearts_count']

    def get_hearts_count(self, obj):
        return obj.hearts.count()


class HeartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Heart
        fields = ['id', 'post', 'user']
