import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex flex-wrap justify-center mb-8 space-x-4">
      {/* Step 1 - Login */}
      <div className="flex items-center">
        {step1 ? (
          <Link 
            to="/login" 
            className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            Login
          </Link>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Login</span>
        )}
      </div>

      {/* Step 2 - Shipping */}
      <div className="flex items-center">
        <span className="mx-2 text-gray-400">/</span>
        {step2 ? (
          <Link 
            to="/shipping" 
            className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            Shipping
          </Link>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Shipping</span>
        )}
      </div>

      {/* Step 3 - Payment */}
      <div className="flex items-center">
        <span className="mx-2 text-gray-400">/</span>
        {step3 ? (
          <Link 
            to="/payment" 
            className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            Payment
          </Link>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Payment</span>
        )}
      </div>

      {/* Step 4 - Place Order */}
      <div className="flex items-center">
        <span className="mx-2 text-gray-400">/</span>
        {step4 ? (
          <Link 
            to="/placeorder" 
            className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            Place Order
          </Link>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Place Order</span>
        )}
      </div>
    </div>
  )
}

export default CheckoutSteps