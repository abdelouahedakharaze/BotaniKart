import React from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

interface Order {
  id: string
  date: string
  status: string
  total: number
}

const OrderList: React.FC = () => {
  const { data: orders, loading, error } = useFetch<Order[]>('/api/orders')

  if (loading) return <div>Loading orders...</div>
  if (error) return <div>Error loading orders</div>
  if (!orders || orders.length === 0) return <div>No orders found</div>

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Order ID</th>
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-right">Total</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{order.id}</td>
              <td className="py-3 px-6 text-left">{formatDate(order.date)}</td>
              <td className="py-3 px-6 text-left">{order.status}</td>
              <td className="py-3 px-6 text-right">{formatCurrency(order.total)}</td>
              <td className="py-3 px-6 text-center">
                <Link to={`/orders/${order.id}`} className="text-blue-600 hover:text-blue-900">View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderList