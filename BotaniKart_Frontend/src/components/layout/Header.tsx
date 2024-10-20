import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-medium-green">BotaniKart</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/products" className="text-dark-brown hover:text-medium-green">Products</Link></li>
            <li><Link to="/blog" className="text-dark-brown hover:text-medium-green">Blog</Link></li>
            <li><Link to="/cart" className="text-dark-brown hover:text-medium-green">Cart</Link></li>
            <li><Link to="/register" className="text-dark-brown hover:text-medium-green">Login</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
