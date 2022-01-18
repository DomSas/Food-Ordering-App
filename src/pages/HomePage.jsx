import "../css/HomePage.css";
import React from "react";
import { Page } from "framework7-react";

const HomePage = () => {
  return (
    <Page name="home">
      <div className="container">
        {/* <div className="ramen-img">
          <img src="../static/icons/ramen.jpg" alt="ramen" />
        </div> */}
        <div className="header">
          <h1>Welcome to Pab-Dom</h1>
          <div className="logo-img">
            <img src="../static/icons/logo_ramen-black.png" alt="logo_ramen" />
          </div>
          <p>Explore the taste of Japan with us</p>
        </div>
        <div className="buttons">
          <a href="/food/" data-transition="f7-cover">
            <button className="col button button-fill button-round">
              Menu
            </button>
          </a>
          <a href="/about-us/" data-transition="f7-cover">
            <button className="col button button-fill  button-round">
              About Us
            </button>
          </a>
        </div>
      </div>
    </Page>
  );
};

export default HomePage;
