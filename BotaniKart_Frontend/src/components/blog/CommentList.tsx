import React from 'react'
import { formatDate } from '../../utils/formatDate'

interface Comment {
  id: string
  author: string
  content: string
  createdAt: string
}

interface CommentListProps {
  comments: Comment[]
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="bg-white p-4 rounded-lg shadow-md">
              <p className="font-semibold">{comment.author}</p>
              <p className="text-gray-600 text-sm">{formatDate(comment.createdAt)}</p>
              <p className="mt-2">{comment.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CommentList