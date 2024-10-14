import React from 'react'
import OrderList from '../components/orders/OrderList'

const Orders: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      <OrderList />
    </div>
  )
}

export default Orders