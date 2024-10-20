import React from 'react'

export default function Component() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-green-800 mb-6">Plant Paradise</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">Featured Plant</h2>
        <div className="bg-green-200 h-48 rounded-md mb-4 flex items-center justify-center">
          <span className="text-green-800">Plant Image Placeholder</span>
        </div>
        <p className="text-green-600 mb-4">
          Discover our beautiful selection of indoor and outdoor plants, perfect for any space.
        </p>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Shop Now
        </button>
      </div>
    </div>
  )
}