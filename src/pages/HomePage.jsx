import "../css/HomePage.css";
import React from "react";
import { Link } from "framework7-react";

const HomePage = () => {
  return (
    <>
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
          <button className="col button button-fill button-round">Menu</button>
          <Link href="/about-us/">About Page</Link>

          {/* <Link to="/about-us">
            <button className="col button button-outline  button-round">
              About Us
            </button>
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default HomePage;
