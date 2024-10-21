import React from 'react'
import HeroSection from '../components/hero/HeroSection'
import ServiceItem from '../services/ServiceItem'
import ProductCard from '../components/products/ProductCard'
import BlogArticleCard from '../components/blog/BlogArticleCard'
import { Truck, ShieldCheck, PhoneCall, BookOpen, RefreshCcw } from "lucide-react"

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-tan">

      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {services.map((service, index) => (
              <ServiceItem key={index} icon={service.icon} name={service.name} />
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
              <ProductCard key={product.id} id={product.id} name={product.name} price={product.price} image={product.image} />
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
              <BlogArticleCard key={article.id} id={article.id} title={article.title} excerpt={article.excerpt} image={article.image} />
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
