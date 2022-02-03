import Gear from "framework7-icons/react/cjs/Gear";
import { Button } from "framework7-react";
import React, { Fragment } from "react";
import "../css/NavbarBack.css";
import Settings from "./Settings";

const NavbarBack = () => {
  return (
    <div className="navbar_back_container">
      <div className="navbar navbar-transparent">
        <div className="navbar-bg"></div>
        <div className="left">
          <a className="link back">
            <i className="icon icon-back"></i>
            <span className="if-not-md">Back</span>
          </a>
        </div>
      </div>
      <Settings></Settings>
      <Button className="buttonSettings" sheetOpen=".settings-sheet">
        <Gear></Gear>
      </Button>
    </div>
  );
};

export default NavbarBack;
