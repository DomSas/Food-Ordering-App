import React, { useState, createContext, useEffect } from "react";
import createMenuDict from "./db";
export const AppContext = createContext();

export const AppProvider = (props) => {
  const [cartItems, setCartItems] = useState({}); //Cart items
  const [totalAmount, setTotalAmount] = useState(0); //Total amount
  const [date_time, setDateTime] = useState({}); //Date and time selected
  const [table, setTable] = useState(); //Table selected
  const [photo, setPhoto] = useState(); //Photo
  const [userInfo, setUserInfo] = useState(); //User info

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
        value={[
          cartItems,
          setCartItems,
          totalAmount,
          date_time,
          setDateTime,
          table,
          setTable,
          userInfo,
          setUserInfo,
          photo,
          setPhoto,
        ]}
      >
        {props.children}
      </AppContext.Provider>
    </>
  );
};
