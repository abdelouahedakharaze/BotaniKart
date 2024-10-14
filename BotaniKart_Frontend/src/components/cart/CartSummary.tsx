import React from 'react'
import { useCart } from '../../hooks/useCart'
import CartItem from './CartItem'
import { formatCurrency } from '../../utils/formatCurrency'

const CartSummary: React.FC = () => {
  const { cart, total } = useCart()

  return (
    <div>
      {cart.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
      <div className="mt-4 text-right">
        <p className="text-xl font-semibold">Total: {formatCurrency(total)}</p>
      </div>
    </div>
  )
}

export default CartSummary