import React, { useEffect, useState } from "react";
import { getDishes } from "../../../actions/menus";
import Dish from "./Dish";
import "../../../../../static/css/reactCSS/menu/dish/Dishes.css";

export default function Dishes({ category_id }) {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFetchedDishes(category_id);
  }, []);

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
        <p>Загрузка...</p>
      ) : (
        <div className="category-dishes">
          {Object.entries(dishes).map(([key, dish]) => (
            // <Category key={key} category={category} />
            <Dish dish={dish} key={key} getFetchedDishes={getFetchedDishes} />
          ))}
        </div>
      )}
    </section>
  );
}
