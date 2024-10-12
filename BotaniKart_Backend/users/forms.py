from django import forms
from .models import CustomUser

class VendorPaymentForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ['paypal_email', 'paypal_client_id', 'paypal_client_secret', 'stripe_account_id']
        widgets = {
            'paypal_client_secret': forms.PasswordInput(),
        }