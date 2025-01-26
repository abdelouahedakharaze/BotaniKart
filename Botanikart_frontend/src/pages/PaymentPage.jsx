import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentPage = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Default payment method is PayPal
    const [paymentMethod] = useState('PayPal')

    // If no shipping address is found, redirect to the shipping page
    if (!shippingAddress) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))  // Save the PayPal payment method
        navigate('/placeorder')  // Navigate to place the order
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-soil-50 rounded-lg shadow-md min-h-screen">
            <CheckoutSteps step1 step2 step3 />

            <h1 className="text-3xl font-semibold text-soil-900 mb-6 text-center">
                Payment Method: PayPal
            </h1>

            <p className="text-lg text-soil-700 mb-6 text-center">
                You will be securely redirected to PayPal to complete your payment.
            </p>

            <form onSubmit={submitHandler} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-soil-100">
                <div className="flex justify-center mb-6">
                    <img 
                        src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" 
                        alt="PayPal Logo"
                        className="w-32 h-auto"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-plant-600 text-green rounded-md hover:bg-plant-700 transition-colors"
                >
                    Proceed to PayPal
                </button>
            </form>
        </div>
    )
}

export default PaymentPage
