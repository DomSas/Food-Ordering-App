import React from "react";

import {
  App,
  Panel,
  Views,
  View,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
  Link,
  Block,
  BlockTitle,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  ListInput,
  ListButton,
  BlockFooter,
} from "framework7-react";

import routes from "../js/routes";
import { CartProvider } from "../js/CartContext";

export default () => {
  const f7params = {
    routes,
    name: "My App",
    id: "com.myapp.test",
  };
  return (
    <>
      <App {...f7params}>
        <CartProvider>
          <View main url="/" />
        </CartProvider>
      </App>
    </>
  );
};
