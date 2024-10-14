import React from 'react'
import LoginForm from '../components/auth/LoginForm'

const Login: React.FC = () => {
  return (
    <div className="container mx-auto px-4 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login