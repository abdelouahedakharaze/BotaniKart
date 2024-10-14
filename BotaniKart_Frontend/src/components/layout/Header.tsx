import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'
import { Button } from '../common/Button'
import ThemeToggle from '../common/ThemeToggle'

const Header: React.FC = () => {
  const { user, logout } = useAuth()
  const { cart } = useCart()

  return (
    <header className="bg-primary text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Botanikart</Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li>
              <Link to="/cart">
                Cart ({cart.length})
              </Link>
            </li>
            {user ? (
              <>
                <li><Link to="/profile">Profile</Link></li>
                <li><Button onClick={logout} variant="secondary" size="small">Logout</Button></li>
              </>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
            <li><ThemeToggle /></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header