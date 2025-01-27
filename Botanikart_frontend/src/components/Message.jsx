import React from 'react'

const Message = ({ variant = 'green', children }) => {
  // Map custom variants to the plant-and-soil theme colors
  const getVariantStyle = () => {
    switch(variant) {
      case 'danger':
        return 'bg-[#98C167] border-[#4C9A5D] text-[#2E5423]'  // earthy green for danger
      case 'success':
        return 'bg-[#A7D38D] border-[#66A766] text-[#3E6B32]'  // soft green for success
      case 'warning':
        return 'bg-[#E0E2A9] border-[#B2B59D] text-[#7B7D3A]'  // muted yellow for warning
      case 'info':
        return 'bg-[#B3D0A1] border-[#6B8E42] text-[#3D5B2C]'  // subtle green for info
      default:
        return 'bg-[#A7D38D] border-[#66A766] text-[#3E6B32]'  // soft green as default
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
