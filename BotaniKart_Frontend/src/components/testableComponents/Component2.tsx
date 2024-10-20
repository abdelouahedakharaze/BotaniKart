import React from 'react'
import { Heart, MessageCircle } from 'lucide-react'
import Link from 'next/link'

interface ArticleCardProps {
  id: number
  title: string
  excerpt: string
  image: string
  author: string
  date: string
  likes: number
  comments: number
}

export default function ArticleCard({ id, title, excerpt, image, author, date, likes, comments }: ArticleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-olive-900 mb-2">{title}</h2>
        <p className="text-olive-700 mb-4">{excerpt}</p>
        <div className="flex justify-between items-center text-sm text-olive-600">
          <span>{author} • {date}</span>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Heart size={16} className="mr-1" />
              {likes}
            </span>
            <span className="flex items-center">
              <MessageCircle size={16} className="mr-1" />
              {comments}
            </span>
          </div>
        </div>
        <Link href={`/article/${id}`} className="mt-4 inline-block bg-olive-600 text-white px-4 py-2 rounded-md hover:bg-olive-700 transition duration-300">
          Read More
        </Link>
      </div>
    </div>
  )
}