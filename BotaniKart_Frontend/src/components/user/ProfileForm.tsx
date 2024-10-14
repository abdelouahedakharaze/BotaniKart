import React, { useState } from 'react'
import { Button } from '../common/Button'
import { Input } from '../common/Input'

interface ProfileFormData {
  name: string
  email: string
  phone: string
  address: string
}

interface ProfileFormProps {
  initialData: ProfileFormData
  onSubmit: (data: ProfileFormData) => void
}

const ProfileForm: React.FC<ProfileFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<ProfileFormData>(initialData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        label="Phone"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
      />
      <Input
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />
      <Button type="submit">Update Profile</Button>
    </form>
  )
}

export default ProfileForm