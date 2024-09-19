import React, { createContext, useLayoutEffect, useState } from 'react';
import foods from '../constants/foods';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(15);
  const [quantityCart, setQuantityCart] = useState(0);

  useLayoutEffect(() => {
    let sub = 0;
    let quan = 0;

    cartItems.forEach((item) => {
      const matchingProduct = foods.find((food) => food.id === item.id);
      if (matchingProduct) {
        sub += item.quantity * parseInt(matchingProduct.price, 10);
        quan += item.quantity;
      }
    });

    setSubTotal(sub);
    setTotal(sub + shippingFee);
    setQuantityCart(quan);
  }, [cartItems, shippingFee]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const handleAdd = (item) => {
    setCartItems((prevItems) => {
      return prevItems.map((cartItem) => {
        return cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      })
    });
  }

  const handleRemove = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          return prevItems.filter((i) => i.id !== item.id);
        }
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prevItems;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, handleAdd, handleRemove, subTotal, total, shippingFee, quantityCart, setQuantityCart }}>
      {children}
    </CartContext.Provider>
  );
};
