import React from 'react'
import { useCart } from '../hooks/useCart'
import CartSummary from '../components/cart/CartSummary'
import { Button } from '../components/common/Button'
import { Link } from 'react-router-dom'
import { useAnalytics } from '../hooks/useAnalytics'

const Cart: React.FC = () => {
  const { cart, total } = useCart()
  useAnalytics('Cart')

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/products" className="text-primary">Continue shopping</Link></p>
      ) : (
        <>
          <CartSummary />
          <div className="mt-8 flex justify-between items-center">
            <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
            <Button as={Link} to="/checkout">Proceed to Checkout</Button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart