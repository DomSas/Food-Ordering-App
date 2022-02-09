/* eslint-disable no-undef */
import {
  BlockTitle, List, ListItem, Sheet, Toggle,
} from 'framework7-react';
import React from 'react';
import '../css/Settings.css';

const Settings = () => {
  const checkCameraAccess = () => {
    if (cordova.plugins.diagnostic.isCameraAuthorized()) {
      return true;
    }
    return false;
  };

  const checkLocationAccess = () => {
    if (cordova.plugins.diagnostic.isLocationAuthorized()) {
      return true;
    }
    return false;
  };

  const cameraChange = () => {
    if (checkCameraAccess()) {
      navigator.permissions.revoke({ name: 'camera' });
    } else {
      cordova.plugins.diagnostic.requestCameraAuthorization();
    }
  };

  const locationChange = () => {
    if (checkLocationAccess()) {
      navigator.permissions.revoke({ name: 'location' });
    } else {
      cordova.plugins.diagnostic.requestLocationAuthorization();
    }
  };

  return (
    <Sheet swipeToClose closeByOutsideClick className="settings-sheet">
      <BlockTitle>Settings</BlockTitle>
      <List simpleList>
        <ListItem>
          <span>Allow camera access</span>
          <Toggle
            onChange={cameraChange}
            checked={{ checkCameraAccess }}
            color="gray"
          />
        </ListItem>
        <ListItem>
          <span>Allow location access</span>
          <Toggle
            onChange={locationChange}
            checked={{ checkLocationAccess }}
            color="gray"
          />
        </ListItem>
      </List>
    </Sheet>
  );
};

export default Settings;
