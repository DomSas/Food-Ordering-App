import "../css/FoodPage.css";
import React, { useRef } from "react";
import {
  Page,
  BlockTitle,
  List,
  AccordionContent,
  ListItem,
  Icon,
} from "framework7-react";

const FoodPage = () => {
  const addItemToCart = (foodItem) => {
    //TODO: State logic
    console.log("Added item to cart: " + JSON.stringify(foodItem.name));
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

          <BlockTitle>Starters</BlockTitle>
          <List accordionList inset>
            <ListItem accordionItem title="Starters">
              <AccordionContent>
                <List>
                  {startersArray.map((foodItem) => (
                    <ListItem
                      key={foodItem.id}
                      className="food"
                      title={foodItem.name}
                      onClick={() => addItemToCart(foodItem)}
                    >
                      <p
                        onClick={(e) => {
                          //TODO: Solve this propagation
                          e.stopPropagation();
                          console.log(
                            "Deleted item from cart: " +
                              JSON.stringify(foodItem.name)
                          );
                        }}
                      >
                        DELETE
                      </p>
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
