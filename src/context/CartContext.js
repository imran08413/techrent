import React, { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage('techrent_cart', []);

  const addToCart = (product) => {
    if (!cart.find(item => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};