import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/common/Button'

const ErrorPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
      <p className="text-xl mb-8">We're sorry, but we couldn't find the page you were looking for.</p>
      <Link to="/">
        <Button>Go back to homepage</Button>
      </Link>
    </div>
  )
}

export default ErrorPage