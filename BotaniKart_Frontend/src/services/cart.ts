import { api } from './api'

export interface CartItem {
  id: string
  productId: string
  quantity: number
}

export const cartService = {
  getCart: () => api.get<CartItem[]>('/cart'),
  addToCart: (productId: string, quantity: number) => api.post('/cart', { productId, quantity }),
  updateCartItem: (id: string, quantity: number) => api.put(`/cart/${id}`, { quantity }),
  removeFromCart: (id: string) => api.delete(`/cart/${id}`),
  clearCart: () => api.delete('/cart'),
}