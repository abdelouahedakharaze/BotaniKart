const API_BASE_URL = 'https://api.botanikart.com' // Replace with your actual API URL

interface RequestOptions extends RequestInit {
  token?: string
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { token, ...fetchOptions } = options
  const headers = new Headers(fetchOptions.headers)

  if (token) {
    headers.append('Authorization', `Bearer ${token}`)
  }

  headers.append('Content-Type', 'application/json')

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}

export const api = {
  get: <T>(endpoint: string, token?: string) => request<T>(endpoint, { method: 'GET', token }),
  post: <T>(endpoint: string, data: any, token?: string) => 
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(data), token }),
  put: <T>(endpoint: string, data: any, token?: string) => 
    request<T>(endpoint, { method: 'PUT', body: JSON.stringify(data), token }),
  delete: <T>(endpoint: string, token?: string) => 
    request<T>(endpoint, { method: 'DELETE', token }),
}