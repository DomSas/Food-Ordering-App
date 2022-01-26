import React, { useState, useContext, useEffect } from "react";
import { f7, Page } from "framework7-react";
import StripeCheckout from "react-stripe-checkout";
import "../css/PaymentPage.css";
import { AppContext } from "../js/AppContext";
import NavbarBack from "../components/NavbarBack";
import { CreditcardFill, WalletFill } from "framework7-icons/react";

const PaymentPage = () => {
  const [cartItems, setCartItems, totalAmount, date_time, setDateTime] =
    useContext(AppContext);
  const [selectedPayment, setSelectedPayment] = useState("");

  const showOrderedItems = Object.values(cartItems)
    .flatMap((item) => item)
    .filter((item) => !!item.amount);

  const secretKey = "";
  const publicKey =
    "pk_test_51KKp2ELu2ivq6gwie31icN77AAYhId9s1eC3DtwxJHYQ0LObDPGHNmD62SqYyl7VY7uCYdkFWiT2Y83jJGpvmkMk00Nnz5rDXv";
  let orderNumber = Math.floor(Math.random() * 10001);

  // const stripePromise = loadStripe(
  //   "pk_test_51KKp2ELu2ivq6gwie31icN77AAYhId9s1eC3DtwxJHYQ0LObDPGHNmD62SqYyl7VY7uCYdkFWiT2Y83jJGpvmkMk00Nnz5rDXv"
  // );

  const submitOrderToDB = () => {
    // Send data to DB
    console.log("Sending data to DB. Order number: " + orderNumber);
  };

  const handleTokenWithBackend = async (token) => {
    let order = { orderNumber: orderNumber, price: totalAmount };

    f7.dialog.preloader("Processing your payment");
    const response = await fetch(
      "https://restaurant-management-backend.herokuapp.com/checkout",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token, order: order }),
      }
    ).then((response) => {
      f7.dialog.close();
      return response.json();
    });

    if (response.status === "success") {
      submitOrderToDB();
      f7.dialog.alert("Click OK to continue!", "Payment sucessfull", () => {
        window.location.pathname = "/summary";
      });
    } else {
      f7.dialog.alert("Try it again!", "Payment unsucessfull");
    }
  };

  // In case we will not use backend
  const handleTokenWithoutBackend = async (token) => {
    let responseClone;

    const customer = await fetch("https://api.stripe.com/v1/customers", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + secretKey,
        "Content-Type": "application/json",
      },
      body: `source=${token.id}`,
    })
      .then((response) => {
        return response.json();
      })
      .then(
        async (data) => {
          const charges = await fetch("https://api.stripe.com/v1/charges", {
            body: `amount=20000&currency=usd&customer=${data.id}&description=My First Test Charge (created for API docs)`,
            headers: {
              Authorization: "Bearer " + secretKey,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
          }).then((response) => {
            responseClone = response.clone();
            return response.json();
          });
        },
        (rejectionReason) => {
          console.log(
            "Error parsing JSON from response:",
            rejectionReason,
            responseClone
          );
          responseClone.text().then((bodyText) => {
            console.log(
              "Received the following instead of valid JSON:",
              bodyText
            );
          });
        }
      );
  };

  return (
    <>
      <Page name="payment">
        <NavbarBack />
        <div className="payment_container">
          <h2 className="payment_title">Ordered items</h2>
          <div className="order_table">
            <div className="data-table card">
              <table>
                <thead>
                  <tr>
                    <th className="label-cell">Ordered Items</th>
                    <th className="numeric-cell">Amount</th>
                    <th className="numeric-cell">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {showOrderedItems.map((item) => {
                    return (
                      <tr key={item.name}>
                        <td className="label-cell">{item.name}</td>
                        <td className="numeric-cell">{item.amount}</td>
                        <td className="numeric-cell">{item.price} ¥</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="price">
            <h2 className="total_text">Total: </h2>
            <h2 className="total_amount"> {totalAmount} ¥</h2>
          </div>

          <div className="payment_option_container">
            <p className="payment_info_paragraph">
              Please choose your preffered way of payment.
            </p>
            <div
              className={
                "payment_option" +
                (selectedPayment === "card" ? " selected" : "")
              }
              onClick={() => setSelectedPayment("card")}
            >
              <p>Pay with Card</p>
              <CreditcardFill
                style={{ fontSize: "28px", padding: "12px 14px 0 0" }}
              />
            </div>
            <div
              className={
                "payment_option" +
                (selectedPayment === "cash" ? " selected" : "")
              }
              onClick={() => setSelectedPayment("cash")}
            >
              <p>Pay with Cash</p>
              <WalletFill
                style={{ fontSize: "28px", padding: "12px 14px 0 0" }}
              />
            </div>
          </div>

          <div className="bottom_buttons">
            <StripeCheckout
              label={"Pay " + totalAmount + " ¥"}
              disabled={!selectedPayment}
              stripeKey={publicKey}
              token={handleTokenWithBackend}
              amount={totalAmount}
              name="PabDom Order"
              currency="JPY"
            />
            <a
              href="/food"
              className="col button button-raised button-round button-outline"
              id="menuButton"
            >
              Back to Menu
            </a>
          </div>
        </div>
      </Page>
    </>
  );
};
export default PaymentPage;
