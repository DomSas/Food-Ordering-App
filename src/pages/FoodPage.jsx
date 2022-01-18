import "../css/FoodPage.css";
import React, { useState, useContext, useEffect } from "react";
import {
  Page,
  BlockTitle,
  List,
  AccordionContent,
  ListItem,
  Icon,
  Stepper,
} from "framework7-react";
import { CartContext } from "../js/CartContext";

const FoodPage = () => {
  const [cartItems, setCartItems, totalAmount] = useContext(CartContext);

  const addItemToCart = (foodItem) => {
    const newCartItems = cartItems.map((item) => {
      if (item.name == foodItem.name) {
        item.amount++;
      }
      return item;
    });
    setCartItems(newCartItems);

    console.log("Added item to cart: " + JSON.stringify(foodItem.name));
  };

  const removeItemFromCart = (foodItem) => {
    const newCartItems = cartItems.map((item) => {
      if (item.name == foodItem.name) {
        if (item.amount > 0) {
          item.amount--;
        } else return item;
      }
      return item;
    });
    setCartItems(newCartItems);
    // //   TODO: Add filter logic
    // console.log("cartItems");
    // console.log(cartItems);
    // let indexOfItemToDelete = cartItems.findIndex(
    //   (item) => item.name == foodItem.name
    // );

    // console.log("cartItems.splice(indexOfItemToDelete, 1)");
    // console.log(cartItems.splice(indexOfItemToDelete, 1));

    // // setCartItems(cartItems.splice(indexOfItemToDelete, 1));

    console.log("Removed item from cart: " + JSON.stringify(foodItem.name));
  };

  return (
    <>
      <Page name="food">
        <div className="container">
          <h2>
            What would you like
            <br /> to eat?
          </h2>

          <BlockTitle>TODAY'S MENU</BlockTitle>
          <List accordionList inset>
            <ListItem accordionItem title="Starters">
              <AccordionContent>
                <List>
                  {cartItems.map((foodItem) => (
                    <ListItem key={foodItem.name} title={foodItem.name}>
                      <Stepper
                        raised
                        small
                        round
                        buttonsOnly={true}
                        onStepperMinusClick={() => removeItemFromCart(foodItem)}
                        onStepperPlusClick={() => addItemToCart(foodItem)}
                      />
                      {foodItem.price}
                    </ListItem>
                  ))}
                </List>
              </AccordionContent>
            </ListItem>
          </List>
          <List accordionList inset>
            <ListItem accordionItem title="Main Dish">
              <AccordionContent>
                <List>
                  {cartItems.map((foodItem) => (
                    <ListItem key={foodItem.name} title={foodItem.name}>
                      <Stepper
                        raised
                        small
                        round
                        buttonsOnly={true}
                        onStepperMinusClick={() => removeItemFromCart(foodItem)}
                        onStepperPlusClick={() => addItemToCart(foodItem)}
                      />
                      {foodItem.price}
                    </ListItem>
                  ))}
                </List>
              </AccordionContent>
            </ListItem>
          </List>
          <List accordionList inset>
            <ListItem accordionItem title="Desserts">
              <AccordionContent>
                <List>
                  {cartItems.map((foodItem) => (
                    <ListItem key={foodItem.name} title={foodItem.name}>
                      <Stepper
                        raised
                        small
                        round
                        buttonsOnly={true}
                        onStepperMinusClick={() => removeItemFromCart(foodItem)}
                        onStepperPlusClick={() => addItemToCart(foodItem)}
                      />
                      {foodItem.price}
                    </ListItem>
                  ))}
                </List>
              </AccordionContent>
            </ListItem>
          </List>
          <List accordionList inset>
            <ListItem accordionItem title="Beverages">
              <AccordionContent>
                <List>
                  {cartItems.map((foodItem) => (
                    <ListItem key={foodItem.name} title={foodItem.name}>
                      <Stepper
                        raised
                        small
                        round
                        buttonsOnly={true}
                        onStepperMinusClick={() => removeItemFromCart(foodItem)}
                        onStepperPlusClick={() => addItemToCart(foodItem)}
                      />
                      {foodItem.price}
                    </ListItem>
                  ))}
                </List>
              </AccordionContent>
            </ListItem>
          </List>

          <h2>To pay: {totalAmount}</h2>
        </div>
      </Page>
    </>
  );
};

export default FoodPage;
