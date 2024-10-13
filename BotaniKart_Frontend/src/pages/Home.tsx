import React from 'react'
import ProductList from '../components/products/ProductList'
import { useAnalytics } from '../hooks/useAnalytics'

const Home: React.FC = () => {
  useAnalytics('Home')

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-primary mb-8">Welcome to Botanikart</h1>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <ProductList limit={4} />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">About Us</h2>
        <p className="text-lg">
          Botanikart is your one-stop shop for all things plants. We offer a wide variety of indoor and outdoor plants,
          gardening tools, and expert advice to help your green friends thrive.
        </p>
      </section>
    </div>
  )
}

export default Home