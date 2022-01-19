import React, { useState, createContext, useEffect } from "react";
import createMenuDict from "./db";
export const CartContext = createContext();

export const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setCartItems(createMenuDict());
  }, []);

  useEffect(() => {
    let newTotal = 0;

    Object.values(cartItems).map((value) => {
      value.forEach((item) => {
        newTotal += item.price * item.amount;
      });
    });

    setTotalAmount(newTotal);
  }, [cartItems]);

  return (
    <>
      <CartContext.Provider value={[cartItems, setCartItems, totalAmount]}>
        {props.children}
      </CartContext.Provider>
    </>
  );
};
