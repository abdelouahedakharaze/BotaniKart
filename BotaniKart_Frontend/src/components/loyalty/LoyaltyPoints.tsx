import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useFetch } from '../../hooks/useFetch'

interface LoyaltyData {
  points: number
  tier: string
}

const LoyaltyPoints: React.FC = () => {
  const { user } = useAuth()
  const { data: loyaltyData, loading, error } = useFetch<LoyaltyData>(`/api/loyalty/${user?.id}`)

  if (loading) return <div>Loading loyalty data...</div>
  if (error) return <div>Error loading loyalty data</div>
  if (!loyaltyData) return null

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Your Loyalty Status</h2>
      <p className="text-lg">Points: <span className="font-bold">{loyaltyData.points}</span></p>
      <p className="text-lg">Tier: <span className="font-bold">{loyaltyData.tier}</span></p>
    </div>
  )
}

export default LoyaltyPoints