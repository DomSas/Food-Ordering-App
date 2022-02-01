import "../css/table.css";
import React, { Fragment } from "react";

const Table = (props) => {
  return (
    <Fragment id="div_table">
      <img id="img_table" src="../static/icons/restaurant-table.png"></img>
      <p id="p_table">{props.number}</p>
    </Fragment>
  );
};

export default Table;
