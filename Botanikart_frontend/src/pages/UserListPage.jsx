import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useLocation, useNavigate } from 'react-router-dom'
import { listUsers, deleteUser } from '../actions/userActions'

const UserListPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, successDelete, userInfo])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <div className="p-6 bg-soil-50 min-h-Page">
            <h1 className="text-2xl font-bold text-soil-900 mb-6">Users</h1>
            
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <div className="overflow-x-auto rounded-lg border border-soil-100">
                    <table className="min-w-full divide-y divide-soil-200">
                        <thead className="bg-soil-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-soil-900">ID</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-soil-900">NAME</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-soil-900">EMAIL</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-soil-900">ADMIN</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-soil-900">ACTIONS</th>
                            </tr>
                        </thead>
                        
                        <tbody className="bg-white divide-y divide-soil-200">
                            {users.map(user => (
                                <tr key={user._id} className="hover:bg-soil-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-soil-700">{user._id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-soil-700">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-soil-700">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-soil-700">
                                        {user.isAdmin ? (
                                            <i className="fas fa-check text-green-600"></i>
                                        ) : (
                                            <i className="fas fa-times text-red-600"></i>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-soil-700 space-x-2">
                                        <Link
                                            to={`/admin/user/${user._id}/edit`}
                                            className="text-plant-700 hover:text-plant-800 p-2 hover:bg-plant-50 rounded-md"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                        <button
                                            onClick={() => deleteHandler(user._id)}
                                            className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-md"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
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

export default UserListPage