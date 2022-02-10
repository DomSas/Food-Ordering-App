/* eslint-disable no-undef */
import {
  BlockTitle,
  f7,
  List,
  ListItem,
  Sheet,
  Toggle,
} from 'framework7-react';
import React, { useState } from 'react';
import '../css/Settings.css';

const Settings = () => {
  const [camera, setCamera] = useState(false);
  const [location, setLocation] = useState(false);

  const checkCameraAccess = async () => {
    if (camera !== undefined) {
      let access =
        await cordova.plugins.diagnostic.getCameraAuthorizationStatus(
          (status) => {
            // eslint-disable-next-line default-case
            switch (status) {
              case 'not_requested':
                if (camera !== undefined) {
                  cordova.plugins.diagnostic.requestCameraAuthorization();
                }
                setCamera(false);
              case 'denied_always':
                if (camera !== undefined) {
                  f7.dialog.alert(
                    'The Settings page for the app will now open. Select "Camera" and set it to "Always" then return to this app via the Home screen',
                    'Permission denied',
                    cordova.plugins.diagnostic.switchToSettings,
                    'Opening Settings page'
                  );
                }
                setCamera(false);
              default:
                if (camera !== undefined) {
                  f7.dialog.alert(
                    'The Settings page for the app will now open. Select "Camera" and set it to "Never" then return to this app via the Home screen',
                    'Deny permission through Settings',
                    cordova.plugins.diagnostic.switchToSettings,
                    'Deny permission through Settings'
                  );
                }
                setCamera(true);
            }
          }
        );
      return access;
    }
  };

  const checkLocationAccess = () => {
    cordova.plugins.diagnostic.getLocationAuthorizationStatus((status) => {
      // eslint-disable-next-line default-case
      switch (status) {
        case 'not_requested':
          if (location !== undefined) {
            cordova.plugins.diagnostic.requestLocationAuthorization();
            setLocation(false);
          }
        case 'denied_always':
          if (location !== undefined) {
            f7.dialog.alert(
              'The Settings page for the app will now open. Select "Location" and set it to "Always" then return to this app via the Home screen',
              'Permission denied',
              cordova.plugins.diagnostic.switchToSettings,
              'Opening Settings page'
            );
          }
          setLocation(false);
        default:
          if (location !== undefined) {
            f7.dialog.alert(
              'The Settings page for the app will now open. Select "Location" and set it to "Never" then return to this app via the Home screen',
              'Deny permission through Settings',
              cordova.plugins.diagnostic.switchToSettings,
              'Opening Settings page'
            );
          }
          setLocation(true);
      }
    });
  };

  return (
    <Sheet swipeToClose closeByOutsideClick className='settings-sheet'>
      <BlockTitle>Settings</BlockTitle>
      <List simpleList>
        <ListItem>
          <span>Allow camera access</span>
          <Toggle onChange={checkCameraAccess} checked={camera} color='gray' />
        </ListItem>
        <ListItem>
          <span>Allow location access</span>
          <Toggle
            onChange={checkLocationAccess}
            checked={location}
            color='gray'
          />
        </ListItem>
      </List>
    </Sheet>
  );
};

export default Settings;
