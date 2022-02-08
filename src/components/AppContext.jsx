import React, { useState, createContext, useEffect } from 'react';
import { createMenuDict } from '../js/db';

const AppContext = createContext();

export { AppContext as AppContextProvider };

export const AppProvider = (props) => {
  // State variable definition
  const [cartItems, setCartItems] = useState(() => createMenuDict()); // Initialize cart items
  const [totalAmount, setTotalAmount] = useState(0); // Total amount
  const [dateTime, setDateTime] = useState({}); // Date and time selected
  const [table, setTable] = useState(); // Table selected
  const [photo, setPhoto] = useState(); // Photo
  const [userInfo, setUserInfo] = useState(); // User info
  const [orderNumber, setOrderNumber] = useState(); // Order number

  // UseEffect for updating the cart
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
    <AppContext.Provider
      value={{
        cartItems,
        setCartItems,
        totalAmount,
        dateTime,
        setDateTime,
        table,
        setTable,
        userInfo,
        setUserInfo,
        photo,
        setPhoto,
        orderNumber,
        setOrderNumber,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
