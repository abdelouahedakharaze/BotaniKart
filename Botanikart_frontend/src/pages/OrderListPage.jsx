import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listOrders } from '../actions/orderActions'

const OrderListPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo])

    return (
        <div className="p-6 bg-[var(--soil-50)] min-h-Page">
            <h1 className="text-2xl font-bold text-[var(--soil-900)] mb-4">Orders</h1>
            
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-sm">
                    <table className="min-w-full divide-y divide-[var(--soil-200)]">
                        <thead className="bg-[var(--soil-100)]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--soil-700)] uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--soil-700)] uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--soil-700)] uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--soil-700)] uppercase tracking-wider">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--soil-700)] uppercase tracking-wider">Paid</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--soil-700)] uppercase tracking-wider">Delivered</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--soil-700)] uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        
                        <tbody className="bg-white divide-y divide-[var(--soil-200)]">
                            {orders.map(order => (
                                <tr key={order._id} className="hover:bg-[var(--soil-50)] transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--soil-700)]">{order._id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--soil-700)]">
                                        {order.user && order.user.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--soil-700)]">
                                        {order.createdAt.substring(0, 10)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--soil-700)]">
                                        ${order.totalPrice}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {order.isPaid ? (
                                            <span className="text-[var(--plant-600)]">
                                                {order.paidAt.substring(0, 10)}
                                            </span>
                                        ) : (
                                            <i className="fas fa-times text-[var(--plant-700)]"></i>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {order.isDelivered ? (
                                            <span className="text-[var(--plant-600)]">
                                                {order.deliveredAt.substring(0, 10)}
                                            </span>
                                        ) : (
                                            <i className="fas fa-times text-[var(--plant-700)]"></i>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <Link
                                            to={`/order/${order._id}`}
                                            className="px-3 py-1 bg-[var(--plant-100)] text-[var(--plant-700)] rounded-md hover:bg-[var(--plant-200)] transition-colors"
                                        >
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default OrderListPage