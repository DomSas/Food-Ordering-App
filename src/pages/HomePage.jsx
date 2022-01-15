import "../css/HomePage.css";
import React from "react";

const HomePage = () => {
  return (
    <>
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
        <div className="buttons">
          <button className="col button button-raised button-round">
            Menu
          </button>
          <button className="col button button-raised button-round">
            About Us
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
