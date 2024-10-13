import React, { useState, useEffect } from 'react'
import { getUsers, deleteUser } from '../../services/auth'
import { Button } from '../common/Button'

interface User {
  id: string
  name: string
  email: string
  role: string
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const fetchedUsers = await getUsers()
    setUsers(fetchedUsers)
  }

  const handleDelete = async (id: string) => {
    await deleteUser(id)
    fetchUsers()
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button onClick={() => handleDelete(user.id)} variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserManagement