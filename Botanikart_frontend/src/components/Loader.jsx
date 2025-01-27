import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-Page">
      <div 
        className="animate-spin rounded-full h-[100px] w-[100px] border-t-4 border-b-4 border-medium-green mx-auto"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default Loader
