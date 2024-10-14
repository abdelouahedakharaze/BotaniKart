import { api } from './api'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  stock: number
}

export const productService = {
  getProducts: () => api.get<Product[]>('/products'),
  getProduct: (id: string) => api.get<Product>(`/products/${id}`),
  createProduct: (product: Omit<Product, 'id'>) => api.post<Product>('/products', product),
  updateProduct: (id: string, product: Partial<Product>) => api.put<Product>(`/products/${id}`, product),
  deleteProduct: (id: string) => api.delete(`/products/${id}`),
}