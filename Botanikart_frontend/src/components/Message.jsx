import React from 'react'

const Message = ({ variant = 'blue', children }) => {
  // Map Bootstrap variants to Tailwind colors
  const getVariantStyle = () => {
    switch(variant) {
      case 'danger':
        return 'bg-red-100 border-red-400 text-red-700'
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700'
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-700'
      case 'info':
        return 'bg-blue-100 border-blue-400 text-blue-700'
      default:
        return 'bg-blue-100 border-blue-400 text-blue-700'
    }
  }

  return (
    <div 
      className={`${getVariantStyle()} px-4 py-3 rounded relative mb-4 border-l-4`} 
      role="alert"
    >
      {children}
    </div>
  )
}

export default Message