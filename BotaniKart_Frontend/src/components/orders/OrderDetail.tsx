import React from 'react'
import { useFetch } from '../../hooks/useFetch'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
}

interface Order {
  id: string
  date: string
  status: string
  total: number
  items: OrderItem[]
}

interface OrderDetailProps {
  orderId: string
}

const OrderDetail: React.FC<OrderDetailProps> = ({ orderId }) => {
  const { data: order, loading, error } = useFetch<Order>(`/api/orders/${orderId}`)

  if (loading) return <div>Loading order details...</div>
  if (error) return <div>Error loading order details</div>
  if (!order) return null

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Order #{order.id}</h2>
      <p className="mb-2">Date: {formatDate(order.date)}</p>
      <p className="mb-4">Status: <span className="font-semibold">{order.status}</span></p>
      <h3 className="text-xl font-semibold mb-2">Items:</h3>
      <ul className="mb-4">
        {order.items.map((item) => (
          <li key={item.id} className="flex justify-between mb-2">
            <span>{item.name} (x{item.quantity})</span>
            <span>{formatCurrency(item.price * item.quantity)}</span>
          </li>
        ))}
      </ul>
      <p className="text-xl font-semibold">Total: {formatCurrency(order.total)}</p>
    </div>
  )
}

export default OrderDetail