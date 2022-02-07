import "../css/TablePicker.css";
import React, { useContext, useEffect, useState } from "react";
import { Page } from "framework7-react";
import FooterButtons from "../components/FooterButtons";
import Table from "../components/table";
import { Camera } from "framework7-icons/react";
import { getTableAvailability } from "../js/db";
import { AppContext } from "../js/AppContext";
import NavbarBack from "../components/NavbarBack";

const TablePickerPage = () => {
  //Context variables definition
  const [
    cartItems,
    setCartItems,
    totalAmount,
    date_time,
    setDateTime,
    table,
    setTable,
    userInfo,
    setUserInfo,
    photo,
    setPhoto,
  ] = useContext(AppContext);

  //State variables definition
  const [tablesAvailable, setTablesAvailable] = useState([]);
  const [selectedTable, setSelectedTable] = useState();

  //Table set if needed
  if (table) {
    if (table != selectedTable) {
      setSelectedTable(table);
    }
  }

  //UseEffect for rendering anytime the tables available change
  useEffect(() => {}, [tablesAvailable]);

  //UseEffect for selecting a table
  useEffect(() => {
    setTable(selectedTable);
  }, [selectedTable]);

  //UseEffect for getting and setting the tables available
  useEffect(() => {
    getTableAvailability(date_time).then((tables) => {
      setTablesAvailable(tables);
    });
  }, []);

  //Function for taking the photo
  function takePhoto() {
    navigator.camera.getPicture(onSuccess, onFail, {
      destinationType: 0,
    });
  }

  //Photo took successfully
  function onSuccess(imageURI) {
    setPhoto(imageURI);
  }
  //Error while taking the photo
  function onFail(message) {
    alert("Failed because: " + message);
  }

  return (
    <Page name="table-picker">
      <NavbarBack />
      <div className="table_picker_container">
        <h2 className="table_picker_title">
          Where would you
          <br /> like to sit?
        </h2>
        <div id="tables">
          <div className="row">
            <a
              onClick={() => setSelectedTable(1)}
              className={
                tablesAvailable.includes(1)
                  ? selectedTable === 1
                    ? "col-33 selected"
                    : "col-33"
                  : "col-33 table_disabled"
              }
            >
              <Table number="1"></Table>
            </a>
            <a
              onClick={() => setSelectedTable(2)}
              className={
                tablesAvailable.includes(2)
                  ? selectedTable === 2
                    ? "col-33 selected"
                    : "col-33"
                  : "col-33 table_disabled"
              }
            >
              <Table number="2"></Table>
            </a>
            <a
              onClick={() => setSelectedTable(3)}
              className={
                tablesAvailable.includes(3)
                  ? selectedTable === 3
                    ? "col-33 selected"
                    : "col-33"
                  : "col-33 table_disabled"
              }
            >
              <Table number="3"></Table>
            </a>
          </div>
          <div className="row">
            <a
              onClick={() => setSelectedTable(4)}
              className={
                tablesAvailable.includes(4)
                  ? selectedTable === 4
                    ? "col-33 selected"
                    : "col-33"
                  : "col-33 table_disabled"
              }
            >
              <Table number="4"></Table>
            </a>
            <a
              onClick={() => setSelectedTable(5)}
              className={
                tablesAvailable.includes(5)
                  ? selectedTable === 5
                    ? "col-33 selected"
                    : "col-33"
                  : "col-33 table_disabled"
              }
            >
              <Table number="5"></Table>
            </a>
            <a
              onClick={() => setSelectedTable(6)}
              className={
                tablesAvailable.includes(6)
                  ? selectedTable === 6
                    ? "col-33 selected"
                    : "col-33"
                  : "col-33 table_disabled"
              }
            >
              <Table number="6"></Table>
            </a>
          </div>
        </div>
        <h2 className="table_picker_title">Take a picture</h2>
        <div id="viewport" className="viewport">
          <img id="test_img" src="" />
        </div>
        <Camera
          onClick={takePhoto}
          className="center"
          style={{ fontSize: 50, marginBottom: "120px" }}
        />

        <FooterButtons
          leftButton={{
            label: "Back",
            href: "/date-time/",
            id: "secondaryButton",
            className: "back",
          }}
          rightButton={{
            label: "Next",
            id: selectedTable ? "primaryButton" : "disabledPrimaryButton",
            href: selectedTable ? "/payment/" : "",
          }}
        />
      </div>
    </Page>
  );
};

export default TablePickerPage;
