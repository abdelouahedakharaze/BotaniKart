import { useEffect } from 'react'
import { trackPageView } from '../services/analytics'

export const useAnalytics = (pageName: string) => {
  useEffect(() => {
    trackPageView(pageName)
  }, [pageName])
}