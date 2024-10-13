// src/contexts/CartContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface CartContextType {
  items: string[]; // Replace with appropriate type
  addItem: (item: string) => void;
  removeItem: (item: string) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<string[]>([]); // Replace with appropriate type

  const addItem = (item: string) => setItems((prev) => [...prev, item]);
  const removeItem = (item: string) => setItems((prev) => prev.filter(i => i !== item));

  return (
    <CartContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
