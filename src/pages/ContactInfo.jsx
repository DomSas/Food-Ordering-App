import "../css/ContactInfo.css";
import React from "react";
import { Icon, List, ListInput, Page } from "framework7-react";
import "framework7-icons";

import FooterButtons from "../components/FooterButtons";
const ContactInfo = () => {
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
              clearButton
            />
            <ListInput
              type="email"
              placeholder="E-mail"
              required
              validate
              clearButton
            />
            <ListInput
              tyle="number"
              placeholder="Phone Number"
              required
              validate
              pattern="[0-9]*"
              clearButton
            />
          </List>

          <div className="location_container">
            <h2 className="contact_title">
              Share a location
              <br />
            </h2>
            {/*  Default back icon */}
            <Icon icon="icon-back"></Icon>
            {/*  Some custom icon */}
            <Icon icon="icon-home"></Icon>
            {/*  F7 Icons font icon */}
            <Icon f7="house"></Icon>

            <p>This location will be used as delivery address.</p>
          </div>
          <FooterButtons
            primaryButtonName="Back"
            primaryButtonPath="/food/"
            secondaryButtonName="Next"
            secondaryButtonPath="/about-us/"
          />
        </div>
      </Page>
    </>
  );
};

export default ContactInfo;
