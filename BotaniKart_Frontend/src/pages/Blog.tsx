import React from 'react'
import PostList from '../components/blog/PostList'
import CategoryList from '../components/blog/CategoryList'

const Blog: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <CategoryList />
        </div>
        <div className="md:col-span-3">
          <PostList />
        </div>
      </div>
    </div>
  )
}

export default Blog