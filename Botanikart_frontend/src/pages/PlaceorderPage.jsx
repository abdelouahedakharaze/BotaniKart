import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

const PlaceorderPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate

    // Calculate prices
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number((0.0625 * cart.itemsPrice).toFixed(2))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [success, navigate, dispatch, order])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    if (!cart.paymentMethod) navigate('/payment')

    return (
        <div className="p-6 bg-soil-50 min-h-screen">
            <CheckoutSteps step1 step2 step3 step4 />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="md:col-span-2 space-y-6">
                    {/* Shipping Info */}
                    <div className="p-6 bg-white rounded-lg shadow-md border-2 border-stone-200">
                        <h2 className="text-xl font-semibold text-emerald-900 mb-4">Shipping Information</h2>
                        <div className="space-y-3">
                            {/* Shipping Address Components */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Address Line 1</h3>
                                <p className="text-gray-600">{cart.shippingAddress.address}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">City</h3>
                                <p className="text-gray-600">{cart.shippingAddress.city}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Postal Code</h3>
                                <p className="text-gray-600">{cart.shippingAddress.postalCode}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Country</h3>
                                <p className="text-gray-600">{cart.shippingAddress.country}</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="p-6 bg-white rounded-lg shadow-md border-2 border-stone-200">
                        <h2 className="text-xl font-semibold text-emerald-900 mb-4">Payment Method</h2>
                        <p className="text-gray-600">
                            {cart.paymentMethod}
                        </p>
                    </div>

                    {/* Order Items */}
                    <div className="p-6 bg-white rounded-lg shadow-md border-2 border-stone-200">
                        <h2 className="text-xl font-semibold text-emerald-900 mb-4">Order Items</h2>
                        {cart.cartItems.length === 0 ? (
                            <Message variant='info'>Your cart is empty</Message>
                        ) : (
                            <div className="space-y-4">
                                {cart.cartItems.map((item, index) => (
                                    <div key={index} className="flex items-center p-3 bg-soil-50 rounded-lg">
                                        <div className="w-16 h-16 flex-shrink-0">
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="w-full h-full object-contain rounded-md"
                                            />
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <Link 
                                                to={`/product/${item.product}`}
                                                className="text-amber-600 hover:text-amber-700 hover:underline"
                                            >
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div className="ml-4 text-gray-600">
                                            {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Order Summary */}
                <div className="h-fit sticky top-6">
                    <div className="p-6 bg-white rounded-lg shadow-md border-2 border-stone-200">
                        <h2 className="text-xl font-semibold text-emerald-900 mb-4">Order Summary</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <span>Items:</span>
                                <span>${cart.itemsPrice}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping:</span>
                                <span>${cart.shippingPrice}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax:</span>
                                <span>${cart.taxPrice}</span>
                            </div>
                            <div className="flex justify-between text-gray-900 font-bold border-t pt-3">
                                <span>Total:</span>
                                <span>${cart.totalPrice}</span>
                            </div>

                            {error && (
                                <div className="pt-4">
                                    <Message variant='danger'>{error}</Message>
                                </div>
                            )}

                            <button
                                onClick={placeOrder}
                                disabled={cart.cartItems.length === 0}
                                className={`w-full py-2 px-4 rounded-md transition-colors duration-200 font-medium
                                    ${cart.cartItems.length === 0 
                                        ? 'bg-soil-300 cursor-not-allowed' 
                                        : 'bg-amber-500 hover:bg-amber-600 text-soil-900'}
                                `}
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceorderPage
