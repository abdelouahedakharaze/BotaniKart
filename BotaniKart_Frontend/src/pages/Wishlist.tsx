import React from 'react'
import { useFetch } from '../hooks/useFetch'
import ProductList from '../components/products/ProductList'

interface WishlistItem {
  productId: string
}

const Wishlist: React.FC = () => {
  const { data: wishlistItems, loading, error } = useFetch<WishlistItem[]>('/api/wishlist')

  if (loading) return <div>Loading wishlist...</div>
  if (error) return <div>Error loading wishlist</div>
  if (!wishlistItems) return null

  const productIds = wishlistItems.map(item => item.productId).join(',')

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
      <ProductList productIds={productIds} />
    </div>
  )
}

export default Wishlist