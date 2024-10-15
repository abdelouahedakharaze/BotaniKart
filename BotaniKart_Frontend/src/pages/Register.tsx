import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const LoginRegisterPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' })

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login submitted:', loginData)
    // Here you would typically send the login data to your backend
  }

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Register submitted:', registerData)
    // Here you would typically send the registration data to your backend
  }

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData(prev => ({ ...prev, [name]: value }))
  }

  const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegisterData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-green-600">Botanikart</Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/products" className="text-gray-600 hover:text-green-600">Products</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-green-600">Blog</Link></li>
              <li><Link to="/cart" className="text-gray-600 hover:text-green-600">Cart</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Login/Register Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex">
              <button
                className={`flex-1 py-4 text-center font-semibold ${isLogin ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`flex-1 py-4 text-center font-semibold ${!isLogin ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </div>
            <div className="p-6">
              {isLogin ? (
                <form onSubmit={handleLoginSubmit}>
                  <div className="mb-4">
                    <label htmlFor="login-email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input
                      type="email"
                      id="login-email"
                      name="email"
                      value={loginData.email}
                      onChange={handleLoginInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="login-password" className="block text-gray-700 font-bold mb-2">Password</label>
                    <input
                      type="password"
                      id="login-password"
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    Login
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit}>
                  <div className="mb-4">
                    <label htmlFor="register-name" className="block text-gray-700 font-bold mb-2">Name</label>
                    <input
                      type="text"
                      id="register-name"
                      name="name"
                      value={registerData.name}
                      onChange={handleRegisterInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="register-email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input
                      type="email"
                      id="register-email"
                      name="email"
                      value={registerData.email}
                      onChange={handleRegisterInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="register-password" className="block text-gray-700 font-bold mb-2">Password</label>
                    <input
                      type="password"
                      id="register-password"
                      name="password"
                      value={registerData.password}
                      onChange={handleRegisterInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="register-confirm-password" className="block text-gray-700 font-bold mb-2">Confirm Password</label>
                    <input
                      type="password"
                      id="register-confirm-password"
                      name="confirmPassword"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    Register
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-4">Botanikart</h3>
              <p>Your one-stop shop for all things plants.</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul>
                <li><Link to="/products" className="hover:text-green-400">Products</Link></li>
                <li><Link to="/blog" className="hover:text-green-400">Blog</Link></li>
                <li><Link to="/about" className="hover:text-green-400">About</Link></li>
                <li><Link to="/contact" className="hover:text-green-400">Contact</Link></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
              <form className="flex">
                <input type="email" placeholder="Your email" className="flex-grow px-4 py-2 rounded-l-full" />
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-r-full hover:bg-green-700 transition duration-300">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 Botanikart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LoginRegisterPage