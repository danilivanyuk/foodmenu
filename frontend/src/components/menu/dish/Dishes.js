import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getDishes } from "../../../actions/menus";
import Dish from "./Dish";
import DishForm from "../../forms/DishForm";
import "../../../../../static/css/reactCSS/menu/dish/Dishes.css";

export default function Dishes({ category_id }) {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createState, setCreateState] = useState(false);
  const maxAmount = 25;
  function changeCreateState() {
    if (createState) {
      setCreateState(false);
    } else {
      setCreateState(true);
    }
  }
  useEffect(() => {
    getFetchedDishes(category_id);
  }, []);
  const { t } = useTranslation();
  function getFetchedDishes(category_id) {
    let fetchedDishes = getDishes(category_id);
    fetchedDishes.then((data) => {
      setDishes(data);
      setLoading(false);
    });
  }
  return (
    <section className="category-dishes-section">
      {loading ? (
        <p>{t("loading")}</p>
      ) : (
        <div className="category-dishes">
          {Object.entries(dishes).map(([key, dish]) => (
            // <Category key={key} category={category} />
            <Dish dish={dish} key={key} getFetchedDishes={getFetchedDishes} />
          ))}
          {dishes.length < maxAmount ? (
            createState ? (
              <div className="category-dish">
                <DishForm
                  type={"create"}
                  category_id={category_id}
                  getFetchedDishes={getFetchedDishes}
                  changeCreateState={changeCreateState}
                />
              </div>
            ) : (
              <div className="category-dish">
                <button
                  className="get-form-btn"
                  onClick={() => {
                    changeCreateState();
                  }}
                >
                  {t("add_dish")}
                </button>
              </div>
            )
          ) : (
            <div className="category-dish">
              <p>{t("amount_restriction", { maxAmount })}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
