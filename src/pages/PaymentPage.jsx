import React, { useState, useContext } from "react";
import { f7, Page } from "framework7-react";
import StripeCheckout from "react-stripe-checkout";
import { AppContext } from "../js/AppContext";

const PaymentPage = () => {
  const [cartItems, setCartItems, totalAmount, date_time, setDateTime] = useContext(AppContext);

  const showOrderedItems = Object.values(cartItems)
    .flatMap((item) => item)
    .filter((item) => !!item.amount);

  const secretKey = "";
  const publicKey =
    "pk_test_51KKp2ELu2ivq6gwie31icN77AAYhId9s1eC3DtwxJHYQ0LObDPGHNmD62SqYyl7VY7uCYdkFWiT2Y83jJGpvmkMk00Nnz5rDXv";

  // const stripePromise = loadStripe(
  //   "pk_test_51KKp2ELu2ivq6gwie31icN77AAYhId9s1eC3DtwxJHYQ0LObDPGHNmD62SqYyl7VY7uCYdkFWiT2Y83jJGpvmkMk00Nnz5rDXv"
  // );

  const handleTokenWithBackend = async (token) => {
    let orderNumber = Math.floor(Math.random() * 10001);
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
      // Database create order

      f7.dialog.alert("Click OK to continue!", "Payment sucessfull", () => {
        window.location.pathname = "/about-us";
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
        <h2 className="food_title">Ordered items</h2>
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

        <div className="price">
          <h2 className="food_pay">Total: </h2>
          <h2 className="totalAmount"> {totalAmount} ¥</h2>
        </div>

        <StripeCheckout
          stripeKey={publicKey}
          token={handleTokenWithBackend}
          amount={totalAmount}
          name="PabDom Order"
          currency="JPY"
          disabled={totalAmount == 0}
        />
      </Page>
    </>
  );
};
export default PaymentPage;
