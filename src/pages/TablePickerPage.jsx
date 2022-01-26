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
import NavbarBack from "../components/NavbarBack";

const TablePickerPage = () => {
  let selectedTable;

  const [cartItems, setCartItems, totalAmount, date_time, setDateTime] =
    useContext(AppContext);

  function takePhoto() {
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
      <NavbarBack />
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
              //onClick={setSelectedTable(1)}
            ></Table>
            <Table className="table col-33" number="2"></Table>
            <Table className="table col-33" number="3"></Table>
          </div>
          <div className="row">
            <Table className="table col-33" number="4"></Table>
            <Table className="table col-33" number="5"></Table>
            <Table className="table col-33" number="6"></Table>
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
            id: selectedTable ? "primaryButton" : "disabledPrimaryButton",
            href: selectedTable ? "/payment/" : "",
          }}
        />
      </div>
    </Page>
  );
};

export default TablePickerPage;
