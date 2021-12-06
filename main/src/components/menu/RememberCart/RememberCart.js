import React, { useEffect, useState } from "react";
import "../../../../../static/css/reactCSS/menu/rememberCard/RememberCart.css";

import {
  useRememberCart,
  useRememberCartDeleteDish,
  useRememberCartDeleteDishes,
} from "../../../actions/RememberContext";
export default function RememberCart() {
  const [state, setState] = useState(false);
  function changeState() {
    setState(state ? false : true);
  }
  let dishes = useRememberCart();
  let deleteDish = useRememberCartDeleteDish();
  let deleteDishes = useRememberCartDeleteDishes();
  return (
    <div className="remember-cart-container">
      {state ? (
        <div className="remember-cart">
          <div className="remember-cart-header">
            <p>Вы выбрали</p>
            <a
              className="close-remember-cart"
              onClick={() => {
                changeState();
              }}
            ></a>
          </div>
          <div className="remember-cart-objects">
            {dishes.length > 0 ? (
              <button
                className="delete-dishes-btn"
                onClick={() => {
                  deleteDishes();
                  changeState();
                }}
              >
                Удалить все
              </button>
            ) : (
              ""
            )}

            {Object.entries(dishes).map(([key, dish]) => (
              <div key={key} className="remember-cart-object">
                <div className="object-info">
                  <p>{dish.title}</p>
                  <p>{dish.description}</p>
                  <p className="remember-cart-object-price">{dish.price} тг</p>
                </div>
                <div className="delete-remembered-dish">
                  <a
                    className="close-remember-cart delete-dish"
                    onClick={(e) => {
                      console.log("RememberCart", key);
                      deleteDish(dish.title);
                    }}
                  ></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="remember-cart-icon">
          <button
            onClick={() => {
              changeState();
            }}
          >
            Записано {dishes.length}
          </button>
        </div>
      )}
    </div>
  );
}
