import "../css/TablePicker.css";
import React, { useContext } from "react";
import { Page } from "framework7-react";
import FooterButtons from "../components/FooterButtons";
import Table from "../components/table";
import { Camera } from "framework7-icons/react";
import { storage } from "../js/db";
import { ref, uploadString } from "firebase/storage";
import { getTableAvailability } from "../js/db";
import { AppContext } from "../js/AppContext";

const TablePickerPage = () => {
  const [cartItems, setCartItems, totalAmount, date_time, setDateTime] =
  useContext(AppContext);
  
  let tablesAvailable = [];
  let selectedTable;
  
  getTableAvailability(date_time).then((tables) => {
    tablesAvailable = tables;
  });

  function takePhoto() {

    console.log(selectedTable);
    navigator.camera.getPicture(onSuccess, onFail, {
      quality: 100,
      destinationType: 0,
    });
  }

  async function onSuccess(imageURI) {
    const metadata = {
      contentType: "image/jpeg",
    };

    uploadString(
      ref(storage, "photos/order_number.jpg"),
      imageURI,
      "base64",
      metadata
    ).then(() => {});
  }

  function onFail(message) {
    alert("Failed because: " + message);
  }


  return (
    <Page name="table-picker">
      <div className="table_picker_container">
        <h2 className="table_picker_title">
          Where would you
          <br /> like to sit?
        </h2>
        <div id="tables">
          <div className="row">
            <Table
              className="table col-33"
              number="1"
              disabled
            ></Table>
            <Table
              className="table col-33"
              disabled={tablesAvailable.includes(2)}
              number="2"
            ></Table>
            <Table
              className="table col-33"
              number="3"
            ></Table>
          </div>
          <div className="row">
            <Table
              className="table col-33"
              className={tablesAvailable.includes(2)?"":"table_disabled"}
              number="4"
            ></Table>
            <Table
              className="table col-33"
              disabled={!tablesAvailable.includes(5)}
              number="5"
            ></Table>
            <Table
              className="table col-33"
              disabled={!tablesAvailable.includes(6)}
              number="6"
            ></Table>
          </div>
        </div>
        <h2 className="table_picker_title">Take a picture</h2>
        <div id="viewport" className="viewport">
          <img id="test_img" src="" />
        </div>
        <Camera
          onClick={takePhoto}
          className="center"
          style={{ fontSize: 50 }}
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
            id: selectedTable ? "primaryButton" : "disabledButton",
            href: selectedTable ? "/payment/" : "",
          }}
        />
      </div>
    </Page>
  );
};

export default TablePickerPage;
