import React, { useState } from 'react'
import { ShoppingCart, Plus, Minus } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
}

interface CartItem extends Product {
  quantity: number
}

const products: Product[] = [
  { id: 1, name: "Monstera Deliciosa", price: 29.99, image: "/images/file_1.jpg?height=200&width=200", description: "A beautiful tropical plant with iconic split leaves." },
  { id: 2, name: "Fiddle Leaf Fig", price: 39.99, image: "/images/file_3.jpg?height=200&width=200", description: "Popular indoor tree with large, violin-shaped leaves." },
  { id: 3, name: "Snake Plant", price: 19.99, image: "/images/file_4.jpg?height=200&width=200", description: "Easy-care plant known for its air-purifying qualities." },
  { id: 4, name: "Pothos", price: 14.99, image: "/images/file_6.jpg?height=200&width=200", description: "Fast-growing vine with heart-shaped leaves." },
  { id: 5, name: "Product Name", price: 0.00, image: "/images/file_12.jpg?height=200&width=200", description: "Product description here." },
  { id: 6, name: "Product Name", price: 0.00, image: "/images/file_11.jpg?height=200&width=200", description: "Product description here." },
  { id: 7, name: "Product Name", price: 0.00, image: "/images/file_13.jpg?height=200&width=200", description: "Product description here." },
  { id: 8, name: "Product Name", price: 0.00, image: "/images/file_5.jpg?height=200&width=200", description: "Product description here." },
]

export default function ProductListAndCart() {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-tan p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-dark-green">   </h1>
          <div className="relative">
            <ShoppingCart size={24} className="text-dark-green" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold text-dark-green mb-4">Our Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105 hover:shadow-2xl">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-dark-green mb-2">{product.name}</h3>
                    <p className="text-dark-brown mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-medium-green">${product.price.toFixed(2)}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-medium-green text-white px-4 py-2 rounded-full hover:bg-dark-green transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-dark-green mb-4">Your Cart</h2>
              {cart.length === 0 ? (
                <p className="text-dark-brown">Your cart is empty.</p>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b border-dark-brown">
                      <div>
                        <h3 className="font-semibold text-dark-green">{item.name}</h3>
                        <p className="text-dark-brown">${item.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-light-green text-dark-green p-1 rounded-full"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-2 text-dark-green">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-light-green text-dark-green p-1 rounded-full"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4">
                    <p className="text-lg font-bold text-dark-green">Total: ${totalPrice.toFixed(2)}</p>
                    <p className="text-dark-brown">Total Items: {totalItems}</p>
                  </div>
                  <button className="mt-4 w-full bg-medium-green text-white py-2 rounded-full hover:bg-dark-green transition-colors">
                    Proceed to Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
