import "../css/table.css";
import React from "react";

const Table = (props) => {
    return (
        <div id="div_table">
        <img id="img_table" src="../static/icons/restaurant-table.png"></img>
        <p id="p_table">
            {props.number}
        </p>
        </div>
    );
};

export default Table;
