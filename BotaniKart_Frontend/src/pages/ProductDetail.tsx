import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import ProductDetail from '../components/products/ProductDetail'
import ReviewList from '../components/reviews/ReviewList'
import { useAnalytics } from '../hooks/useAnalytics'

interface Product {
  id: string
  name: string
  price: number
  description: string
  image: string
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: product, loading, error } = useFetch<Product>(`/api/products/${id}`)
  useAnalytics(`Product - ${product?.name || id}`)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!product) return <div>Product not found</div>

  return (
    <div className="container mx-auto p-4">
      <ProductDetail product={product} />
      <ReviewList productId={id} />
    </div>
  )
}

export default ProductDetailPage