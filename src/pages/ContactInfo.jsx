import "../css/ContactInfo.css";
import React, { useState } from "react";
import { Icon, f7, List, ListInput, Page } from "framework7-react";
import "framework7-icons";

import FooterButtons from "../components/FooterButtons";
const ContactInfo = () => {
  const [customerName, setCustomerName] = useState();
  const [customerEmail, setCustomerEmail] = useState();
  const [customerPhone, setCustomerPhone] = useState();
  const [customerCity, setCustomerCity] = useState();

  const getGPSPosition = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        getCityFromGPSCoord(
          String(position.coords.latitude),
          String(position.coords.longitude)
        );

        // Waiting so the API call finishes before alert - IMPROVE
        const wait = (timeToDelay) =>
          new Promise((resolve) => setTimeout(resolve, timeToDelay));
        await wait(1000);

        f7.dialog.alert(
          "Nearby city: " + customerCity,
          "GPS Location Acquired"
        );
      },
      (error) => {
        f7.dialog.alert("Try again please!", "Acquiring Location Failed");
        console.log(error);
      }
    );

    const getCityFromGPSCoord = (latitude, longitude) => {
      // Conversion to use the correct URL
      longitude = longitude.charAt(0) === "-" ? longitude : "+" + longitude;
      fetch(
        "http://geodb-free-service.wirefreethought.com/v1/geo/locations/" +
          latitude +
          longitude +
          "/nearbyCities?radius=100&minPopulation=40000&limit=1"
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setCustomerCity(result.data[0].city);
          },
          (error) => {
            f7.dialog.alert("Try again please!", "Acquiring Location Failed");
            console.log(error);
          }
        );
    };
  };

  return (
    <>
      <Page name="contact">
        <div className="contact_container">
          <h2 className="contact_title">
            Where should we
            <br /> deliver your order?
          </h2>
          <List inset>
            <ListInput
              type="text"
              placeholder="Name"
              requiredvalidate
              required
              validate
              value={customerName || ""}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <ListInput
              type="email"
              placeholder="E-mail"
              required
              validate
              value={customerEmail || ""}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
            <ListInput
              tyle="number"
              placeholder="Phone Number"
              required
              validate
              pattern="[0-9]*"
              value={customerPhone || ""}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </List>

          <div className="location_container">
            <h2 className="location_title">
              Share a location
              <br />
            </h2>
            {/*  Default back icon */}
            <div className="location_btn" onClick={getGPSPosition}>
              <Icon icon="icon-back"></Icon>
            </div>
            {/*  Some custom icon */}
            <Icon icon="icon-home"></Icon>

            <p className="location_paragraph">
              Click the arrow to share your current location. This location will
              be used as delivery address.
            </p>
          </div>

          <FooterButtons
            leftButtonName="Back"
            leftButtonPath="/food/"
            leftButtonId="secondaryButton"
            rightButtonName="Next"
            rightButtonPath="/delivery/"
            rightButtonId="primaryButton"
          />
        </div>
      </Page>
    </>
  );
};

export default ContactInfo;
