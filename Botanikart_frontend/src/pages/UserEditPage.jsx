import React, {useState, useEffect} from 'react'
import { Link, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUser } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditPage = () => {
    const {userId} = useParams()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails
    const userUpdate = useSelector(state => state.userUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = userUpdate

    useEffect(() => {
        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET})
            navigate('/admin/userlist')
        } else {
            if (!user?.name || user?._id !== Number(userId)) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [user, userId, successUpdate, navigate, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id: user._id, name, email, isAdmin }))
    }

    return (
        <div className="p-6 bg-soil-50 min-h-Page">
            <Link 
                to='/admin/userlist'
                className="inline-block mb-6 px-4 py-2 bg-soil-700 text-white rounded-md hover:bg-soil-800 transition-colors"
            >
                Go Back
            </Link>

            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-soil-100">
                <h1 className="text-2xl font-bold text-soil-900 mb-6">Edit User</h1>
                
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <form onSubmit={submitHandler} className="space-y-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-soil-700 mb-2">Name</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-soil-300 rounded-md focus:ring-plant-500 focus:border-plant-500"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-soil-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 border border-soil-300 rounded-md focus:ring-plant-500 focus:border-plant-500"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center mb-4">
                            <input
                                id="isAdmin"
                                type="checkbox"
                                className="h-4 w-4 text-plant-600 border-soil-300 rounded focus:ring-plant-500"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                            <label 
                                htmlFor="isAdmin" 
                                className="ml-2 block text-sm text-soil-700"
                            >
                                Is Admin
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-plant-600 text-white rounded-md hover:bg-plant-700 transition-colors"
                        >
                            Update
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default UserEditPage