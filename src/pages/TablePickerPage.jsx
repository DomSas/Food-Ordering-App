import "../css/TablePicker.css";
import React, { useEffect, useState } from "react";
import { Input, Page } from "framework7-react";
import FooterButtons from "../components/FooterButtons";
import { CartContext } from "../js/CartContext";
import { useContext } from "react";
import Table from "../components/table";


const TablePickerPage = () => {
    
    return (
        <Page name="table-picker">
            <div className="table_picker_container">
                <h2 className="table_picker_title">
                    Where would you
                    <br /> like to sit?
                </h2>
                <div id="tables">

                <Table class="table" number="1"></Table>
                <Table class="table" number="2"></Table>
                <Table class="table" number="3"></Table>
                <Table class="table" number="4"></Table>
                <Table class="table" number="5"></Table>
                <Table class="table" number="6"></Table>

                </div>
                <FooterButtons
                    leftButtonName="Back"
                    leftButtonPath="/food/"
                    leftButtonId="secondaryButton"
                    rightButtonName="Next"
                    rightButtonPath="/table/"
                    rightButtonId="disabledButton"
                />{" "}
            </div>
        </Page>
    );
};

export default TablePickerPage;
