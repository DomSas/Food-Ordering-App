import "../css/DateTimePage.css";
import React from "react";
import { Input, Page } from "framework7-react";
import FooterButtons from "../components/FooterButtons";

const DateTimePage = () => {

    const today = new Date();
    let monthNumber = today.getMonth() + 1;
    let month;
    if (monthNumber < 10) {
        month = '0' + monthNumber;
    }
    let hours = today.getHours();
    let minutes = today.getMinutes();
    if (minutes < 30) {
        minutes = '30';
    }
    else if (minutes >= 30) {
        minutes = '00';
        hours++;
    }
    const date = today.getFullYear() + '-' + month + '-' + today.getDate();
    const date_future = today.getFullYear() + 1 + '-' + month + '-' + today.getDate();
    const time = hours + ":" + minutes;
    const dateTime = date + 'T' + time;
    const dateTime_future = date_future + 'T' + time;

    return (
        <Page name="date-time">
            <div className="date_time_container">
                <h2 className="date_time_title">
                    When would you like
                    <br /> to come?
                </h2>
                <Input
                    label="Default setup"
                    type="datepicker"
                    placeholder="Your birth date"
                    readonly
                    calendarParams={{
                        timePicker: true, minDate: Date(dateTime), 
                        disabled: function (date) {
                            console.log(date.getMinutes());
                            if (date.getMonth() === 1) {
                                return false;
                            }
                            else {
                                return true;
                            }
                        }
                    }}
                />

                <FooterButtons
                    primaryButtonName="Back"
                    primaryButtonPath="/food/"
                    secondaryButtonName="Next"
                    secondaryButtonPath="/table/"
                />
            </div>
        </Page>
    );
};

export default DateTimePage;
