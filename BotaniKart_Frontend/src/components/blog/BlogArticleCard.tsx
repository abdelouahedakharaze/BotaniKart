import React from 'react'
import { Link } from 'react-router-dom'

interface BlogArticleCardProps {
  id: number;
  title: string;
  excerpt: string;
  image: string;
}

const BlogArticleCard: React.FC<BlogArticleCardProps> = ({ id, title, excerpt, image }) => {
  return (
    <div 
      key={id} 
      className="bg-slate-100 rounded-lg overflow-hidden transform transition hover:scale-105"
      style={{
        boxShadow: 'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset', // Custom shadow
        borderRadius: '8px', // Rounded corners
        transition: 'transform 0.3s ease-in-out', // Smooth transition for the hover effect
      }}
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-dark-green">{title}</h3>
        <p className="text-dark-brown mb-4 ">{excerpt}</p>
        
        <Link 
          to={`/blog/${id}`} 
          className="relative text-medium-green hover:text-dark-green font-semibold"
        >
          Read More
        </Link>
      </div>
    </div>
  )
}

export default BlogArticleCard
