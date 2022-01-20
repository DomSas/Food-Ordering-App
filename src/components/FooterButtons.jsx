import "../css/FooterButtons.css";
import React from "react";

const FooterButtons = (props) => {
  return (
    <div className="buttons">
      <a href={props.leftButtonPath} data-transition="f7-cover">
        <button
          id={props.leftButtonId}
          className={
            "col button button-raised button-round " +
            (props.leftButtonId == "primaryButton"
              ? "button-fill"
              : "button-outline")
          }
        >
          {props.leftButtonName}
        </button>
      </a>
      <a href={props.rightButtonPath} data-transition="f7-cover">
        <button
          id={props.rightButtonId}
          className={
            "col button button-raised button-round " +
            (props.rightButtonId == "primaryButton"
              ? "button-fill"
              : "button-outline")
          }
        >
          {props.rightButtonName}
        </button>
      </a>
    </div>
  );
};

export default FooterButtons;
