import React, { useState } from "react";
import Dishes from "../dish/Dishes";

export default function Category(props, key) {
  const { category, getFetchedCategories } = props;
  const [categoryTitle, setCategoryTitle] = useState(category.title);

  return (
    <div key={key} className="category">
      <div className="category-title">
        <p key={key}>{category.title}</p>
      </div>
      <Dishes category_id={category.id} />
    </div>
  );
}
