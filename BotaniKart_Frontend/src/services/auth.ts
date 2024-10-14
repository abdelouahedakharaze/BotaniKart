import { api } from './api'

interface User {
  id: string
  name: string
  email: string
}

interface AuthResponse {
  user: User
  token: string
}

export const login = async (email: string, password: string): Promise<User> => {
  const response = await api.post<AuthResponse>('/auth/login', { email, password })
  localStorage.setItem('token', response.token)
  return response.user
}

export const register = async (name: string, email: string, password: string): Promise<User> => {
  const response = await api.post<AuthResponse>('/auth/register', { name, email, password })
  localStorage.setItem('token', response.token)
  return response.user
}

export const logout = () => {
  localStorage.removeItem('token')
}

export const getCurrentUser = async (): Promise<User | null> => {
  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    const user = await api.get<User>('/auth/me', token)
    return user
  } catch (error) {
    console.error('Failed to get current user:', error)
    return null
  }
}

export const getUsers = async (): Promise<User[]> => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('No token found')

  return api.get<User[]>('/users', token)
}

export const deleteUser = async (id: string): Promise<void> => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('No token found')

  await api.delete(`/users/${id}`, token)
}