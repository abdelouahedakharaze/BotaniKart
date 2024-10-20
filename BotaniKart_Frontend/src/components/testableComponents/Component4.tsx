import React, { useState } from 'react'
import { ShoppingCart, Plus, Minus, X } from 'lucide-react'

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
  { id: 1, name: "Monstera Deliciosa", price: 29.99, image: "/placeholder.svg?height=200&width=200", description: "A beautiful tropical plant with iconic split leaves." },
  { id: 2, name: "Fiddle Leaf Fig", price: 39.99, image: "/placeholder.svg?height=200&width=200", description: "Popular indoor tree with large, violin-shaped leaves." },
  { id: 3, name: "Snake Plant", price: 19.99, image: "/placeholder.svg?height=200&width=200", description: "Easy-care plant known for its air-purifying qualities." },
  { id: 4, name: "Pothos", price: 14.99, image: "/placeholder.svg?height=200&width=200", description: "Fast-growing vine with heart-shaped leaves." },
  { id: 5, name: "ZZ Plant", price: 24.99, image: "/placeholder.svg?height=200&width=200", description: "Drought-tolerant plant with glossy, dark green leaves." },
  { id: 6, name: "Peace Lily", price: 22.99, image: "/placeholder.svg?height=200&width=200", description: "Elegant plant with white flowers and dark leaves." },
]

export default function ProductListWithCart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

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
    <div className="min-h-screen bg-olive-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-olive-900">Plant Paradise</h1>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-olive-600 text-white p-2 rounded-full hover:bg-olive-700 transition-colors"
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-olive-900 mb-2">{product.name}</h2>
                <p className="text-olive-700 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-olive-600">${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-olive-500 text-white px-4 py-2 rounded hover:bg-olive-600 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isCartOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-olive-900">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-olive-600 hover:text-olive-800">
                  <X size={24} />
                </button>
              </div>
              {cart.length === 0 ? (
                <p className="text-olive-700">Your cart is empty.</p>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b border-olive-200">
                      <div className="flex items-center">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                        <div>
                          <h3 className="font-semibold text-olive-800">{item.name}</h3>
                          <p className="text-olive-600">${item.price.toFixed(2)} each</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-olive-200 text-olive-800 p-1 rounded-full"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-2 text-olive-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-olive-200 text-olive-800 p-1 rounded-full"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 text-right">
                    <p className="text-lg font-bold text-olive-900">Total: ${totalPrice.toFixed(2)}</p>
                    <p className="text-olive-700">Total Items: {totalItems}</p>
                  </div>
                  <button className="mt-4 w-full bg-olive-600 text-white py-2 rounded hover:bg-olive-700 transition-colors">
                    Proceed to Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}