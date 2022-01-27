import "../css/DateTimePage.css";
import React, { useEffect, useState } from "react";
import { Input, List, ListInput, Page } from "framework7-react";
import FooterButtons from "../components/FooterButtons";
import { AppContext } from "../js/AppContext";
import { useContext } from "react";
import { checkDateTime } from "../js/db";
import NavbarBack from "../components/NavbarBack";

const DateTimePage = () => {
  const [cartItems, setCartItems, totalAmount, date_time, setDateTime] =
    useContext(AppContext);
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [validTime, setValidTime] = useState(false);

  let minutes = today.getMinutes();
  if (minutes < 30) {
    today.setMinutes = 30;
  } else if (minutes >= 30) {
    today.setMinutes = 0;
    today.setHours = today.getHours + 1;
  }

  useEffect(() => {
    if (selectedDate && selectedTime && validTime) {
      const dateSplit = selectedDate.split("/");
      const date = new Date(
        dateSplit[1] + "/" + dateSplit[0] + "/" + dateSplit[2]
      ).toDateString();
      setSelectedDate(date);
      if (checkDateTime(date, selectedTime)) {
        setDateTime({ date: date, time: selectedTime });
      }
    }
  }, [validTime]);

  return (
    <Page name="date-time">
      <NavbarBack />
      <div className="date_time_container">
        <h2 className="date_time_title">
          When would you like
          <br /> to come?
        </h2>
        <List inset>
          <ListInput
            className="input_datetime"
            label="Select your date"
            type="datepicker"
            placeholder="Select your date"
            id="dateInput"
            validate
            required
            calendarParams={{ minDate: today }}
            onInputNotEmpty={(e) => setSelectedDate(e.target.value)}
          />
          <ListInput
            className="input_datetime"
            label="Select your time"
            type="time"
            step="3600"
            id="timeInput"
            required
            min="11:00"
            max="22:30"
            placeholder="Select your time"
            validate
            onInputNotEmpty={(e) => setSelectedTime(e.target.value)}
            onValidate={(isValid) => setValidTime(isValid)}
          />
        </List>

        <FooterButtons
          leftButton={{
            label: "Back",
            href: "/food/",
            id: "secondaryButton",
            className: "back",
          }}
          rightButton={{
            label: "Next",
            id:
              selectedDate && selectedTime && validTime
                ? "primaryButton"
                : "disabledPrimaryButton",
            href: selectedDate && selectedTime && validTime ? "/table/" : "",
          }}
        />
      </div>
    </Page>
  );
};

export default DateTimePage;
