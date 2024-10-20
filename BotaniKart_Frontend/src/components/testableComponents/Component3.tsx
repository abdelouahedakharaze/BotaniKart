import React, { useState } from 'react'
import { Heart, MessageCircle, Send } from 'lucide-react'

// Mock data for the article
const article = {
  id: 1,
  title: "The Art of Pruning: Keeping Your Plants Healthy and Vibrant",
  content: `
    <p>Pruning is an essential skill for any plant enthusiast. It's not just about maintaining the shape of your plants; it's about promoting their health and encouraging new growth. In this article, we'll explore the best practices for pruning various types of plants, from delicate herbs to sturdy shrubs.</p>
    <h2>Why Prune?</h2>
    <p>Pruning serves several purposes:</p>
    <ul>
      <li>Removes dead or diseased parts of the plant</li>
      <li>Improves air circulation and light penetration</li>
      <li>Encourages new growth and flowering</li>
      <li>Maintains the desired shape and size of the plant</li>
    </ul>
    <h2>Basic Pruning Techniques</h2>
    <p>There are several basic cuts you should master:</p>
    <ol>
      <li><strong>Pinching:</strong> Using your thumb and forefinger to remove soft, new growth.</li>
      <li><strong>Thinning:</strong> Removing entire branches back to their point of origin.</li>
      <li><strong>Heading:</strong> Cutting branches back to a bud.</li>
      <li><strong>Shearing:</strong> Cutting to create a smooth, even surface (best for hedges).</li>
    </ol>
    <p>Remember, always use clean, sharp tools to make clean cuts and prevent the spread of disease.</p>
  `,
  author: "Maria Green",
  date: "May 15, 2023",
  likes: 42,
  comments: [
    { id: 1, author: "John Doe", content: "Great article! I've been looking for pruning tips.", date: "May 16, 2023" },
    { id: 2, author: "Jane Smith", content: "This helped me a lot with my rose bushes. Thanks!", date: "May 17, 2023" }
  ]
}

export default function ArticlePage() {
  const [likes, setLikes] = useState(article.likes)
  const [comments, setComments] = useState(article.comments)
  const [newComment, setNewComment] = useState("")

  const handleLike = () => {
    setLikes(likes + 1)
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Current User",
        content: newComment,
        date: new Date().toLocaleDateString()
      }
      setComments([...comments, comment])
      setNewComment("")
    }
  }

  return (
    <div className="min-h-screen bg-olive-50 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img src="/placeholder.svg?height=400&width=800" alt={article.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-olive-900 mb-4">{article.title}</h1>
          <div className="flex justify-between items-center text-olive-600 mb-6">
            <span>{article.author} • {article.date}</span>
            <div className="flex items-center space-x-4">
              <button onClick={handleLike} className="flex items-center text-olive-700 hover:text-olive-900">
                <Heart size={20} className="mr-1" />
                {likes}
              </button>
              <span className="flex items-center">
                <MessageCircle size={20} className="mr-1" />
                {comments.length}
              </span>
            </div>
          </div>
          <div className="prose prose-olive max-w-none mb-8" dangerouslySetInnerHTML={{ __html: article.content }} />
          <div className="border-t border-olive-200 pt-6">
            <h2 className="text-2xl font-semibold text-olive-900 mb-4">Comments</h2>
            {comments.map((comment) => (
              <div key={comment.id} className="bg-olive-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-olive-800">{comment.author}</span>
                  <span className="text-olive-600 text-sm">{comment.date}</span>
                </div>
                <p className="text-olive-700">{comment.content}</p>
              </div>
            ))}
            <form onSubmit={handleCommentSubmit} className="mt-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-2 border border-olive-300 rounded-md focus:ring-olive-500 focus:border-olive-500"
                rows={3}
              />
              <button type="submit" className="mt-2 bg-olive-600 text-white px-4 py-2 rounded-md hover:bg-olive-700 transition duration-300 flex items-center">
                <Send size={16} className="mr-2" />
                Post Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}