import React, { useEffect, useState } from "react";
import { editDish, createDish, deleteDish } from "../../actions/menus";
import "../../../../static/css/reactCSS/forms/Forms.css";

import { useFormik } from "formik";
import * as Yup from "yup";

export default function DishForm(props) {
  // const [type, setType] = useState(props.type);
  const [editType, setEditType] = useState(
    props.type === "edit" ? true : false
  );
  const [createType, setCreateType] = useState(
    props.type === "create" ? true : false
  );

  function submitDishEdit() {
    editDish(props.dish.id, props.dish.category, formik.values);
    let a = setTimeout(() => {
      props.getFetchedDishes(props.dish.category);
    }, 500);
    props.changeEditState();
  }
  function submitDishCreate() {
    console.log(formik.values);
    createDish(props.category_id, formik.values);
    props.changeCreateState();
    let a = setTimeout(() => {
      props.getFetchedDishes(props.category_id);
    }, 500);
  }
  const requiredField = "Обязательное поле";

  const formik = useFormik({
    initialValues: {
      dishTitle: editType ? props.dish.title : "",
      dishDescription: editType ? props.dish.description : "",
      dishPrice: editType ? props.dish.price : "",
      type: editType ? "edit" : "create",
    },
    validationSchema: Yup.object({
      dishTitle: Yup.string()
        .max(50, "Не больше 50 символов")
        .required(requiredField),
      dishDescription: Yup.string().max(200, "Не больше 200 символов"),
      dishPrice: Yup.number("Число").required(requiredField),
    }),
    onSubmit: (values) => {
      if (values.type === "edit") {
        submitDishEdit();
      } else if (values.type === "create") {
        submitDishCreate();
      }
    },
  });

  return (
    <div className="form dish-form">
      <form className="category-dish-info">
        <div className="dish-info-handler">
          <input
            name="dishTitle"
            type="text"
            placeholder="Название"
            onChange={formik.handleChange}
            value={formik.values.dishTitle}
          />
          {formik.errors.dishTitle && formik.touched.dishTitle && (
            <p className="input-feedback-error">{formik.errors.dishTitle}</p>
          )}
          <input
            name="dishPrice"
            type="number"
            placeholder="Цена"
            onChange={formik.handleChange}
            value={formik.values.dishPrice}
          />
          {formik.errors.dishPrice && formik.touched.dishPrice && (
            <p className="input-feedback-error">{formik.errors.dishPrice}</p>
          )}
        </div>
        <div>
          <textarea
            name="dishDescription"
            className="new-dish-description-input"
            type="text"
            placeholder="Описание"
            onChange={formik.handleChange}
            value={formik.values.dishDescription}
          />
          {formik.errors.dishDescription && formik.touched.dishDescription && (
            <p className="input-feedback-error">
              {formik.errors.dishDescription}
            </p>
          )}
        </div>
        <div className="form-btns-container">
          <button
            type="submit"
            className="form-btn form-submit-btn"
            onClick={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            {editType ? "Изменить" : "Создать"}
          </button>
          <button
            className="form-btn form-cancel-btn"
            onClick={() => {
              if (editType) props.changeEditState();
              else props.changeCreateState();
            }}
          >
            Отменить
          </button>
          {editType ? (
            <button
              className="form-btn form-delete-btn"
              onClick={() => {
                deleteDish(props.dish.id);
                let a = setTimeout(() => {
                  props.getFetchedDishes(props.dish.category);
                }, 500);

                props.changeEditState();
              }}
            >
              Удалить
            </button>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
}
