import "../css/FoodPage.css";
import React, { useState, useContext } from "react";
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
  const [cartItems, setCartItems] = useContext(CartContext);

  const addItemToCart = (foodItem) => {
    //TODO: State logic
    setCartItems([...cartItems, foodItem]);

    console.log("Added item to cart: " + JSON.stringify(foodItem.name));

    console.log(cartItems);
  };

  const removeItemFromCart = (foodItem) => {
    console.log("Removed item from cart: " + JSON.stringify(foodItem.name));
  };

  const startersArray = [
    { id: 1, name: "pizza", price: "80" },
    { id: 2, name: "pasta", price: "30" },
  ];

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
                  {startersArray.map((foodItem) => (
                    <ListItem key={foodItem.name} title={foodItem.name}>
                      <Stepper
                        raised
                        small
                        round
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
                  {startersArray.map((foodItem) => (
                    <ListItem key={foodItem.name} title={foodItem.name}>
                      <Stepper
                        raised
                        small
                        round
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
                  {startersArray.map((foodItem) => (
                    <ListItem key={foodItem.name} title={foodItem.name}>
                      <Stepper
                        raised
                        small
                        round
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
                  {startersArray.map((foodItem) => (
                    <ListItem key={foodItem.name} title={foodItem.name}>
                      <Stepper
                        raised
                        small
                        round
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
        </div>
      </Page>
    </>
  );
};

export default FoodPage;
