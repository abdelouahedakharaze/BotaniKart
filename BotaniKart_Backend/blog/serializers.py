from rest_framework import serializers
from .models import Post, Category, Tag, Comment
from users.serializers import UserSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']
        ref_name = 'BlogCategorySerializer'  # Unique ref_name

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']
        ref_name = 'BlogTagSerializer'  # Unique ref_name

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'content', 'created_at', 'updated_at', 'is_approved']
        read_only_fields = ['is_approved']
        ref_name = 'BlogCommentSerializer'  # Unique ref_name

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'content', 'author', 'category', 'tags', 'created_at', 'updated_at', 'published_at', 'is_published', 'comments']
        read_only_fields = ['slug']
        ref_name = 'BlogPostSerializer'  # Unique ref_name

    def create(self, validated_data):
        tags_data = self.context['request'].data.get('tags', [])
        category_data = self.context['request'].data.get('category')
        
        post = Post.objects.create(**validated_data)
        
        if category_data:
            category, _ = Category.objects.get_or_create(name=category_data)
            post.category = category
        
        for tag_name in tags_data:
            tag, _ = Tag.objects.get_or_create(name=tag_name)
            post.tags.add(tag)
        
        post.save()
        return post

    def update(self, instance, validated_data):
        tags_data = self.context['request'].data.get('tags', [])
        category_data = self.context['request'].data.get('category')
        
        instance = super().update(instance, validated_data)
        
        if category_data:
            category, _ = Category.objects.get_or_create(name=category_data)
            instance.category = category
        
        instance.tags.clear()
        for tag_name in tags_data:
            tag, _ = Tag.objects.get_or_create(name=tag_name)
            instance.tags.add(tag)
        
        instance.save()
        return instance
