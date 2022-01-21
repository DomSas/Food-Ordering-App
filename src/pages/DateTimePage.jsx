import "../css/DateTimePage.css";
import React, { useEffect, useState } from "react";
import { Input, Page } from "framework7-react";
import FooterButtons from "../components/FooterButtons";
import { CartContext } from "../js/CartContext";
import { useContext } from "react";
import { checkDateTime } from "../js/db";


const DateTimePage = () => {

    const [setDateTime] = useContext(CartContext);
    const today = new Date();

    const [selectedDate, setSelectedDate] = useState();
    const [selectedTime, setSelectedTime] = useState();
    const [validTime, setValidTime] = useState(false);

    let minutes = today.getMinutes();
    if (minutes < 30) {
        today.setMinutes = 30;
    }
    else if (minutes >= 30) {
        today.setMinutes = 0;
        today.setHours = today.getHours + 1;
    }

    let dateInputValid = false;
    let timeInputValid = false;
    let formValid = false;

    useEffect(() => {
        console.log("before if")
        if (selectedDate && selectedTime && validTime) {
            console.log("after if")
            console.log(selectedDate + " " + selectedTime)
            console.log(checkDateTime(selectedDate, selectedTime))
            const dateSplit = selectedDate.split("/");
            setSelectedDate(Date(dateSplit[1] + "/" + dateSplit[0] + "/" + dateSplit[2]).toString());
            console.log(selectedDate + " " + selectedTime)
            if (checkDateTime(Date(dateSplit[1] + "/" + dateSplit[0] + "/" + dateSplit[2]).toString(), selectedTime)) {
                setDateTime({ date: selectedDate, time: selectedTime });
            }
        }
    }, [validTime]);


    function checkValidityDate(isValid) {
        console.log("checking date")
        if (isValid) {
            dateInputValid = true;
            if (timeInputValid === true) {
                formValid = true;
                console.log("form valid")
            }
        }
        else {
            dateInputValid = false;
            formValid = false;
        }
    }

    function checkValidityTime(isValid) {
        console.log("checking time")
        if (isValid) {
            timeInputValid = true;
            if (dateInputValid === true) {
                formValid = true;
                console.log("form valid")

            }
        }
        else {
            timeInputValid = false;
            formValid = false;
        }
    }


    return (
        <Page name="date-time">
            <div className="date_time_container">
                <h2 className="date_time_title">
                    When would you like
                    <br /> to come?
                </h2>
                <form>
                    <Input
                        label="Select your date"
                        type="datepicker"
                        placeholder="Select your date"
                        id="dateInput"
                        validate
                        required
                        calendarParams={{ minDate: today }}
                        onInputNotEmpty={(e)=>setSelectedDate(e.target.value)}
                    />
                    <Input
                        label="Select your time"
                        type="time"
                        step="3600"
                        id="timeInput"
                        required
                        min="11:00"
                        max="22:30"
                        placeholder="Select your time"
                        validate
                        onInputNotEmpty={(e)=>setSelectedTime(e.target.value)}
                        onValidate={(isValid) => setValidTime(isValid)}
                    />
                </form>

                <FooterButtons
                    leftButtonName="Back"
                    leftButtonPath="/food/"
                    leftButtonId="secondaryButton"
                    rightButtonName="Next"
                    rightButtonPath="/table/"
                    rightButtonId={selectedDate && selectedTime && validTime ? "primaryButton" : "disabledButton"}
                />{" "}
            </div>
        </Page>
    );
};

export default DateTimePage;
