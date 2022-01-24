import React, { useState, useContext } from "react";
import { Page } from "framework7-react";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
  CardElement,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "react-stripe-checkout";
import { CartContext } from "../js/CartContext";

const PaymentPage = () => {
  const [cartItems, setCartItems, totalAmount] = useContext(CartContext);

  const showOrderedItems = Object.values(cartItems)
    .flatMap((item) => item)
    .filter((item) => !!item.amount);

  const stripePromise = loadStripe(
    "pk_test_51KKp2ELu2ivq6gwie31icN77AAYhId9s1eC3DtwxJHYQ0LObDPGHNmD62SqYyl7VY7uCYdkFWiT2Y83jJGpvmkMk00Nnz5rDXv"
  );

  const handleToken = async (token) => {
    let responseClone;

    const customer = await fetch("https://api.stripe.com/v1/customers", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer sk_test_51KKp2ELu2ivq6gwiwH5J3RoyojOpOqNkJHd0C03pGtOEWRawOWsBasgTZY0GgH54PH4yxzKbJZDXJn3oA5d6DrUN00OEMzypR3",
        "Content-Type": "application/json",
      },
      body: `source=${token.id}`,
    })
      .then(function (response) {
        return response.json();
      })
      .then(
        async function (data) {
          console.log(data);

          const charges = await fetch("https://api.stripe.com/v1/charges", {
            body: `amount=20000&currency=usd&customer=${data.id}&description=My First Test Charge (created for API docs)`,
            headers: {
              Authorization:
                "Bearer sk_test_51KKp2ELu2ivq6gwiwH5J3RoyojOpOqNkJHd0C03pGtOEWRawOWsBasgTZY0GgH54PH4yxzKbJZDXJn3oA5d6DrUN00OEMzypR3",
              "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
          }).then(function (response) {
            responseClone = response.clone(); // 2
            console.log(responseClone);
            return response.json();
          });
        },
        function (rejectionReason) {
          // 3
          console.log(
            "Error parsing JSON from response:",
            rejectionReason,
            responseClone
          ); // 4
          responseClone
            .text() // 5
            .then(function (bodyText) {
              console.log(
                "Received the following instead of valid JSON:",
                bodyText
              ); // 6
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
                  <tr>
                    <td className="label-cell">{item.name}</td>
                    <td className="numeric-cell">{item.amount}</td>
                    <td className="numeric-cell">{item.price} ¥</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h2>{totalAmount}</h2>
        <StripeCheckout
          stripeKey="pk_test_51KKp2ELu2ivq6gwie31icN77AAYhId9s1eC3DtwxJHYQ0LObDPGHNmD62SqYyl7VY7uCYdkFWiT2Y83jJGpvmkMk00Nnz5rDXv"
          token={handleToken}
          amount={10000}
          name="Tesla Roadster"
          style={{ background: "green" }}
        />
      </Page>
    </>
  );
};
export default PaymentPage;
