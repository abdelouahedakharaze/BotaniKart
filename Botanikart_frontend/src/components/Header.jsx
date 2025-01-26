import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <header className="bg-green-700 text-white">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="text-2xl font-bold text-tan hover:text-green-300 transition-colors">
            BotaniKart
          </Link>

          {/* Avatar and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center">
              {userInfo ? userInfo.name[0].toUpperCase() : 'A'}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-green-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-between ml-6">
          <div className="flex-1 max-w-xl mx-4">
            <SearchBox />
          </div>
            
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="flex items-center hover:text-green-300 px-3 py-2">
              <i className="fas fa-shopping-cart mr-2"></i>
              Cart
            </Link>

            {userInfo ? (
              <div className="relative group">
                <button className="flex items-center hover:text-green-300 px-3 py-2">
                  {userInfo.name}
                  <i className="fas fa-caret-down ml-2"></i>
                </button>
                  
                <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg py-2">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                    Profile
                  </Link>
                  <button 
                    onClick={logoutHandler}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="flex items-center hover:text-green-300 px-3 py-2">
                <i className="fas fa-user mr-2"></i>
                Login
              </Link>
            )}

            {userInfo?.isAdmin && (
              <div className="relative group">
                <button className="flex items-center hover:text-green-300 px-3 py-2">
                  Admin
                  <i className="fas fa-caret-down ml-2"></i>
                </button>
                  
                <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg py-2">
                  <Link to="/admin/userlist" className="block px-4 py-2 hover:bg-gray-100">
                    Users
                  </Link>
                  <Link to="/admin/productlist" className="block px-4 py-2 hover:bg-gray-100">
                    Products
                  </Link>
                  <Link to="/admin/orderlist" className="block px-4 py-2 hover:bg-gray-100">
                    Orders
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
