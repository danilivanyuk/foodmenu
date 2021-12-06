import React, { useState, useContext } from "react";
import {
  useRememberCart,
  useRememberCartUpdate,
  useRememberCartDeleteDish,
  useRememberCartDishesTitles,
} from "../../../actions/RememberContext";
export default function Dish(props, key) {
  const { dish, getFetchedDishes } = props;
  const updateRememberCart = useRememberCartUpdate();
  let dishesTitle = useRememberCartDishesTitles();
  let deleteDish = useRememberCartDeleteDish();
  const [firstClick, setFirstClick] = useState(true);
  // У каждого блюда кнопка добавить она отправляет Название блюда в компонент Cart
  return (
    <div key={key} className="category-dish">
      <div className="category-dish-info">
        <div className="category-dish-info-upper">
          <p className="dish-title">
            {dish.title}

            <button
              className="remember-dish-btn"
              onClick={() => {
                if (firstClick) {
                  updateRememberCart(dish.title, dish.description, dish.price);
                  setFirstClick(false);
                } else {
                  setFirstClick(true);
                  deleteDish(dish.title);
                }
              }}
            >
              <svg
                width="20"
                height="15"
                viewBox="0 0 40 35"
                fill={dishesTitle.includes(dish.title) ? "white" : "none"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 1L24.4903 13.4377H39.0211L27.2654 21.1246L31.7557 33.5623L20 25.8754L8.2443 33.5623L12.7346 21.1246L0.97887 13.4377H15.5097L20 1Z"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinejoin="round"
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
    </div>
  );
}
