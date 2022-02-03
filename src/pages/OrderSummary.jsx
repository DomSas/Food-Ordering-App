import React, { useContext } from "react";
import "../css/OrderSummary.css";
import { f7, Link, Page } from "framework7-react";
import { AppContext } from "../js/AppContext";
import { HouseFill } from "framework7-icons/react";
import createMenuDict from "../js/db";

const OrderSummary = () => {
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
    orderNumber,
  ] = useContext(AppContext);

  const showOrderedItems = Object.values(cartItems)
    .flatMap((item) => item)
    .filter((item) => !!item.amount);

  const clearContext = () => {
    setUserInfo({});
    setCartItems(createMenuDict());

    f7.views.current.router.navigate("/", {
      reloadAll: true,
      browserHistory: false,
      ignoreCache: true,
    });
  };

  return (
    <Page name="order-summary">
      <div className="order_summary_container">
        <h2 className="summary_title">Thank you for your order!</h2>
        <h3 className="order_number">Order n. {orderNumber}</h3>
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
        <h2 className="thanks">
          We are glad that you <br />
          chose Pab-Dom!
        </h2>

        <a
          className="aboutButton col button button-fill button-round"
          onClick={clearContext}
        >
          <HouseFill style={{ margin: "0 10px 2px 0", fontSize: "17px" }} />
          Back to Home
        </a>
      </div>
    </Page>
  );
};

export default OrderSummary;
