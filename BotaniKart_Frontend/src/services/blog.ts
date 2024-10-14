import { api } from './api'

interface Post {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
  slug: string
}

interface Comment {
  id: string
  postId: string
  author: string
  content: string
  createdAt: string
}

export const getPosts = async (): Promise<Post[]> => {
  return api.get<Post[]>('/posts')
}

export const getPost = async (slug: string): Promise<Post> => {
  return api.get<Post>(`/posts/${slug}`)
}

export const createPost = async (post: Omit<Post, 'id' | 'createdAt'>): Promise<Post> => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('No token found')

  return api.post<Post>('/posts', post, token)
}

export const updatePost = async (id: string, post: Partial<Post>): Promise<Post> => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('No token found')

  return api.put<Post>(`/posts/${id}`, post, token)
}

export const deletePost = async (id: string): Promise<void> => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('No token found')

  await api.delete(`/posts/${id}`, token)
}

export const getComments = async (postId: string): Promise<Comment[]> => {
  return api.get<Comment[]>(`/posts/${postId}/comments`)
}

export const createComment = async (postId: string, content: string): Promise<Comment> => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('No token found')

  return api.post<Comment>(`/posts/${postId}/comments`, { content }, token)
}