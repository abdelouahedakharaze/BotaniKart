import React from 'react'
import { Button } from '../common/Button'

interface ShareButtonProps {
  url: string
  title: string
}

const ShareButton: React.FC<ShareButtonProps> = ({ url, title }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank')
    }
  }

  return (
    <Button onClick={handleShare}>
      Share
    </Button>
  )
}

export default ShareButton