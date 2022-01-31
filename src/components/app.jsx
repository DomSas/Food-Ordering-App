import React from "react";

import Framework7React, {
  App,
  Panel,
  Views,
  View,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
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
import { AppProvider } from "../js/AppContext";

export default () => {
  const f7params = {
    routes: routes,
    name: "My App",
    id: "com.myapp.test",
  };
  return (
    <>
      <App {...f7params} pushState="true">
        <AppProvider>
          <View main url="/" />
        </AppProvider>
      </App>
    </>
  );
};
