import React, { useState, createContext, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState([
    { name: "Pizza", price: 80, amount: 0 },
    { name: "Pasta", price: 30, amount: 0 },
  ]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // TODO API call to fill menu
  }, []);

  useEffect(() => {
    setTotalAmount(0);
    cartItems.forEach((item) => {
      console.log(item);
      // let newTotal = +item.price * +item.amount;

      setTotalAmount(totalAmount + item.price * item.amount);
    });
    console.log(totalAmount);
    console.log(cartItems);
  }, [cartItems]);

  return (
    <>
      <CartContext.Provider value={[cartItems, setCartItems, totalAmount]}>
        {props.children}
      </CartContext.Provider>
    </>
  );
};
