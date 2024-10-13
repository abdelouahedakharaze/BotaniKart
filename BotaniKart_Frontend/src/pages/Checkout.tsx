import React, { useState } from 'react'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { createOrder } from '../services/orders'
import { useAnalytics } from '../hooks/useAnalytics'

const Checkout: React.FC = () => {
  const { cart, total, clearCart } = useCart()
  const { user } = useAuth()
  const [address, setAddress] = useState('')
  useAnalytics('Checkout')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      await createOrder({
        userId: user.id,
        items: cart,
        total,
        shippingAddress: address,
      })
      clearCart()
      // Redirect to order confirmation page
    } catch (error) {
      console.error('Checkout failed:', error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <Input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Shipping Address"
          required
        />
        <div className="mt-4">
          <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
        </div>
        <Button type="submit" className="mt-4 w-full">Place Order</Button>
      </form>
    </div>
  )
}

export default Checkout