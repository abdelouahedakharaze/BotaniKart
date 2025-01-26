import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/userActions'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-[var(--soil-900)] mb-6 text-center">Sign In</h1>
            
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}

            <form onSubmit={submitHandler} className="space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-[var(--soil-700)]">
                        Email Address
                    </label>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-[var(--soil-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--plant-500)]"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-[var(--soil-700)]">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-[var(--soil-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--plant-500)]"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-[var(--plant-600)] text-white rounded-md hover:bg-[var(--plant-700)] transition-colors duration-200 font-medium"
                >
                    Sign In
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-[var(--soil-700)]">
                New Customer?{' '}
                <Link 
                    to={redirect ? `/register?redirect=${redirect}` : '/register'}
                    className="text-[var(--plant-600)] hover:text-[var(--plant-700)] hover:underline"
                >
                    Register
                </Link>
            </div>
        </div>
    )
}

export default LoginPage