import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/formatDate'

interface Post {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
  category: {
    name: string
    slug: string
  }
}

interface PostDetailProps {
  post: Post
}

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  return (
    <article className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600 mb-4">
        <span>By {post.author}</span> | 
        <span> {formatDate(post.createdAt)}</span> | 
        <Link to={`/blog/category/${post.category.slug}`} className="text-primary hover:underline">
          {post.category.name}
        </Link>
      </div>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}

export default PostDetail