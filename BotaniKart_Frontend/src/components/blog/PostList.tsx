import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/formatDate'

interface Post {
  id: string
  title: string
  excerpt: string
  author: string
  createdAt: string
  slug: string
}

interface PostListProps {
  posts: Post[]
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <article key={post.id} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">
            <Link to={`/blog/${post.slug}`} className="text-primary hover:underline">
              {post.title}
            </Link>
          </h2>
          <div className="text-gray-600 mb-2">
            <span>By {post.author}</span> | <span>{formatDate(post.createdAt)}</span>
          </div>
          <p className="text-gray-700">{post.excerpt}</p>
          <Link to={`/blog/${post.slug}`} className="inline-block mt-4 text-primary hover:underline">
            Read more
          </Link>
        </article>
      ))}
    </div>
  )
}

export default PostList