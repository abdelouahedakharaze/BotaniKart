import { api } from './api'

export interface Order {
  id: string
  userId: string
  items: Array<{ productId: string; quantity: number }>
  total: number
  status: string
  createdAt: string
}

export const orderService = {
  getOrders: () => api.get<Order[]>('/orders'),
  getOrder: (id: string) => api.get<Order>(`/orders/${id}`),
  createOrder: (order: Omit<Order, 'id' | 'createdAt'>) => api.post<Order>('/orders', order),
  updateOrderStatus: (id: string, status: string) => api.put(`/orders/${id}`, { status }),
}