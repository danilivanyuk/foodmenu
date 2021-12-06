import React, { useState } from "react";
import DishForm from "../../forms/DishForm";
export default function Dish(props, key) {
  const { dish, getFetchedDishes } = props;
  const [editState, setEditState] = useState(false);
  function changeEditState() {
    if (editState) {
      setEditState(false);
    } else {
      setEditState(true);
    }
  }

  return (
    <div key={key} className="category-dish">
      {editState ? (
        <DishForm
          type={"edit"}
          dish={dish}
          changeEditState={changeEditState}
          getFetchedDishes={getFetchedDishes}
        />
      ) : (
        <div key={dish.id} className="category-dish-info">
          <div className="category-dish-info-upper">
            <p className="dish-title">
              {dish.title}{" "}
              <button
                // id={"button-dish-editform-" + dish.id}
                className="button-edit"
                onClick={(e) => {
                  changeEditState();
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.60946 13.8367C2.6048 13.7249 2.64717 13.6163 2.72627 13.5372L12.7279 3.53553C12.8841 3.37932 13.1374 3.37932 13.2936 3.53553L18.3848 8.6267C18.541 8.78291 18.541 9.03618 18.3848 9.19239L8.38313 19.194C8.30402 19.2731 8.19541 19.3155 8.08363 19.3109L3.19611 19.1072C2.98828 19.0985 2.82177 18.932 2.81311 18.7242L2.60946 13.8367Z"
                    fill="white"
                  />
                  <path
                    d="M14.5944 2.23447C14.4382 2.07826 14.4382 1.825 14.5944 1.66879L15.1956 1.06753C15.2552 1.00792 15.3322 0.968665 15.4154 0.955374L16.7687 0.739305C16.8953 0.719089 17.0239 0.760795 17.1146 0.851459L21.0685 4.80542C21.1592 4.89609 21.2009 5.02472 21.1807 5.15133L20.9646 6.50461C20.9513 6.58785 20.9121 6.66477 20.8525 6.72438L20.2512 7.32564C20.095 7.48185 19.8417 7.48185 19.6855 7.32564L14.5944 2.23447Z"
                    fill="white"
                  />
                </svg>
              </button>
            </p>
            <p className="dish-price">{dish.price} тг</p>
          </div>
          <div className="category-dish-info-down">
            <p className="dish-description">{dish.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
