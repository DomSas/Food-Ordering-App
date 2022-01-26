import "../css/FoodPage.css";
import React, { useContext } from "react";
import {
  Page,
  BlockTitle,
  List,
  AccordionContent,
  ListItem,
  Stepper,
} from "framework7-react";
import { AppContext } from "../js/AppContext";
import FooterButtons from "../components/FooterButtons";

const FoodPage = () => {
  const [cartItems, setCartItems, totalAmount, date_time, setDateTime] =
    useContext(AppContext);

  const addItemToCart = (foodItem, key) => {
    const newCartItems = cartItems[key].map((item) => {
      if (item.name == foodItem.name) {
        item.amount++;
      }
      return item;
    });
    setCartItems({ ...cartItems, ...{ [key]: newCartItems } });
  };

  const removeItemFromCart = (foodItem, key) => {
    const newCartItems = cartItems[key].map((item) => {
      if (item.name == foodItem.name) {
        item.amount = item.amount ? item.amount - 1 : 0;
      }
      return item;
    });
    setCartItems({ ...cartItems, ...{ [key]: newCartItems } });
  };

  return (
    <>
      <Page name="food">
        <div className="food_container">
          <h2 className="food_title">
            What would you like
            <br /> to eat?
          </h2>
          <BlockTitle style={{ textAlign: "center" }}>TODAY'S MENU</BlockTitle>
          {Object.entries(cartItems).map(([key, value]) => {
            return (
              <List key={key} accordionList inset>
                <ListItem accordionItem title={key}>
                  <AccordionContent>
                    <List>
                      {value.map((foodItem) => (
                        <ListItem key={foodItem.name} title={foodItem.name}>
                          <Stepper
                            style={{
                              position: "absolute",
                              right: 100,
                            }}
                            raised
                            small
                            round
                            buttonsOnly={true}
                            onStepperMinusClick={() =>
                              removeItemFromCart(foodItem, key)
                            }
                            onStepperPlusClick={() =>
                              addItemToCart(foodItem, key)
                            }
                          />
                          {!foodItem.amount ? "" : foodItem.amount + "x "}
                          {foodItem.price} ¥
                        </ListItem>
                      ))}
                    </List>
                  </AccordionContent>
                </ListItem>
              </List>
            );
          })}
          <div className="price">
            <h2 className="food_pay">Total: </h2>
            <h2 className="totalAmount"> {totalAmount} ¥</h2>
          </div>
          <FooterButtons
            leftButton={{
              label: "Eat-In",
              href: "/date-time/",
              id: "primaryButton",
            }}
            rightButton={{
              label: "Delivery",
              href: "/delivery/",
              id: "secondaryButton",
            }}
          />
        </div>
      </Page>
    </>
  );
};

export default FoodPage;
