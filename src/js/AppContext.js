import React, { useState, createContext, useEffect } from "react";
import createMenuDict from "./db";
export const AppContext = createContext();

export const AppProvider = (props) => {
  const [cartItems, setCartItems] = useState({}); //Cart items
  const [totalAmount, setTotalAmount] = useState(0); //Total amount
  const [date_time, setDateTime] = useState({}); //Date and time selected

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
      <AppContext.Provider
        value={[cartItems, setCartItems, totalAmount, date_time, setDateTime]}
      >
        {props.children}
      </AppContext.Provider>
    </>
  );
};
