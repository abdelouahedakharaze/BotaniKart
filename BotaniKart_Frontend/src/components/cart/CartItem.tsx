import React from 'react'
import { useCart } from '../../hooks/useCart'
import { Button } from '../common/Button'
import { formatCurrency } from '../../utils/formatCurrency'

interface CartItemProps {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

const CartItem: React.FC<CartItemProps> = ({ id, name, price, quantity, image }) => {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center">
        <img src={image} alt={name} className="w-16 h-16 object-cover mr-4" />
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-gray-600">{formatCurrency(price)}</p>
        </div>
      </div>
      <div className="flex items-center">
        <Button
          onClick={() => updateQuantity(id, quantity - 1)}
          disabled={quantity === 1}
          className="px-2 py-1"
        >
          -
        </Button>
        <span className="mx-2">{quantity}</span>
        <Button
          onClick={() => updateQuantity(id, quantity + 1)}
          className="px-2 py-1"
        >
          +
        </Button>
        <Button
          onClick={() => removeFromCart(id)}
          variant="danger"
          className="ml-4"
        >
          Remove
        </Button>
      </div>
    </div>
  )
}

export default CartItem