import React from 'react'
import { Link } from 'react-router-dom'
import { Truck, ShieldCheck, PhoneCall, BookOpen, RefreshCcw } from "lucide-react"

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-tan">



      {/* Hero Section */}
      <section className="bg-dark-green text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Botanikart</h1>
          <p className="text-xl mb-8">Discover the perfect plants for your home</p>
          <Link to="/products" className="bg-white text-dark-green px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="bg-light-green p-3 rounded-full mb-2">
                  <service.icon className="h-6 w-6 text-medium-green" />
                </div>
                <span className="text-sm text-dark-brown">{service.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-dark-green">{product.name}</h3>
                  <p className="text-dark-brown mb-4">${product.price.toFixed(2)}</p>
                  <button className="bg-medium-green text-white px-4 py-2 rounded-full hover:bg-dark-green transition duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Articles Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Latest Blog Articles</h2>
          
          {/* Blog Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl">
                <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-dark-green">{article.title}</h3>
                  <p className="text-dark-brown mb-4">{article.excerpt}</p>
                  <Link to={`/blog/${article.id}`} className="text-medium-green hover:text-dark-green font-semibold">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  )
}

// Service icons data
const services = [
  { name: "Fast Delivery", icon: Truck },
  { name: "Secure Payment", icon: ShieldCheck },
  { name: "24/7 Support", icon: PhoneCall },
  { name: "Plant Care Guide", icon: BookOpen },
  { name: "Easy Returns", icon: RefreshCcw },
]

// Products and Blog Articles Data
const products = [
  { id: 1, name: 'Monstera Deliciosa', price: 39.99, image: '/images/file_1.jpg?height=200&width=200' },
  { id: 2, name: 'Fiddle Leaf Fig', price: 49.99, image: '/images/file_2.jpg?height=200&width=200' },
  { id: 3, name: 'Snake Plant', price: 29.99, image: '/images/file_3.jpg?height=200&width=200' },
  { id: 4, name: 'Peace Lily', price: 35.99, image: '/images/file_4.jpg?height=200&width=200' },
  { id: 5, name: 'Aloe Vera', price: 24.99, image: '/images/file_5.jpg?height=200&width=200' },
  { id: 6, name: 'ZZ Plant', price: 44.99, image: '/images/file_6.jpg?height=200&width=200' },
]

const blogArticles = [
  { id: 1, title: 'How to Care for Monstera Plants', excerpt: 'Learn the essentials of keeping your Monstera thriving.', image: '/images/file_7.jpg?height=200&width=200' },
  { id: 2, title: 'Top 5 Indoor Plants for Low Light', excerpt: 'Discover the best plants for low light environments.', image: '/images/file_9.jpg?height=200&width=200' },
  { id: 3, title: 'The Benefits of Having Plants at Home', excerpt: 'Plants don’t just beautify your home, they also improve air quality.', image: '/images/file_8.jpg?height=200&width=200' },
]

export default HomePage
