import React from 'react'

const Rating = ({ value, text, color = '#059669' }) => {
  const numericValue = Number(value || 0).toFixed(1)

  return (
    <div className="flex items-center gap-1">
      {/* Numeric Rating */}
      <span className="text-sm font-medium text-emerald-900">
        {numericValue}
      </span>

      {/* Stars */}
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((index) => (
          <span key={index} className="mr-0.5">
            <i
              style={{ color }}
              className={
                value >= index
                  ? 'fas fa-star'
                  : value >= index - 0.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
        ))}
      </div>

      {/* Reviews Count */}
      {text && (
        <span className="ml-2 text-sm text-stone-600">
          {text} {/* Removed the string replacement */}
        </span>
      )}
    </div>
  )
}

export default Rating