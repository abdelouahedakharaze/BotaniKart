from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser, Address, Vendor

class AddressSerializer(serializers.ModelSerializer):
    """
    Serializer for the Address model.
    
    Converts Address model instances into JSON format and vice versa.
    This is simplified to only include the essential fields for storing addresses.
    """
    class Meta:
        model = Address
        fields = ['id', 'address_line', 'city', 'country', 'postal_code', 'phone_number']

class VendorSerializer(serializers.ModelSerializer):
    """
    Serializer for the Vendor model.
    
    Handles vendor-specific information like store details and payment info.
    """
    class Meta:
        model = Vendor
        fields = ['store_name', 'store_description', 'paypal_email', 'paypal_client_id', 'paypal_client_secret', 'stripe_account_id']

class UserSerializer(serializers.ModelSerializer):
    address = AddressSerializer(read_only=True)  # Changed from addresses to address
    vendor_profile = VendorSerializer(read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'bio', 
                  'avatar', 'birth_of_date', 'phone_number', 'address', 'vendor_profile']
        read_only_fields = ['id', 'address', 'vendor_profile']



class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for registering new users.
    
    This ensures that password fields match and creates a new user.
    """
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'password2', 'first_name', 'last_name']

    def validate(self, data):
        """
        Check that the two passwords match.
        """
        if data['password'] != data['password2']:
            raise serializers.ValidationError("The two password fields didn't match.")
        return data

    def create(self, validated_data):
        """
        Create a new CustomUser instance.
        """
        validated_data.pop('password2')  # Remove password2 since it's not needed for user creation
        user = CustomUser.objects.create_user(**validated_data)
        return user

class VendorRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for creating a vendor profile for an existing user.
    
    This allows regular users to become vendors by creating a linked Vendor profile.
    """
    class Meta:
        model = Vendor
        fields = ['store_name', 'store_description', 'paypal_email', 
                  'paypal_client_id', 'paypal_client_secret', 'stripe_account_id']

    def create(self, validated_data):
        """
        Create a Vendor profile for an existing user.
        """
        user = self.context['request'].user  # Get the current authenticated user

        # Check if the user already has a vendor profile
        if hasattr(user, 'vendor_profile'):
            raise serializers.ValidationError("User is already a vendor.")

        # Create a new Vendor profile
        vendor_profile = Vendor.objects.create(user=user, **validated_data)
        return vendor_profile

class UserLoginSerializer(serializers.Serializer):
    """
    Serializer for logging in users.
    
    This checks if the provided credentials are correct and returns the user.
    """
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        """
        Authenticate the user with the given username and password.
        """
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
