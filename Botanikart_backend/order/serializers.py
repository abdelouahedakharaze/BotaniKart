from rest_framework import serializers
from .models import Order, OrderItem, ShippingAddress
from user.serializers import UserSerializer  # Import user serializer for nested user data

# Serializer for order items
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'  # Includes all fields in the serialized output


# Serializer for shipping addresses
class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'  # Includes all fields in the serialized output


# Serializer for orders
class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)  # Nested order items data
    shippingAddress = serializers.SerializerMethodField(read_only=True)  # Nested shipping address data
    user = serializers.SerializerMethodField(read_only=True)  # Nested user data

    class Meta:
        model = Order
        fields = '__all__'  # Includes all fields in the serialized output

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()  # Fetches all items in the order
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(obj.shippingaddress, many=False).data  # Fetches the shipping address
        except:
            address = False  # Defaults to False if no address is present
        return address

    def get_user(self, obj):
        user = obj.user  # Fetches the user who placed the order
        serializer = UserSerializer(user, many=False)
        return serializer.data
