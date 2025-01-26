import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ prod }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 border border-soil-100">
      <Link to={`/product/${prod._id}`} className="block overflow-hidden rounded-t-lg">
        <img 
          src={'http://127.0.0.1:8000' + prod.image}
          alt={prod.name}
          className="w-full h-48 object-cover rounded-lg border border-soil-200 hover:border-soil-300 transition-colors"
        />
      </Link>

      <div className="pt-4 space-y-2">
        <Link to={`/product/${prod._id}`} className="group">
          <h3 className="text-lg font-serif font-bold text-soil-800 group-hover:text-soil-900 transition-colors">
            {prod.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          <Rating 
            value={prod.rating || 0} 
            text={`${prod.numReviews || 0} reviews`}
            color="#5fa75f"
          />
        </div>

        <div className="text-xl font-bold text-soil-700 mt-2">
          ${(Number(prod.price) || 0).toFixed(2)}
        </div>

        {prod.countInStock > 0 ? (
          <div className="text-sm text-plant-700 mt-2">
            <i className="fas fa-seedling mr-1"></i>
            {prod.countInStock} in stock
          </div>
        ) : (
          <div className="text-sm text-soil-500 mt-2">
            Out of stock
          </div>
        )}
      </div>
    </div>
  )
}

export default Product