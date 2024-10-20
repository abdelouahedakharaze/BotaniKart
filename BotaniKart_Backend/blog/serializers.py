from rest_framework import serializers
from .models import Post, Category, Tag, Comment
from users.serializers import UserSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']
        read_only_fields = ['slug']
        ref_name = 'BlogCategorySerializer'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']
        read_only_fields = ['slug']

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'author', 'content', 'created_at', 'updated_at', 'is_approved']
        read_only_fields = ['is_approved']

class PostSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    author = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    category_name = serializers.CharField(write_only=True, required=False, allow_null=True)
    tag_names = serializers.ListField(child=serializers.CharField(), write_only=True, required=False)  # Accepting tag names

    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'content', 'author', 'category', 'category_name', 'tags', 'tag_names', 'created_at', 'updated_at', 'published_at', 'is_published', 'comments']
        read_only_fields = ['slug', 'author']

    def create(self, validated_data):
        category_name = validated_data.pop('category_name', None)
        tag_names = validated_data.pop('tag_names', [])  # Get tag names

        post = Post.objects.create(**validated_data)

        # Handle category creation or fetching by name
        if category_name:
            category, _ = Category.objects.get_or_create(name=category_name)
            post.category = category

        # Create or get tags by name
        for tag_name in tag_names:
            tag, _ = Tag.objects.get_or_create(name=tag_name)
            post.tags.add(tag)

        post.save()
        return post

    def update(self, instance, validated_data):
        category_name = validated_data.pop('category_name', None)
        tag_names = validated_data.pop('tag_names', None)  # Get tag names

        instance = super().update(instance, validated_data)

        # Update category if a new name is provided
        if category_name is not None:
            category, _ = Category.objects.get_or_create(name=category_name)
            instance.category = category

        # Update tags by name
        if tag_names is not None:
            instance.tags.clear()  # Clear existing tags
            for tag_name in tag_names:
                tag, _ = Tag.objects.get_or_create(name=tag_name)
                instance.tags.add(tag)

        instance.save()
        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['category'] = CategorySerializer(instance.category).data if instance.category else None
        representation['tags'] = TagSerializer(instance.tags.all(), many=True).data  # Ensure .all() is called here
        return representation
