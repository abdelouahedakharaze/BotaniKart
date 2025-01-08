from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer, UserSerializerWithToken

# Custom JWT token serializer to include additional user data
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)  # Get the default token data
        serializer = UserSerializerWithToken(self.user).data  # Add user details to the token
        for k, v in serializer.items():
            data[k] = v
        return data


# Custom JWT token view
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer  # Use the custom serializer


# Register a new user
@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        # Create a new user with the provided data
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])  # Hash the password
        )
        serializer = UserSerializerWithToken(user, many=False)  # Serialize the new user
        return Response(serializer.data)
    except:
        # Handle cases where the email is already in use
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# Update the logged-in user's profile
@api_view(['PUT'])
@permission_classes([IsAuthenticated])  # Requires authentication
def updateUserProfile(request):
    user = request.user  # Get the logged-in user
    serializer = UserSerializerWithToken(user, many=False)  # Serialize the user
    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    # Update password if provided
    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()  # Save the updated user
    return Response(serializer.data)


# Get the logged-in user's profile
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Requires authentication
def getUserProfile(request):
    user = request.user  # Get the logged-in user
    serializer = UserSerializer(user, many=False)  # Serialize the user
    return Response(serializer.data)


# Get all users (Admin only)
@api_view(['GET'])
@permission_classes([IsAdminUser])  # Requires admin permissions
def getUsers(request):
    users = User.objects.all()  # Fetch all users
    serializer = UserSerializer(users, many=True)  # Serialize the list of users
    return Response(serializer.data)


# Get a user by their ID (Admin only)
@api_view(['GET'])
@permission_classes([IsAdminUser])  # Requires admin permissions
def getUserById(request, pk):
    user = User.objects.get(id=pk)  # Fetch the user by ID
    serializer = UserSerializer(user, many=False)  # Serialize the user
    return Response(serializer.data)


# Update a user by ID (Admin only)
@api_view(['PUT'])
@permission_classes([IsAuthenticated])  # Requires authentication
def updateUser(request, pk):
    user = User.objects.get(id=pk)  # Fetch the user by ID
    data = request.data

    # Update user details
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']  # Update admin status
    user.save()  # Save the updated user

    serializer = UserSerializer(user, many=False)  # Serialize the updated user
    return Response(serializer.data)


# Delete a user by ID (Admin only)
@api_view(['DELETE'])
@permission_classes([IsAdminUser])  # Requires admin permissions
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)  # Fetch the user by ID
    userForDeletion.delete()  # Delete the user
    return Response('User was deleted')
