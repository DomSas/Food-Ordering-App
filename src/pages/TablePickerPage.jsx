import "../css/TablePicker.css";
import React from "react";
import { Page } from "framework7-react";
import FooterButtons from "../components/FooterButtons";
import Table from "../components/table";
import { Camera } from "framework7-icons/react";
import { storage } from "../js/db";
import { ref, uploadString } from "firebase/storage";


const TablePickerPage = () => {

    function takePhoto() {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 100,
            destinationType: 0
        });
    }

    async function onSuccess(imageURI) {
        var viewport = document.getElementById('viewport');
        viewport.style.display = "";
        viewport.style.position = "absolute";
        viewport.style.top = "10px";
        viewport.style.left = "10px";
        document.getElementById("test_img").src = "data:image/jpeg;base64," + imageURI;

        const metadata = {
            contentType: 'image/jpeg',
        };

        uploadString(ref(storage, "photos/image3.jpg"), imageURI, 'base64',metadata).then(() => {
        })


    }


    function onFail(message) {
        alert('Failed because: ' + message);
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
                        <Table className="table col-33" number="1"></Table>
                        <Table className="table col-33" number="2"></Table>
                        <Table className="table col-33" number="3"></Table>
                    </div>
                    <div className="row">
                        <Table className="table col-33" number="4"></Table>
                        <Table className="table col-33" number="5"></Table>
                        <Table className="table col-33" number="6"></Table>
                    </div>
                </div>
                <h2 className="table_picker_title">
                    Take a picture
                </h2>
                <div id="viewport" className="viewport">
                    <img id="test_img" src="" />
                </div>
                <Camera onClick={takePhoto} className="center" style={{ fontSize: 50 }} />

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
