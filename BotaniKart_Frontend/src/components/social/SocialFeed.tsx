import React from 'react'
import { useFetch } from '../../hooks/useFetch'

interface SocialPost {
  id: string
  author: string
  content: string
  likes: number
  comments: number
  timestamp: string
}

const SocialFeed: React.FC = () => {
  const { data: posts, loading, error } = useFetch<SocialPost[]>('/api/social-feed')

  if (loading) return <div>Loading social feed...</div>
  if (error) return <div>Error loading social feed</div>
  if (!posts) return null

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">{post.author}</span>
            <span className="text-sm text-gray-500">{new Date(post.timestamp).toLocaleString()}</span>
          </div>
          <p className="mb-2">{post.content}</p>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{post.likes} likes</span>
            <span>{post.comments} comments</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SocialFeed