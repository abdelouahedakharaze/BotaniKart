import React from 'react'
import { useFetch } from '../../hooks/useFetch'
import { Button } from '../common/Button'

interface Reward {
  id: string
  name: string
  description: string
  pointsCost: number
}

const RewardList: React.FC = () => {
  const { data: rewards, loading, error } = useFetch<Reward[]>('/api/rewards')

  if (loading) return <div>Loading rewards...</div>
  if (error) return <div>Error loading rewards</div>
  if (!rewards) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rewards.map((reward) => (
        <div key={reward.id} className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">{reward.name}</h3>
          <p className="text-gray-600 mb-4">{reward.description}</p>
          <div className="flex justify-between items-center">
            <span className="font-bold">{reward.pointsCost} points</span>
            <Button variant="primary" size="small">Redeem</Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RewardList