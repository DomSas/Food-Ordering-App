import React, { useState, createContext, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState({
    Starter: [
      { name: "Pizza", price: 80, amount: 0 },
      { name: "Pasta", price: 30, amount: 0 },
    ],
    Main: [
      { name: "Paella", price: 180, amount: 0 },
      { name: "Buritos", price: 330, amount: 0 },
    ],
  });
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // TODO API call to fill menu
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
