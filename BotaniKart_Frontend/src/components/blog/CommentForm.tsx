import React, { useState } from 'react'
import { Button } from '../common/Button'
import { Textarea } from '../common/Input'

interface CommentFormProps {
  postId: string
  onSubmit: (comment: string) => void
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onSubmit }) => {
  const [comment, setComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(comment)
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment..."
        rows={4}
        className="w-full mb-2"
        required
      />
      <Button type="submit">Submit Comment</Button>
    </form>
  )
}

export default CommentForm