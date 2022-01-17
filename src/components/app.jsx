import React from 'react';

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
  BlockFooter
} from 'framework7-react';

import routes from '../js/routes';
import HomePage from '../pages/HomePage';




export default () => {
  const f7params = {
    name: 'My App',
    id: 'com.myapp.test',
    routes: routes
  };
    return (<>

    
      <App params={ f7params } >
        <View main url="/" />
      </App>

        
    </>
    )
}