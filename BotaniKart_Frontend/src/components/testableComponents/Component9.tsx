import React from 'react'
import { Search, ShoppingCart, User } from 'lucide-react'

const featuredProducts = [
  { id: 1, name: "Monstera Deliciosa", price: 29.99, image: "/placeholder.svg?height=200&width=200" },
  { id: 2, name: "Fiddle Leaf Fig", price: 39.99, image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "Snake Plant", price: 19.99, image: "/placeholder.svg?height=200&width=200" },
]

const latestPosts = [
  { id: 1, title: "Top 5 Low-Maintenance Plants", image: "/placeholder.svg?height=150&width=300", excerpt: "Discover the best plants for busy plant parents..." },
  { id: 2, title: "How to Propagate Succulents", image: "/placeholder.svg?height=150&width=300", excerpt: "Learn the tricks to multiply your succulent collection..." },
  { id: 3, title: "The Benefits of Indoor Plants", image: "/placeholder.svg?height=150&width=300", excerpt: "Explore how plants can improve your living space..." },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-olive-50">
      <header className="bg-olive-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-6xl font-bold">BotaniKart</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="py-1 px-3 rounded-full text-olive-800 focus:outline-none focus:ring-2 focus:ring-olive-300"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-olive-400" size={18} />
            </div>
            <ShoppingCart size={24} />
            <User size={24} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-olive-800 mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-olive-700 mb-2">{product.name}</h3>
                  <p className="text-olive-600 font-bold">${product.price.toFixed(2)}</p>
                  <button className="mt-4 w-full bg-olive-500 text-white py-2 rounded hover:bg-olive-600 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-olive-800 mb-6">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-olive-700 mb-2">{post.title}</h3>
                  <p className="text-olive-600 mb-4">{post.excerpt}</p>
                  <a href="#" className="text-olive-500 hover:underline">Read more</a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-olive-700 text-white py-6 mt-12">
        <div className="container mx-auto px-4">
          <p className="text-center">&copy; 2023 Plant Paradise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}