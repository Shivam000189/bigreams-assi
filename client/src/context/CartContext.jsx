import { createContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const CART_STORAGE_KEY = "bigreams-cart";

const getInitialCart = () => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getInitialCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === product.id);
      if (existingItem) {
        return items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...items, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((items) => quantity < 1
      ? items.filter((item) => item.id !== productId)
      : items.map((item) => item.id === productId ? { ...item, quantity } : item)
    );
  };

  const removeFromCart = (productId) => setCartItems((items) => items.filter((item) => item.id !== productId));
  const clearCart = () => setCartItems([]);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);

  const value = useMemo(() => ({ cartItems, cartCount, cartTotal, addToCart, updateQuantity, removeFromCart, clearCart }), [cartItems, cartCount, cartTotal]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext };
