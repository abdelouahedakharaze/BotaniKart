import paypalrestsdk
from django.conf import settings

paypalrestsdk.configure({
    "mode": "sandbox",  # Change to "live" for production
    "client_id": settings.PAYPAL_CLIENT_ID,
    "client_secret": settings.PAYPAL_SECRET
})

def create_payment(product, quantity, return_url, cancel_url):
    payment = paypalrestsdk.Payment({
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": return_url,
            "cancel_url": cancel_url
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": product.name,
                    "sku": product.id,
                    "price": str(product.price),
                    "currency": "USD",
                    "quantity": quantity
                }]
            },
            "amount": {
                "total": str(product.price * quantity),
                "currency": "USD"
            },
            "description": f"Payment for {quantity} {product.name}"
        }]
    })

    if payment.create():
        return payment
    else:
        return None

def execute_payment(payment_id, payer_id):
    payment = paypalrestsdk.Payment.find(payment_id)
    if payment.execute({"payer_id": payer_id}):
        return True
    else:
        return False