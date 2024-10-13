// src/services/auth.ts
export const login = async (credentials: { username: string; password: string }) => {
  const response = await fetch('/api/users/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return await response.json();
};
