import React from 'react'
import { useFetch } from '../../hooks/useFetch'
import { formatDate } from '../../utils/formatDate'

interface Review {
  id: string
  userId: string
  username: string
  rating: number
  comment: string
  createdAt: string
}

interface ReviewListProps {
  productId: string
}

const ReviewList: React.FC<ReviewListProps> = ({ productId }) => {
  const { data: reviews, loading, error } = useFetch<Review[]>(`/api/products/${productId}/reviews`)

  if (loading) return <div>Loading reviews...</div>
  if (error) return <div>Error loading reviews</div>
  if (!reviews || reviews.length === 0) return <div>No reviews yet</div>

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">{review.username}</span>
            <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
          </div>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  )
}

export default ReviewList