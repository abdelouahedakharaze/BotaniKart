import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [showToast, setShowToast] = useState(false);

  const itemsInCart = [
    { name: 'Monstera Deliciosa', price: 30, quantity: 2 },
    { name: 'Fiddle Leaf Fig', price: 40, quantity: 4 },
    // Add more items as needed
  ];

  const calculateTotal = () => {
    return itemsInCart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-tan p-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-dark-brown mb-6">Checkout</h1>

        {/* Summary of items */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-dark-brown">Order Summary</h2>
          <ul>
            {itemsInCart.map((item, index) => (
              <li key={index} className="flex justify-between text-dark-green mb-2">
                <span>{item.name} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-dark-brown mt-4 pt-2">
            <span className="font-bold text-dark-brown">Total: </span>
            <span className="font-bold text-dark-green">${calculateTotal()}</span>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`flex items-center px-4 py-2 rounded-full ${
              paymentMethod === 'stripe' ? 'bg-medium-green text-white' : 'bg-light-green text-dark-brown'
            }`}
            onClick={() => setPaymentMethod('stripe')}
          >
            <CreditCard className="mr-2" size={20} />
            Credit Card
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-full ${
              paymentMethod === 'paypal' ? 'bg-medium-green text-white' : 'bg-light-green text-dark-brown'
            }`}
            onClick={() => setPaymentMethod('paypal')}
          >
            <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.5 6.5C20.5 8.5 20 10.5 19 12C18 13.5 16 14.5 13.5 14.5H11.5L10.5 19.5H7L8 14.5H4L7 3.5H14C16 3.5 18.5 4.5 19.5 6.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.5 6.5C17.5 8.5 17 10.5 16 12C15 13.5 13 14.5 10.5 14.5H8.5L7.5 19.5H4L5 14.5H1L4 3.5H11C13 3.5 15.5 4.5 16.5 6.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            PayPal
          </button>
        </div>

        <form onSubmit={handlePayment}>
          {paymentMethod === 'stripe' ? (
            <>
              <div className="mb-4">
                <label htmlFor="cardNumber" className="block text-dark-brown mb-2">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-light-green rounded-md focus:outline-none focus:ring-2 focus:ring-medium-green"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="flex mb-4 space-x-4">
                <div className="w-1/2">
                  <label htmlFor="expiryDate" className="block text-dark-brown mb-2">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-3 py-2 border border-light-green rounded-md focus:outline-none focus:ring-2 focus:ring-medium-green"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="cvv" className="block text-dark-brown mb-2">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full px-3 py-2 border border-light-green rounded-md focus:outline-none focus:ring-2 focus:ring-medium-green"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="mb-4">
              <label htmlFor="paypalEmail" className="block text-dark-brown mb-2">PayPal Email</label>
              <input
                type="email"
                id="paypalEmail"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                className="w-full px-3 py-2 border border-light-green rounded-md focus:outline-none focus:ring-2 focus:ring-medium-green"
                placeholder="your@email.com"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-medium-green text-white py-2 rounded-md hover:bg-dark-green transition-colors"
          >
            Pay Now
          </button>
        </form>
      </div>
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-medium-green text-white px-6 py-3 rounded-md shadow-lg">
          Payment successful!
        </div>
      )}
    </div>
  );
}
