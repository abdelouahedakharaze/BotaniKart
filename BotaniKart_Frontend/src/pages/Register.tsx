import React from 'react'
import RegisterForm from '../components/auth/RegisterForm'

const Register: React.FC = () => {
  return (
    <div className="container mx-auto px-4 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center">Register</h1>
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register