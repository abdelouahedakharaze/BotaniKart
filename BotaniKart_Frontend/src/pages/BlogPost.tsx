import React from 'react'
import { useParams } from 'react-router-dom'
import PostDetail from '../components/blog/PostDetail'
import CommentList from '../components/blog/CommentList'
import CommentForm from '../components/blog/CommentForm'

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <div>Post not found</div>
  }

  return (
    <div className="container mx-auto px-4">
      <PostDetail id={id} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <CommentList postId={id} />
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Add a Comment</h3>
          <CommentForm postId={id} />
        </div>
      </div>
    </div>
  )
}

export default BlogPost