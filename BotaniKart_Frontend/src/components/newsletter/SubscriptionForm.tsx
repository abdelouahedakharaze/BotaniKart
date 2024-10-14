import React, { useState } from 'react'
import { Button } from '../common/Button'
import { Input } from '../common/Input'

const SubscriptionForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log('Subscribing email:', email)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return <p className="text-green-600">Thank you for subscribing!</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-grow"
      />
      <Button type="submit">Subscribe</Button>
    </form>
  )
}

export default SubscriptionForm