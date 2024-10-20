from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser, Address
from .serializers import UserSerializer, UserRegistrationSerializer, UserLoginSerializer, VendorRegistrationSerializer, AddressSerializer

class RegisterView(generics.CreateAPIView):
    """
    View for user registration.

    Allows new users to register and automatically generates JWT tokens.
    """
    queryset = CustomUser.objects.all()  # Queryset for all users
    permission_classes = (permissions.AllowAny,)  # Allow any user to access this view
    serializer_class = UserRegistrationSerializer  # Serializer for user registration

    def create(self, request, *args, **kwargs):
        """
        Handles user registration.

        Validates the incoming data and creates a new user.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # Validate the data
        user = serializer.save()  # Save the new user
        refresh = RefreshToken.for_user(user)  # Create tokens for the user
        return Response({
            "user": UserSerializer(user).data,  # Return user data
            "refresh": str(refresh),  # Return refresh token
            "access": str(refresh.access_token),  # Return access token
        }, status=status.HTTP_201_CREATED)  # Respond with 201 Created

class LoginView(generics.GenericAPIView):
    """
    View for user login.

    Authenticates users and generates JWT tokens.
    """
    serializer_class = UserLoginSerializer  # Serializer for user login
    permission_classes = (permissions.AllowAny,)  # Allow any user to access this view

    def post(self, request):
        """
        Handles user login.

        Validates the credentials and returns tokens.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # Validate the data
        user = serializer.validated_data  # Retrieve validated user data
        refresh = RefreshToken.for_user(user)  # Create tokens for the user
        return Response({
            "user": UserSerializer(user).data,  # Return user data
            "refresh": str(refresh),  # Return refresh token
            "access": str(refresh.access_token),  # Return access token
        })
class VendorRegistrationView(generics.CreateAPIView):
    """
    View for vendor registration.

    Allows users to become vendors and provide their store and payment details.
    """
    permission_classes = (permissions.IsAuthenticated,)  # Only authenticated users can access this view
    serializer_class = VendorRegistrationSerializer  # Serializer for vendor registration

    def create(self, request, *args, **kwargs):
        """
        Handles vendor registration.

        Validates the incoming data and creates a vendor profile.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # Validate the data
        vendor_profile = serializer.save()  # Create vendor profile linked to the current user
        return Response({
            "message": "Vendor profile created successfully.",
            "vendor": serializer.data
        }, status=status.HTTP_201_CREATED)  # Respond with success message

class UserProfileUpdateView(generics.UpdateAPIView):
    """
    View for updating user profile information.

    Allows authenticated users to update their own information.
    """
    permission_classes = [permissions.IsAuthenticated]  # Only authenticated users can access this view
    serializer_class = UserSerializer  # Serializer for user profile updates

    def get_object(self):
        """
        Returns the current authenticated user.
        """
        return self.request.user  # Retrieve the authenticated user

    def update(self, request, *args, **kwargs):
        """
        Updates the user profile with validated data.
        
        This method allows partial updates, meaning only the fields
        provided in the request will be updated in the user profile.
        """
        user = self.get_object()  # Get the authenticated user
        serializer = self.get_serializer(user, data=request.data, partial=True)  # Allow partial updates
        
        serializer.is_valid(raise_exception=True)  # Validate the data
        serializer.save()  # Save the updated user information
        
        return Response(serializer.data)  # Respond with updated user data

class UserProfileView(generics.RetrieveAPIView):
    """
    Retrieve the authenticated user's profile data, including their address.
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data

        # Get the user's address
        address = Address.objects.filter(user=instance).first()
        if address:
            address_serializer = AddressSerializer(address)
            data['address'] = address_serializer.data
        else:
            data['address'] = None

        return Response(data)
    



class AddressManageView(generics.GenericAPIView):
    """
    View for managing a single address for the authenticated user.
    
    Users can create an address if it doesn't exist, or update their existing address.
    """
    serializer_class = AddressSerializer  # Serializer for address management
    permission_classes = [permissions.IsAuthenticated]  # Only authenticated users can access this view

    def get_object(self):
        """
        Returns the address associated with the authenticated user.
        """
        address = Address.objects.filter(user=self.request.user).first()  # Get the user's address
        if not address:
            raise NotFound("Address not found.")  # Return 404 if no address exists
        return address

    def get(self, request, *args, **kwargs):
        """
        Retrieves the user's address.
        """
        address = self.get_object()  # Get the user's address
        serializer = self.get_serializer(address)  # Serialize the address
        return Response(serializer.data)  # Return serialized address data

    def post(self, request, *args, **kwargs):
        """
        Creates an address for the authenticated user.
        Ensures only one address can be created per user.
        """
        if Address.objects.filter(user=self.request.user).exists():
            return Response({"error": "Address already exists. Use PUT to update."}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=request.data)  # Deserialize the input data
        serializer.is_valid(raise_exception=True)  # Validate the data
        serializer.save(user=self.request.user)  # Save the address linked to the user
        return Response(serializer.data, status=status.HTTP_201_CREATED)  # Return created address data

    def put(self, request, *args, **kwargs):
        """
        Updates the user's address.
        """
        address = self.get_object()  # Get the user's existing address
        serializer = self.get_serializer(address, data=request.data, partial=True)  # Allow partial updates
        serializer.is_valid(raise_exception=True)  # Validate the data
        serializer.save()  # Save the updated address information
        return Response(serializer.data)  # Return updated address data

    def delete(self, request, *args, **kwargs):
        """
        Deletes the user's address.
        """
        address = self.get_object()  # Get the user's address
        address.delete()  # Delete the address instance
        return Response(status=status.HTTP_204_NO_CONTENT)  # Return no content response after deletion
