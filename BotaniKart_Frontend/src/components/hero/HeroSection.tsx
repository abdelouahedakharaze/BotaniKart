import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection: React.FC = () => {
  return (
    <section className="bg-dark-green text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Botanikart</h1>
        <p className="text-xl mb-8">Discover the perfect plants for your home</p>
        <Link to="/products" className="bg-white text-dark-green px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
          Shop Now
        </Link>
      </div>
    </section>
  )
}

export default HeroSection
