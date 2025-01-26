import React from 'react'

const FormContainer = ({ children }) => {
  return (
    <div className="container mx-auto px-4 bg-tan py-6 rounded-lg shadow-md">
      <div className="flex flex-wrap justify-center">
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg border-2 border-dark-brown">
          {children}
        </div>
      </div>
    </div>
  )
}

export default FormContainer
