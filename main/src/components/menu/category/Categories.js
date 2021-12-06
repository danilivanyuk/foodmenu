import React, { useEffect, useState } from "react";
import { getCategories } from "../../../actions/menus";
import Category from "./Category";
import "../../../../../static/css/reactCSS/menu/category/Categories.css";
import Select from "react-select";
export default function Categories({ menu_id }) {
  console.log();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const [selectOption, setSelectOption] = useState("Все");

  let options = [{ value: "Все", label: "Все" }];
  Object.entries(categories).map(([key, category]) => {
    let optionArr = { value: category.title, label: category.title };
    options.push(optionArr);
  });

  // ВЫбирается категория в select и фильтруется categories
  return (
    <section className="menu-section">
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div>
          <div className="category-select">
            <Select
              options={options}
              defaultValue={options[0]}
              onChange={(e) => {
                setSelectOption(e.value);
              }}
            />
          </div>

          {selectOption === "Все" ? (
            <div>
              {Object.entries(categories).map(([key, category]) => (
                <Category key={key} category={category} />
              ))}
            </div>
          ) : (
            <div>
              {Object.entries(categories)
                .filter(([key, category]) => category.title === selectOption)
                .map(([key, category]) => (
                  <Category key={key} category={category} />
                ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
