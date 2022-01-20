import "../css/DateTimePage.css";
import React from "react";
import { Input, Page } from "framework7-react";
import FooterButtons from "../components/FooterButtons";

const DateTimePage = () => {

    const today = new Date();

    let minutes = today.getMinutes();
    if (minutes < 30) {
        today.setMinutes = 30;
    }
    else if (minutes >= 30) {
        today.setMinutes = 0;
        today.setHours = today.getHours + 1;
    }

    console.log(document.getElementsByClassName("date_time_container"));

    return (
        <Page name="date-time">
            <div className="date_time_container">
                <h2 className="date_time_title">
                    When would you like
                    <br /> to come?
                </h2>
                <Input
                    label="Select your date"
                    type="datepicker"
                    placeholder="Select your date"
                    validate
                    required
                    calendarParams={{ minDate: today }}
                />
                <Input
                    label="Select your time"
                    type="time"
                    step="3600"
                    validate
                    required
                    min="11:00"
                    max="22:30"
                    placeholder="Select your time"
                />

                <FooterButtons
                    leftButtonName="Back"
                    leftButtonPath="/food/"
                    leftButtonId="secondaryButton"
                    rightButtonName="Next"
                    rightButtonPath="/table/"
                    rightButtonId="primaryButton"
                />{" "}
            </div>
        </Page>
    );
};

export default DateTimePage;
