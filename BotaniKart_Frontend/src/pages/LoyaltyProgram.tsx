import React from 'react'
import LoyaltyPoints from '../components/loyalty/LoyaltyPoints'
import RewardList from '../components/loyalty/RewardList'

const LoyaltyProgram: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Loyalty Program</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <LoyaltyPoints />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Available Rewards</h2>
          <RewardList />
        </div>
      </div>
    </div>
  )
}

export default LoyaltyProgram