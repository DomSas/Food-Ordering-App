import "../css/HomePage.css";
import React from "react";
import { Page } from "framework7-react";
import FooterButtons from "../components/FooterButtons";

const HomePage = () => {
  return (
    <Page name="home">
      <div className="container">
        <div className="ramen-img">
          <img src="../static/icons/ramen.jpg" alt="ramen" />
        </div>
        <div className="header">
          <h1>Welcome to Pab-Dom</h1>
          <div className="logo-img">
            <img src="../static/icons/logo_ramen.png" alt="logo_ramen" />
          </div>
          <p>Explore the taste of Japan with us</p>
        </div>
        <FooterButtons
          leftButtonName="Menu"
          leftButtonPath="/food/"
          leftButtonId="primaryButton"
          rightButtonName="About Us"
          rightButtonPath="/about-us/"
          rightButtonId="secondaryButton"
        />
      </div>
    </Page>
  );
};

export default HomePage;
