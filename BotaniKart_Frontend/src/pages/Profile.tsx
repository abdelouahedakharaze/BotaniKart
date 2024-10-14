import React from 'react'
import { useAuth } from '../hooks/useAuth'
import ProfileForm from '../components/user/ProfileForm'

const Profile: React.FC = () => {
  const { user } = useAuth()

  if (!user) {
    return <div>Please log in to view your profile.</div>
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      <ProfileForm initialData={user} onSubmit={console.log} />
    </div>
  )
}

export default Profile