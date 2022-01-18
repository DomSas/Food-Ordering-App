import React, { useState, createContext } from "react";

export const CartContext = createContext();

export const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState([
    { name: "Udon", price: "80" },
    { name: "Sushi", price: "30" },
  ]);

  return (
    <>
      <CartContext.Provider value={[cartItems, setCartItems]}>
        {props.children}
      </CartContext.Provider>
    </>
  );
};
