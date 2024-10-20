import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const initialCartItems: CartItem[] = [
  { id: 1, name: "Monstera Deliciosa", price: 29.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
  { id: 2, name: "Fiddle Leaf Fig", price: 39.99, quantity: 2, image: "/placeholder.svg?height=80&width=80" },
  { id: 3, name: "Snake Plant", price: 19.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity >= 0) {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-tan p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-dark-green mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-dark-brown">Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between py-4 border-b border-light-green">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
                  <div>
                    <h2 className="text-lg font-semibold text-dark-green">{item.name}</h2>
                    <p className="text-dark-brown">${item.price.toFixed(2)} each</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-light-green text-dark-green p-1 rounded-full"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="mx-2 text-dark-brown">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-light-green text-dark-green p-1 rounded-full"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-6 text-right">
              <p className="text-xl font-bold text-dark-green">Total: ${totalPrice.toFixed(2)}</p>
            </div>
            <div className="mt-6">
              <button className="w-full bg-medium-green text-white py-2 px-4 rounded-md hover:bg-dark-green transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
