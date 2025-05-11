'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem, CartTour } from '../types';

type CartContextType = {
  cart: CartItem[];
  addToCart: (tour: CartTour, date: string, time: string) => void;
  removeFromCart: (tourId: string, date: string, time: string) => void;
  updateQuantity: (tourId: string, date: string, time: string, quantity: number) => void;
  clearCart: () => void;
  cartItemCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Initialize cart from localStorage after component mounts
  useEffect(() => {
    setIsClient(true);
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error parsing cart from localStorage', error);
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isClient]);

  // Listen for add-to-cart events
  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { cartTour, date, time } = customEvent.detail;
      addToCart(cartTour, date, time);
    };
    window.addEventListener('add-to-cart', handler as EventListener);
    return () => window.removeEventListener('add-to-cart', handler as EventListener);
  }, [cart]);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (tour: CartTour, date: string, time: string) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.tour.id === tour.id && item.date === date && item.time === time
      );

      if (existingItemIndex >= 0) {
        const newCart = [...prevCart];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + 1
        };
        return newCart;
      }

      const newItem: CartItem = {
        tour: {
          id: tour.id,
          title: tour.title,
          price: tour.price,
          image: tour.image,
          duration: tour.duration
        },
        quantity: 1,
        date,
        time
      };
      return [...prevCart, newItem];
    });
  };

  const removeFromCart = (tourId: string, date: string, time: string) => {
    setCart(prevCart => 
      prevCart.filter(item => 
        !(item.tour.id === tourId && item.date === date && item.time === time)
      )
    );
  };

  const updateQuantity = (tourId: string, date: string, time: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(tourId, date, time);
      return;
    }


    setCart(prevCart =>
      prevCart.map(item =>
        item.tour.id === tourId && item.date === date && item.time === time
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        cartItemCount 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
