import "../css/AboutUsPage.css";
import React from "react";
import { Icon } from "framework7-react";

const AboutUsPage = () => {
  return (
    <>
      <p>
        <span><strong>About:</strong></span>
        <span>We are European based Asian restaurant with over 50 branches in countries like Austria, France, Norway, Belgium...</span>
        <span>All our chiefs have long term experience in their field, and we make sure to choose only the best quality ingredients to satisfy our customers.</span>

        <span className="second"><strong>Contact - Main Branch:</strong></span>
        <span>Pab-Dom Restaurant<br />
          46 Rue Bonneterie<br />
          75009 Paris<br />
          France<br />
        </span>

        <span className="bottom">Created by Asial Corporation<br />
          App Version: 1.0.0</span>

        <button className="col button button-fill button-round">
        Back to Home
        </button>
      </p>
    </>
  );
};

export default AboutUsPage;
