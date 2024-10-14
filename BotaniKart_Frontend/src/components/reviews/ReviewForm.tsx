import React, { useState } from 'react'
import { Button } from '../common/Button'
import { Input, Textarea } from '../common/Input'

interface ReviewFormProps {
  productId: string
  onSubmit: (review: { rating: number; comment: string }) => void
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onSubmit }) => {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ rating, comment })
    setRating(5)
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
          Rating
        </label>
        <Input
          type="number"
          id="rating"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Comment
        </label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Submit Review</Button>
    </form>
  )
}

export default ReviewForm