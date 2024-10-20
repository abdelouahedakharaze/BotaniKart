import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-brown text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">BotaniKart</h3>
            <p>Your one-stop shop for all things plants.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li><Link to="/products" className="hover:text-light-green">Products</Link></li>
              <li><Link to="/blog" className="hover:text-light-green">Blog</Link></li>
              <li><Link to="/about" className="hover:text-light-green">About</Link></li>
              <li><Link to="/contact" className="hover:text-light-green">Contact</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <form className="flex">
              <input type="email" placeholder="Your email" className="flex-grow px-4 py-2 rounded-l-full" />
              <button type="submit" className="bg-medium-green text-white px-4 py-2 rounded-r-full hover:bg-dark-green transition duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 BotaniKart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
