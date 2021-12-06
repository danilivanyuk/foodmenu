import React, { useState, useContext } from "react";

const RememberDishContext = React.createContext();
const RememberDishesTitles = React.createContext();
const RememberDishUpdateContext = React.createContext();
const RememberDishDeleteContext = React.createContext();
const RememberDishesDeleteContext = React.createContext();

export function useRememberCart() {
  return useContext(RememberDishContext);
}
export function useRememberCartDishesTitles() {
  return useContext(RememberDishesTitles);
}
export function useRememberCartUpdate() {
  return useContext(RememberDishUpdateContext);
}
export function useRememberCartDeleteDish() {
  return useContext(RememberDishDeleteContext);
}
export function useRememberCartDeleteDishes() {
  return useContext(RememberDishesDeleteContext);
}

export default function RememberCartProvider({ children }) {
  const [dishes, setDishes] = useState([]);
  const [dishesTitle, setDishesTitle] = useState([]);
  // console.log("ASD", dishes);

  function updateDishes(title, description, price) {
    let newDish = { title: title, description: description, price: price };
    let addState = true;
    Object.entries(dishes).map((dish) => {
      if (dish[1].title === title) {
        addState = false;
      }
    });
    if (addState) {
      setDishes([...dishes, newDish]);
      setDishesTitle([...dishesTitle, newDish.title]);
    }
  }

  function deleteDish(title) {
    setDishes(dishes.filter((dish) => dish.title !== title));
    setDishesTitle(dishesTitle.filter((dishTitle) => dishTitle !== title));
  }

  function deleteDishes() {
    setDishes([]);
    setDishesTitle([]);
  }

  return (
    <RememberDishContext.Provider value={dishes}>
      <RememberDishesTitles.Provider value={dishesTitle}>
        <RememberDishUpdateContext.Provider value={updateDishes}>
          <RememberDishDeleteContext.Provider value={deleteDish}>
            <RememberDishesDeleteContext.Provider value={deleteDishes}>
              {children}
            </RememberDishesDeleteContext.Provider>
          </RememberDishDeleteContext.Provider>
        </RememberDishUpdateContext.Provider>
      </RememberDishesTitles.Provider>
    </RememberDishContext.Provider>
  );
}
