import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { useCart } from '../../hooks/useCart'
import { Button } from '../common/Button'
import { formatCurrency } from '../../utils/formatCurrency'
import ReviewList from '../reviews/ReviewList'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  stock: number
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: product, loading, error } = useFetch<Product>(`/api/products/${id}`)
  const { addToCart } = useCart()

  if (loading) return <div>Loading product details...</div>
  if (error) return <div>Error loading product details</div>
  if (!product) return <div>Product not found</div>

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-md" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl font-semibold mb-4">{formatCurrency(product.price)}</p>
          <p className="mb-4">{product.description}</p>
          <p className="mb-4">In stock: {product.stock}</p>
          <Button onClick={() => addToCart(product)} disabled={product.stock === 0}>
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <ReviewList productId={id} />
      </div>
    </div>
  )
}

export default ProductDetail