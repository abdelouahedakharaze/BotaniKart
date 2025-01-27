import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'
import { ShoppingCart, Menu, X, User, LogOut, Shield, Package, ListOrdered } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false)
  const [hoverTimeout, setHoverTimeout] = useState(null)
  
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
  }

  const handleMenuHover = (menuType, isEnter) => {
    if (hoverTimeout) clearTimeout(hoverTimeout)
    
    if (isEnter) {
      if (menuType === 'user') setIsUserMenuOpen(true)
      if (menuType === 'admin') setIsAdminMenuOpen(true)
    } else {
      const timeout = setTimeout(() => {
        if (menuType === 'user') setIsUserMenuOpen(false)
        if (menuType === 'admin') setIsAdminMenuOpen(false)
      }, 300) // 300ms delay before closing
      setHoverTimeout(timeout)
    }
  }

  return (
    <header className="bg-emerald-900 text-stone-50 shadow-lg">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-amber-500 hover:text-amber-600 transition-colors"
          >
            BotaniKart
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-grow items-center justify-end ml-8 space-x-6">
            <div className="flex-grow max-w-xl mx-4">
              <SearchBox />
            </div>
            
            <div className="flex items-center space-x-6">
              <Link 
                to="/cart" 
                className="flex items-center hover:text-amber-500 px-3 py-2 transition-colors gap-2 text-lg"
              >
                <ShoppingCart className="w-6 h-6 text-amber-500" />
                Cart
              </Link>

              {userInfo ? (
                <div className="relative group"
                  onMouseEnter={() => handleMenuHover('user', true)}
                  onMouseLeave={() => handleMenuHover('user', false)}
                >
                  <button className="flex items-center hover:text-amber-500 px-3 py-2 transition-colors gap-2 text-lg">
                    <div className="w-9 h-9 rounded-full bg-amber-500 text-emerald-900 font-bold flex items-center justify-center text-lg">
                      {userInfo.name[0].toUpperCase()}
                    </div>
                    <span className="font-medium">{userInfo.name}</span>
                  </button>
                    
                  <div 
                    className={`absolute right-0 mt-2 w-48 bg-stone-50 text-emerald-900 rounded-lg shadow-lg py-2 border border-stone-200 transition-opacity ${isUserMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    style={{ transitionDuration: '150ms' }}
                  >
                    <Link 
                      to="/profile" 
                      className="flex items-center px-4 py-2 hover:bg-amber-100 transition-colors gap-2"
                    >
                      <User className="w-5 h-5" />
                      Profile
                    </Link>
                    <button 
                      onClick={logoutHandler}
                      className="w-full flex items-center px-4 py-2 hover:bg-amber-100 transition-colors gap-2 text-left"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="flex items-center hover:text-amber-500 px-3 py-2 transition-colors gap-2 text-lg"
                >
                  <User className="w-6 h-6 text-amber-500" />
                  Login
                </Link>
              )}

              {userInfo?.isAdmin && (
                <div className="relative group"
                  onMouseEnter={() => handleMenuHover('admin', true)}
                  onMouseLeave={() => handleMenuHover('admin', false)}
                >
                  <button className="flex items-center hover:text-amber-500 px-3 py-2 transition-colors text-lg gap-2">
                    <Shield className="w-5 h-5 text-amber-500" />
                    Admin
                  </button>
                    
                  <div 
                    className={`absolute right-0 mt-2 w-48 bg-stone-50 text-emerald-900 rounded-lg shadow-lg py-2 border border-stone-200 transition-opacity ${isAdminMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    style={{ transitionDuration: '150ms' }}
                  >
                    <Link 
                      to="/admin/userlist" 
                      className="flex items-center px-4 py-2 hover:bg-amber-100 transition-colors gap-2"
                    >
                      <User className="w-5 h-5" />
                      Users
                    </Link>
                    <Link 
                      to="/admin/productlist" 
                      className="flex items-center px-4 py-2 hover:bg-amber-100 transition-colors gap-2"
                    >
                      <Package className="w-5 h-5" />
                      Products
                    </Link>
                    <Link 
                      to="/admin/orderlist" 
                      className="flex items-center px-4 py-2 hover:bg-amber-100 transition-colors gap-2"
                    >
                      <ListOrdered className="w-5 h-5" />
                      Orders
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-4">
            <div className="w-9 h-9 rounded-full bg-amber-500 text-emerald-900 font-bold flex items-center justify-center text-lg">
              {userInfo ? userInfo.name[0].toUpperCase() : 'A'}
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-amber-500/10 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 bg-stone-50 text-emerald-900 shadow-lg z-50">
            <div className="container mx-auto px-4 py-4">
              <SearchBox className="mb-4" />
              
              <div className="space-y-3">
                <Link 
                  to="/cart" 
                  className="flex items-center px-4 py-2 hover:bg-amber-100 rounded-lg gap-2 text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart className="w-6 h-6 text-amber-500" />
                  Cart
                </Link>

                {userInfo ? (
                  <>
                    <Link 
                      to="/profile" 
                      className="flex items-center px-4 py-2 hover:bg-amber-100 rounded-lg gap-2 text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-6 h-6 text-amber-500" />
                      Profile
                    </Link>
                    <button 
                      onClick={() => {
                        logoutHandler()
                        setIsMenuOpen(false)
                      }}
                      className="w-full flex items-center px-4 py-2 hover:bg-amber-100 rounded-lg gap-2 text-lg text-left"
                    >
                      <LogOut className="w-6 h-6 text-amber-500" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/login" 
                    className="flex items-center px-4 py-2 hover:bg-amber-100 rounded-lg gap-2 text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-6 h-6 text-amber-500" />
                    Login
                  </Link>
                )}

                {userInfo?.isAdmin && (
                  <div className="pt-2 border-t border-stone-200">
                    <h4 className="px-4 py-2 font-semibold text-emerald-900 text-lg">Admin</h4>
                    <Link 
                      to="/admin/userlist" 
                      className="flex items-center px-4 py-2 hover:bg-amber-100 rounded-lg gap-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-5 h-5 text-amber-500" />
                      Users
                    </Link>
                    <Link 
                      to="/admin/productlist" 
                      className="flex items-center px-4 py-2 hover:bg-amber-100 rounded-lg gap-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Package className="w-5 h-5 text-amber-500" />
                      Products
                    </Link>
                    <Link 
                      to="/admin/orderlist" 
                      className="flex items-center px-4 py-2 hover:bg-amber-100 rounded-lg gap-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <ListOrdered className="w-5 h-5 text-amber-500" />
                      Orders
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header