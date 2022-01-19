import "../css/FooterButtons.css";
import React from "react";

const FooterButtons = (props) => {
  return (
    <div className="buttons">
      <a href={props.primaryButtonPath} data-transition="f7-cover">
        <button
          id="primaryButton"
          className="col button button-fill button-raised button-round"
        >
          {props.primaryButtonName}
        </button>
      </a>
      <a href={props.secondaryButtonPath} data-transition="f7-cover">
        <button
          id="secondaryButton"
          className="col button button-outline button-raised button-round secondary"
        >
          {props.secondaryButtonName}
        </button>
      </a>
    </div>
  );
};

export default FooterButtons;
