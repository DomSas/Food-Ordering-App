import React, { Fragment } from "react";
import "../css/NavbarBack.css";

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
    </div>
  );
};

export default NavbarBack;
