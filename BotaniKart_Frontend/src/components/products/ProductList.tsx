import React from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { useCart } from '../../hooks/useCart'
import { Button } from '../common/Button'
import { formatCurrency } from '../../utils/formatCurrency'

interface Product {
  id: string
  name: string
  price: number
  image: string
}

interface ProductListProps {
  category?: string
  searchTerm?: string
  sortBy?: string
}

const ProductList:  React.FC<ProductListProps> = ({ category, searchTerm, sortBy }) => {
  const { data: products, loading, error } = useFetch<Product[]>('/api/products')
  const { addToCart } = useCart()

  if (loading) return <div>Loading products...</div>
  if (error) return <div>Error loading products</div>
  if (!products) return null

  let filteredProducts = products

  if (category) {
    filteredProducts = filteredProducts.filter((product) => product.category === category)
  }

  if (searchTerm) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  if (sortBy) {
    filteredProducts.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name)
      return 0
    })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <Link to={`/product/${product.id}`}>
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
          </Link>
          <div className="p-4">
            <Link to={`/product/${product.id}`} className="text-lg font-semibold hover:text-primary">
              {product.name}
            </Link>
            <p className="text-gray-600 mt-2">{formatCurrency(product.price)}</p>
            <Button onClick={() => addToCart(product)} className="w-full mt-4">
              Add to Cart
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductList