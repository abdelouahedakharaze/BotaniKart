import React, { useState, useEffect } from 'react'

interface NotificationProps {
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number
  onClose: () => void
}

const Notification: React.FC<NotificationProps> = ({ message, type, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-4 py-2 rounded-md shadow-md`}>
      {message}
    </div>
  )
}

export default Notification