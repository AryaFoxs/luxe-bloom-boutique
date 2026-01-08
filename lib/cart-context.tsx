"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartAddon {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  addons?: CartAddon[];
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  addBundleItem: (item: Omit<CartItem, "quantity" | "addons">, addons: CartAddon[]) => void;
  removeItem: (id: string) => void;
  removeAddonFromItem: (itemId: string, addonId: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("luxe-bloom-cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart:", e);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("luxe-bloom-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === newItem.id && !item.addons?.length);
      
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === newItem.id && !item.addons?.length
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...currentItems, { ...newItem, quantity: 1 }];
    });
    setIsOpen(true);
  };

  // Add bundled item (bouquet + addons)
  const addBundleItem = (item: Omit<CartItem, "quantity" | "addons">, addons: CartAddon[]) => {
    const bundleId = `${item.id}-bundle-${Date.now()}`;
    setItems((currentItems) => [
      ...currentItems,
      {
        ...item,
        id: bundleId,
        quantity: 1,
        addons: addons.length > 0 ? addons : undefined,
      },
    ]);
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const removeAddonFromItem = (itemId: string, addonId: string) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id === itemId && item.addons) {
          const updatedAddons = item.addons.filter((addon) => addon.id !== addonId);
          return {
            ...item,
            addons: updatedAddons.length > 0 ? updatedAddons : undefined,
          };
        }
        return item;
      })
    );
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity;
    const addonsTotal = item.addons?.reduce((a, addon) => a + addon.price * addon.quantity, 0) || 0;
    return sum + itemTotal + (addonsTotal * item.quantity);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        addBundleItem,
        removeItem,
        removeAddonFromItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

