from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

# Serializer for user details
class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)  # Full name of the user
    _id = serializers.SerializerMethodField(read_only=True)  # User's ID
    isAdmin = serializers.SerializerMethodField(read_only=True)  # Admin status

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']  # Fields to include in the serialized output

    def get__id(self, obj):
        return obj.id  # Returns the user's ID

    def get_isAdmin(self, obj):
        return obj.is_staff  # Checks if the user is an admin

    def get_name(self, obj):
        name = obj.first_name  # Fetches the user's first name
        if name == '':
            name = obj.email  # Defaults to email if the name is empty
        return name


# Serializer for user details with a JWT token
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)  # JWT token for the user

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']  # Fields to include in the serialized output

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)  # Generates the JWT token
        return str(token.access_token)
