import { useState, useEffect } from 'react';
import { ShoppingItem } from '@/types/shopping';

const STORAGE_KEY = 'sokoni-shopping-list';

export const useShoppingList = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to parse saved shopping list:', error);
      }
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<ShoppingItem, 'id'>) => {
    const newItem: ShoppingItem = {
      ...item,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    setItems(prev => [...prev, newItem]);
  };

  const updateItem = (id: string, updates: Partial<ShoppingItem>) => {
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearList = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    items,
    addItem,
    updateItem,
    removeItem,
    clearList,
    getTotalItems
  };
};