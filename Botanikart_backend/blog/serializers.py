from rest_framework import serializers
from .models import Post, Comment, Heart

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'text', 'created_at', 'user']
        read_only_fields = ['user'] 


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
