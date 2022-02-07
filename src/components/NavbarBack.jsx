import Gear from "framework7-icons/react/cjs/Gear";
import { Button, Navbar, NavLeft, NavRight } from "framework7-react";
import React from "react";
import "../css/NavbarBack.css";
import Settings from "./Settings";

const NavbarBack = () => {
  return (
    <Navbar transparent="true">
      <NavLeft backLink="Back"></NavLeft>
      <NavRight>
        <Settings></Settings>
        <Button sheetOpen=".settings-sheet" className="buttonSettings">
          <Gear style={{ fontSize: "25px", color: "#591303" }} />
        </Button>
      </NavRight>
    </Navbar>
  );
};

export default NavbarBack;
