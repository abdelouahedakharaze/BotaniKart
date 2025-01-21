from django.urls import path
from .views import * # Importing the order views

urlpatterns = [

    # Path to get all orders
    path('', getOrders, name='orders'),  # Route for getting all orders

    # Path to add a new order
    path('add/', addOrderItems, name='orders-add'),  # Route to create a new order

    # Path to get the orders of the currently logged-in user
    path('myorders/', getMyOrders, name='myorders'),  # Route to fetch current user's orders

    # Path to update an order to "delivered" (Admin only)
    path('<str:pk>/deliver/', updateOrderToDelivered, name='order-delivered'),  # Deliver order by order ID

    # Path to get order details by order ID
    path('<str:pk>/', getOrderById, name='user-order'),  # Fetch order by order ID

    # Path to update an order to "paid"
    path('<str:pk>/pay/', updateOrderToPaid, name='pay'),  # Mark an order as paid
]
