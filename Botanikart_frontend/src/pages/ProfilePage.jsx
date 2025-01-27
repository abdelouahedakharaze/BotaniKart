import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useLocation, useNavigate } from 'react-router-dom'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'

const ProfilePage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const location = useLocation()
    const navigation = useNavigate()
    
    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading: loadingOrders, error: errorOrders, orders} = orderListMy

    useEffect(() => {
        if (!userInfo) {
            navigation('/login')
        } else {
            if(!userInfo || !user?.name || success || userInfo._id !== user?._id)  {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [navigation, userInfo, dispatch, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password,
            }))
            setMessage('')
        } 
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 p-8 bg-gradient-to-br from-plant-100 to-plant-200 min-h-screen">
            {/* Profile Form */}
            <div className="w-full lg:w-1/3 bg-gradient-to-br from-plant-200 to-plant-400 p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-transform">
                <h2 className="text-3xl font-extrabold text-soil-900 mb-6 flex items-center gap-2">🌱 User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}

                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-soil-700 mb-2">Name</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 border border-soil-400 rounded-lg focus:ring-plant-500 focus:border-plant-500"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-soil-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 border border-soil-400 rounded-lg focus:ring-plant-500 focus:border-plant-500"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-soil-700 mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 border border-soil-400 rounded-lg focus:ring-plant-500 focus:border-plant-500"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-soil-700 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 border border-soil-400 rounded-lg focus:ring-plant-500 focus:border-plant-500"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-plant-600 text-soil-100 rounded-lg hover:bg-plant-700 transition-colors transform hover:scale-105"
                    >
                        Update Profile 🌿
                    </button>
                </form>
            </div>

            {/* Orders Table */}
            <div className="flex-1 bg-gradient-to-br from-plant-100 to-plant-200 p-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-extrabold text-soil-900 mb-6">🛒 My Orders</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                    <div className="overflow-x-auto rounded-lg border border-soil-300 shadow-md">
                        <table className="min-w-full divide-y divide-soil-300">
                            <thead className="bg-gradient-to-br from-soil-100 to-plant-300">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-soil-900">ID</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-soil-900">Date</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-soil-900">Total</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-soil-900">Paid</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-soil-900">Delivered</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-soil-900"></th>
                                </tr>
                            </thead>

                            <tbody className="bg-plant-50 divide-y divide-soil-200">
                                {orders?.map(order => (
                                    <tr key={order._id} className="hover:bg-plant-100 transition-all">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-soil-700">{order._id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-soil-700">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-soil-700">${order.totalPrice}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-soil-700">
                                            {order.isPaid ? 
                                                new Date(order.paidAt).toLocaleDateString() : 
                                                <i className="fas fa-times text-red-500"></i>
                                            }
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-soil-700">
                                            {order.isDelivered ? 
                                                new Date(order.deliveredAt).toLocaleDateString() : 
                                                <i className="fas fa-times text-red-500"></i>
                                            }
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-soil-700">
                                            <Link
                                                to={`/order/${order._id}`}
                                                className="px-4 py-2 bg-plant-600 text-soil-100 rounded-lg hover:bg-plant-700 transition-colors transform hover:scale-105"
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
        </div>
    )
}

export default ProfilePage
