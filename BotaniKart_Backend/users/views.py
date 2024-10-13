from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import CustomUser, Address
from .serializers import UserSerializer, AddressSerializer
from .forms import VendorPaymentForm

# View for user registration
class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

# View for user login
class LoginView(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        # Implement login logic here
        pass

# View for updating vendor payment information
class UpdateVendorPayment(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        if not request.user.is_vendor:
            return Response({"error": "User is not a vendor"}, status=status.HTTP_403_FORBIDDEN)

        form = VendorPaymentForm(request.data, instance=request.user)
        if form.is_valid():
            form.save()
            return Response({"message": "Payment credentials updated successfully"})
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

class AddressListCreateView(generics.ListCreateAPIView):
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class AddressDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)