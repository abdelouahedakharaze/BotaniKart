import React, { useState } from 'react'
import { X } from 'lucide-react'

type User = {
  email: string
  password: string
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const mockUsers: User[] = [
    { email: 'user@example.com', password: 'password123' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      const user = mockUsers.find(u => u.email === email && u.password === password)
      if (user) {
        showToastMessage('Logged in successfully!')
      } else {
        showToastMessage('Invalid email or password')
      }
    } else {
      if (password !== confirmPassword) {
        showToastMessage('Passwords do not match')
      } else {
        showToastMessage('Registered successfully!')
      }
    }
  }

  const showToastMessage = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div className="min-h-screen bg-olive-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-olive-900">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-olive-300 placeholder-olive-500 text-olive-900 rounded-t-md focus:outline-none focus:ring-olive-500 focus:border-olive-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-olive-300 placeholder-olive-500 text-olive-900 focus:outline-none focus:ring-olive-500 focus:border-olive-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {!isLogin && (
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-olive-300 placeholder-olive-500 text-olive-900 rounded-b-md focus:outline-none focus:ring-olive-500 focus:border-olive-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-olive-600 hover:bg-olive-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-500"
            >
              {isLogin ? 'Sign in' : 'Register'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-olive-600 hover:text-olive-500"
          >
            {isLogin ? 'Need an account? Register' : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-olive-600 text-white px-6 py-3 rounded-md shadow-lg flex items-center justify-between">
          <span>{toastMessage}</span>
          <button onClick={() => setShowToast(false)} className="ml-4 text-white">
            <X size={18} />
          </button>
        </div>
      )}

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-olive-200 rounded-full opacity-20 transform rotate-12"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] bg-olive-300 rounded-full opacity-20 transform -rotate-12"></div>
      </div>
    </div>
  )
}