
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from '../data/products';
import { useToast } from '@/components/ui/use-toast';

interface CartItem {
  product: Product;
  quantity: number;
  size: number;
  color: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, size: number, color: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (product: Product, quantity: number, size: number, color: string) => {
    setCart((prevCart) => {
      // Check if item already exists with same product ID, size, and color
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.color === color
      );

      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        
        toast({
          title: "Cart updated",
          description: `${product.name} quantity increased to ${updatedCart[existingItemIndex].quantity}`,
        });
        
        return updatedCart;
      } else {
        // Add new item
        toast({
          title: "Added to cart",
          description: `${product.name} added to your cart`,
        });
        
        return [...prevCart, { product, quantity, size, color }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    toast({
      title: "Item removed",
      description: "Product removed from your cart",
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = item.product.discount_percentage
        ? item.product.price * (1 - item.product.discount_percentage / 100)
        : item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
