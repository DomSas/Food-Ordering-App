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
            (props.leftButtonId == "secondaryButton"
              ? "button-outline"
              : "button-fill")
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
            (props.rightButtonId == "secondaryButton"
              ? "button-outline"
              : "button-fill")
          }
        >
          {props.rightButtonName}
        </button>
      </a>
    </div>
  );
};

export default FooterButtons;
