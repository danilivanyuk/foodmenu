import React, { useEffect, useState } from "react";
import { getCategories } from "../../../actions/menus";
import Category from "./Category";
import "../../../../../static/css/reactCSS/menu/category/Categories.css";

import CategoryForm from "../../forms/CategoryForm";
export default function Categories({ menu_id }) {
  console.log();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addCategoryState, setAddCategoryState] = useState(false);
  const maxCategories = 20;
  useEffect(() => {
    getFetchedCategories(menu_id);
  }, []);

  function getFetchedCategories(menu_id) {
    let fetchedCategories = getCategories(menu_id);
    fetchedCategories.then((data) => {
      setCategories(data);
      setLoading(false);
    });
  }

  function changeAddCategoryState() {
    if (addCategoryState) {
      setAddCategoryState(false);
    } else {
      setAddCategoryState(true);
    }
  }

  return (
    <section className="menu-section">
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div>
          {Object.entries(categories).map(([key, category]) => (
            <Category
              key={key}
              category={category}
              getFetchedCategories={getFetchedCategories}
            />
          ))}
          {categories.length < maxCategories ? (
            addCategoryState ? (
              <CategoryForm
                type={"create"}
                menu_id={menu_id}
                changeAddCategoryState={changeAddCategoryState}
                getFetchedCategories={getFetchedCategories}
              />
            ) : (
              <button
                className="get-form-btn get-category-form"
                style={{ margin: "15px 30px" }}
                onClick={() => {
                  changeAddCategoryState();
                }}
              >
                Добавить категорию
              </button>
            )
          ) : (
            <p>Можно добавить, не более 20 категорий</p>
          )}
        </div>
      )}
    </section>
  );
}
