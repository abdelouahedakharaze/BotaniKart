import React, { useState } from 'react'
import { CreditCard, PlayIcon } from 'lucide-react'

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [paypalEmail, setPaypalEmail] = useState('')
  const [showToast, setShowToast] = useState(false)

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate payment processing
    setTimeout(() => {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-olive-50 p-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-olive-900 mb-6">Payment</h1>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`flex items-center px-4 py-2 rounded-full ${
              paymentMethod === 'stripe' ? 'bg-olive-600 text-white' : 'bg-olive-200 text-olive-800'
            }`}
            onClick={() => setPaymentMethod('stripe')}
          >
            <CreditCard className="mr-2" size={20} />
            Credit Card
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-full ${
              paymentMethod === 'paypal' ? 'bg-olive-600 text-white' : 'bg-olive-200 text-olive-800'
            }`}
            onClick={() => setPaymentMethod('paypal')}
          >
            <PlayIcon className="mr-2" size={20} />
            PayPal
          </button>
        </div>
        <form onSubmit={handlePayment}>
          {paymentMethod === 'stripe' ? (
            <>
              <div className="mb-4">
                <label htmlFor="cardNumber" className="block text-olive-700 mb-2">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-olive-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive-500"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="flex mb-4 space-x-4">
                <div className="w-1/2">
                  <label htmlFor="expiryDate" className="block text-olive-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-3 py-2 border border-olive-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive-500"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="cvv" className="block text-olive-700 mb-2">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full px-3 py-2 border border-olive-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive-500"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="mb-4">
              <label htmlFor="paypalEmail" className="block text-olive-700 mb-2">PayPal Email</label>
              <input
                type="email"
                id="paypalEmail"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                className="w-full px-3 py-2 border border-olive-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive-500"
                placeholder="your@email.com"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-olive-600 text-white py-2 rounded-md hover:bg-olive-700 transition-colors"
          >
            Pay Now
          </button>
        </form>
      </div>
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-olive-600 text-white px-6 py-3 rounded-md shadow-lg">
          Payment successful!
        </div>
      )}
    </div>
  )
}