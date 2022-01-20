import "../css/ContactInfo.css";
import React, { useState } from "react";
import { Icon, List, ListInput, Page } from "framework7-react";
import "framework7-icons";

import FooterButtons from "../components/FooterButtons";
const ContactInfo = () => {
  const [customerName, setCustomerName] = useState();
  const [customerEmail, setCustomerEmail] = useState();
  const [customerPhone, setCustomerPhone] = useState();

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
            <div
              className="location_btn"
              onClick={() =>
                console.log(customerName, customerEmail, customerPhone)
              }
            >
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
