import stripe
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY

def create_stripe_checkout_session(product, quantity, success_url, cancel_url):
    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'unit_amount': int(product.price * 100),  # Stripe expects amounts in cents
                    'product_data': {
                        'name': product.name,
                        'description': product.description,
                    },
                },
                'quantity': quantity,
            }],
            mode='payment',
            success_url=success_url,
            cancel_url=cancel_url,
        )
        return checkout_session
    except Exception as e:
        print(f"Error creating Stripe session: {str(e)}")
        return None

def retrieve_stripe_session(session_id):
    try:
        return stripe.checkout.Session.retrieve(session_id)
    except Exception as e:
        print(f"Error retrieving Stripe session: {str(e)}")
        return None