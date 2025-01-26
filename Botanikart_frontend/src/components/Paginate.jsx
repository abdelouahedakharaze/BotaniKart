import React from 'react'
import { Link } from 'react-router-dom'

const Paginate = ({ pages, page, keyword = '', isAdmin = false }) => {
  if (keyword) {
    keyword = keyword.split('?keyword=')[1].split('&')[0]
  }

  return (
    pages > 1 && (
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: pages }, (_, i) => (
          <Link
            key={i + 1}
            to={{
              pathname: !isAdmin ? '/' : '/admin/productlist/',
              search: `?keyword=${keyword}&page=${i + 1}`,
            }}
            className={`px-4 py-2 rounded-md transition-colors ${
              i + 1 === page
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
            aria-current={i + 1 === page ? 'page' : undefined}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    )
  )
}

export default Paginate