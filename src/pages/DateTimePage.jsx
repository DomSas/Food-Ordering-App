import "../css/DateTimePage.css";
import React, { useEffect, useState } from "react";
import { f7, List, ListInput, Page } from "framework7-react";
import FooterButtons from "../components/FooterButtons";
import { AppContext } from "../js/AppContext";
import { useContext } from "react";
import { checkDateTime } from "../js/db";
import NavbarBack from "../components/NavbarBack";

const DateTimePage = () => {
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
  ] = useContext(AppContext);

  //Variable definition
  let today = new Date();
  let minutes = today.getMinutes();

  //State variables definition
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [validTime, setValidTime] = useState(false);
  const [customerName, setCustomerName] = useState();
  const [customerEmail, setCustomerEmail] = useState();
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  //Round the time to o'clock function
  if (minutes < 30) {
    today.setMinutes = 30;
  } else if (minutes >= 30) {
    today.setMinutes = 0;
    today.setHours = today.getHours + 1;
  }

  //UseEffect for checking if the date and time are valid
  useEffect(() => {
    if (selectedDate && selectedTime && validTime) {
      const dateSplit = selectedDate.split("/");
      const date = new Date(
        dateSplit[1] + "/" + dateSplit[0] + "/" + dateSplit[2]
      ).toDateString();
      setSelectedDate(date);
      checkDateTime(date, selectedTime).then((result) => {
        if (result) {
          setDateTime({ date: date, time: selectedTime });
        } else {
          let toastCenter = f7.toast.create({
            text: "Sorry! There are not empty tables in selected date and time. Please choose another one.",
            closeTimeout: 3000,
          });
          toastCenter.open();
          setValidTime(false);
        }
      });
    }
  }, [validTime]);

  //UseEffect for sending the contact info to the context when the email changes
  useEffect(() => {
    if (nameValid && emailValid) {
      sendContactInfoToContext();
    }
  }, [emailValid]);

  //UseEffect for sending the contact info to the context when the name changes
  useEffect(() => {
    if (nameValid && emailValid) {
      sendContactInfoToContext();
    }
  }, [nameValid]);

  //Function for sending the contact info to the context
  const sendContactInfoToContext = () => {
    setUserInfo({
      name: customerName,
      email: customerEmail,
      phone: "",
      location: "",
    });
  };

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
            //value={ date_time ? new Date(date_time.date) : new Date() }
            //SET THE VALID IF DEFINED - NEEDS TO BE DONE
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
            value={date_time ? date_time.time : "11:00"}
            placeholder="Select your time"
            validate
            onInputNotEmpty={(e) => setSelectedTime(e.target.value)}
            onValidate={(isValid) => setValidTime(isValid)}
          />
        </List>
        <h2 className="contact_title">
          Please tell us your
          <br /> name and email
        </h2>
        <List inset>
          <ListInput
            type="text"
            placeholder="Name"
            required
            validate
            //value={userInfo ? userInfo.name : ""}
            //SET THE VALUE IF DEFINED - NEEDS TO BE DONE
            onChange={(e) => setCustomerName(e.target.value)}
            onValidate={(isValid) => setNameValid(isValid)}
          />
          <ListInput
            type="email"
            placeholder="E-mail"
            required
            validate
            //value={userInfo ? userInfo.email : ""}
            //SET THE VALUE IF DEFINED - NEEDS TO BE DONE
            onChange={(e) => setCustomerEmail(e.target.value)}
            onValidate={(isValid) => setEmailValid(isValid)}
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
              selectedDate &&
              selectedTime &&
              validTime &&
              nameValid &&
              emailValid
                ? "primaryButton"
                : "disabledPrimaryButton",
            href:
              selectedDate &&
              selectedTime &&
              validTime &&
              nameValid &&
              emailValid
                ? "/table/"
                : "",
          }}
        />
      </div>
    </Page>
  );
};

export default DateTimePage;
