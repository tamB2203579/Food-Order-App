import React, { createContext, useLayoutEffect, useState } from 'react';
import foods from '../constants/foods';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(15);

  useLayoutEffect(() => {
    let sub = 0;
    cartItems.forEach((item) => {
      const matchingProduct = foods.find((food) => food.id === item.id);
      if (matchingProduct) {
        sub += item.quantity * parseInt(matchingProduct.price, 10);
      }
    });
    setSubTotal(sub);
    setTotal(sub + shippingFee);
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
      return prevItems.map((cartItem) => {
        return (cartItem.id === item.id && item.id > 0) ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      })
    });
  }


  return (
    <CartContext.Provider value={{ cartItems, addToCart, handleAdd, handleRemove, subTotal, total, shippingFee }}>
      {children}
    </CartContext.Provider>
  );
};
