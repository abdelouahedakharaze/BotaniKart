import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const BlogPage: React.FC = () => {
  const [blogPosts] = useState([
    {
      id: 1,
      title: '5 Easy-to-Care-for Indoor Plants',
      excerpt: 'Discover low-maintenance plants perfect for beginners and busy plant parents.',
      author: 'John Doe',
      date: '2023-05-15',
      image: '/placeholder.svg?height=200&width=300'
    },
    {
      id: 2,
      title: 'How to Create a Stunning Plant Wall',
      excerpt: 'Transform your space with a beautiful and lush plant wall. Learn the best techniques and plant choices.',
      author: 'Jane Smith',
      date: '2023-05-10',
      image: '/placeholder.svg?height=200&width=300'
    },
    {
      id: 3,
      title: 'The Benefits of Having Plants in Your Home',
      excerpt: 'Explore the numerous ways plants can improve your living space and overall well-being.',
      author: 'Bob Johnson',
      date: '2023-05-05',
      image: '/placeholder.svg?height=200&width=300'
    },
  ])

  const [categories] = useState([
    'Indoor Plants', 'Outdoor Plants', 'Succulents', 'Herbs', 'Plant Care'
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

      {/* Blog Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Botanikart Blog</h1>
          <div className="flex flex-wrap -mx-4">
            {/* Blog Posts */}
            <div className="w-full md:w-2/3 px-4">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                    <Link to={`/blog/${post.id}`} className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300">
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {/* Sidebar */}
            <div className="w-full md:w-1/3 px-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Categories</h3>
                <ul>
                  {categories.map((category, index) => (
                    <li key={index} className="mb-2">
                      <Link to={`/blog/category/${category.toLowerCase().replace(' ', '-')}`} className="text-green-600 hover:text-green-800">
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
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

export default BlogPage