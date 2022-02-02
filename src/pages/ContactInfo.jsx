import "../css/ContactInfo.css";
import React, { useState, useContext } from "react";
import { f7, List, ListInput, Page } from "framework7-react";
import { LocationFill } from "framework7-icons/react";
import FooterButtons from "../components/FooterButtons";
import NavbarBack from "../components/NavbarBack";
import { AppContext } from "../js/AppContext";

const ContactInfo = () => {
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
  const [customerName, setCustomerName] = useState(
    userInfo ? userInfo.name : ""
  );
  const [customerEmail, setCustomerEmail] = useState(
    userInfo ? userInfo.email : ""
  );
  const [customerPhone, setCustomerPhone] = useState(
    userInfo ? userInfo.phone : ""
  );
  const [customerCity, setCustomerCity] = useState(
    userInfo ? userInfo.location : ""
  );
  // Need all three separately to not overwrite validity
  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);

  const sendContactInfoToContext = () => {
    setUserInfo({
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      location: customerCity,
    });
  };

  const getGPSPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        f7.dialog.preloader("Acquiring GPS Location");

        getCityFromGPSCoord(
          String(position.coords.latitude),
          String(position.coords.longitude)
        );
      },
      (error) => {
        f7.dialog.alert("Try again please!", "Acquiring Location Failed");
      }
    );

    const getCityFromGPSCoord = async (latitude, longitude) => {
      // Conversion to use the correct URL
      longitude = longitude.charAt(0) === "-" ? longitude : "+" + longitude;
      await fetch(
        "http://geodb-free-service.wirefreethought.com/v1/geo/locations/" +
          latitude +
          longitude +
          "/nearbyCities?radius=100&minPopulation=40000&limit=1"
      )
        .then((res) => res.json())
        .then(
          (result) => {
            // Reset of customerCity in case the user clicks it second time
            setCustomerCity();
            f7.dialog.close();
            setCustomerCity(result.data[0].city);
            f7.dialog.alert(
              "Nearby city: " + result.data[0].city,
              "GPS Location Acquired"
            );
          },
          (error) => {
            f7.dialog.alert("Try again please!", "Acquiring Location Failed");
          }
        );
    };
  };

  return (
    <>
      <Page name="contact">
        <NavbarBack />
        <div className="contact_container">
          <h2 className="contact_title">
            Where should we
            <br /> deliver your order?
          </h2>
          <List inset>
            <ListInput
              type="text"
              placeholder="Name"
              required
              validate
              value={customerName || ""}
              onChange={(e) => setCustomerName(e.target.value)}
              onValidate={(isValid) => setNameValid(isValid)}
            />
            <ListInput
              type="email"
              placeholder="E-mail"
              required
              validate
              value={customerEmail || ""}
              onChange={(e) => setCustomerEmail(e.target.value)}
              onValidate={(isValid) => setEmailValid(isValid)}
            />
            <ListInput
              tyle="number"
              placeholder="Phone Number"
              required
              validate
              pattern="[0-9]*"
              value={customerPhone || ""}
              onChange={(e) => setCustomerPhone(e.target.value)}
              onValidate={(isValid) => setPhoneValid(isValid)}
            />
          </List>

          <div className="location_container">
            <h2 className="location_title">
              Share a location
              <br />
            </h2>
            <div className="location_btn" onClick={getGPSPosition}>
              <LocationFill style={{ fontSize: 38 }} />
            </div>

            <p className="location_info_paragraph">
              Click the arrow to share your current location. This location will
              be used as delivery address.
            </p>
          </div>

          <FooterButtons
            leftButton={{
              label: "Back",
              href: "/food/",
              id: "secondaryButton",
              className: "back",
            }}
            rightButton={{
              label: "Next",
              onClick: sendContactInfoToContext,
              id:
                customerName &&
                customerPhone &&
                customerEmail &&
                customerCity &&
                nameValid &&
                emailValid &&
                phoneValid
                  ? "primaryButton"
                  : "disabledPrimaryButton",

              href:
                customerName &&
                customerPhone &&
                customerEmail &&
                customerCity &&
                nameValid &&
                emailValid &&
                phoneValid
                  ? "/payment/"
                  : "",
            }}
          />
        </div>
      </Page>
    </>
  );
};

export default ContactInfo;
