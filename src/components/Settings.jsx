import { BlockTitle, List, ListItem, Sheet, Toggle } from "framework7-react";
import React from "react";
import "../css/Settings.css";

const Settings = () => {
  return (
    <Sheet className="settings-sheet">
      <BlockTitle>Settings</BlockTitle>
      <List simpleList>
        <ListItem>
          <span>Allow camera access</span>
          <Toggle defaultChecked color="green"></Toggle>
        </ListItem>
        <ListItem>
          <span>Allow location access</span>
          <Toggle defaultChecked color="green"></Toggle>
        </ListItem>
      </List>
    </Sheet>
  );
};

export default Settings;
