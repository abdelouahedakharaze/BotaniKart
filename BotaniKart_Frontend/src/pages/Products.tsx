import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ProductsPage: React.FC = () => {
  const [products] = useState([
    { id: 1, name: 'Monstera Deliciosa', price: 39.99, image: '/placeholder.svg?height=200&width=200' },
    { id: 2, name: 'Fiddle Leaf Fig', price: 49.99, image: '/placeholder.svg?height=200&width=200' },
    { id: 3, name: 'Snake Plant', price: 29.99, image: '/placeholder.svg?height=200&width=200' },
    { id: 4, name: 'Pothos', price: 19.99, image: '/placeholder.svg?height=200&width=200' },
    { id: 5, name: 'ZZ Plant', price: 34.99, image: '/placeholder.svg?height=200&width=200' },
    { id: 6, name: 'Peace Lily', price: 24.99, image: '/placeholder.svg?height=200&width=200' },
  ])

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
              <li><Link to="/login" className="text-gray-600 hover:text-green-600">Login</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
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

export default ProductsPage