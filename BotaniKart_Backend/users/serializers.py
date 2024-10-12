from rest_framework import serializers
from .models import CustomUser, Address

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'title', 'address_line_1', 'address_line_2', 'country', 'city', 'postal_code', 'landmark', 'phone_number']

class UserSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'bio', 'is_vendor', 'store_name', 'store_description', 'avatar', 'birth_of_date', 'phone_number', 'addresses']
        read_only_fields = ['id']