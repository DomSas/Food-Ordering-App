import { BlockTitle, List, ListItem, Sheet, Toggle } from 'framework7-react';
import React from 'react';
import '../css/Settings.css';

const Settings = () => {
  const checkCameraAccess = () => {
    if (cordova.plugins.diagnostic.isCameraAuthorized()) {
      return true;
    } else {
      return false;
    }
  };
  const checkLocationAccess = () => {
    if (cordova.plugins.diagnostic.isLocationAuthorized()) {
      return true;
    } else {
      return false;
    }
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
    <Sheet className="settings-sheet">
      <BlockTitle>Settings</BlockTitle>
      <List simpleList>
        <ListItem>
          <span>Allow camera access</span>
          <Toggle
            onChange={cameraChange}
            checked={{ checkCameraAccess }}
            color="gray"
          ></Toggle>
        </ListItem>
        <ListItem>
          <span>Allow location access</span>
          <Toggle
            onChange={locationChange}
            checked={{ checkLocationAccess }}
            color="gray"
          ></Toggle>
        </ListItem>
      </List>
    </Sheet>
  );
};

export default Settings;
