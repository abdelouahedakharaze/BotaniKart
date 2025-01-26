import React from 'react'

const Rating = ({ value, text, color = '#5fa75f' }) => {
  // Safely convert value to number and format
  const numericValue = Number(value || 0).toFixed(1)

  return (
    <div className="flex items-center gap-1">
      {/* Numeric Rating */}
      <span className="text-sm font-medium text-soil-700">
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
        <span className="ml-2 text-sm text-soil-600">
          ({String(text).replace(' reviews', '')})
        </span>
      )}
    </div>
  )
}

export default Rating