import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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

  const formik = useFormik({
    initialValues: {
      dishTitle: editType ? props.dish.title : "",
      dishDescription: editType ? props.dish.description : "",
      dishPrice: editType ? props.dish.price : "",
      type: editType ? "edit" : "create",
    },
    validationSchema: Yup.object({
      dishTitle: Yup.string()
        .max(50, t("chars_amount_restriction", { maxCharsAmount: 50 }))
        .required(t("required_field")),
      dishDescription: Yup.string().max(
        200,
        t("chars_amount_restriction", { maxCharsAmount: 200 })
      ),
      dishPrice: Yup.number(t("just_numbers")).required(t("required_field")),
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
            placeholder={t("dish_title_placeholder")}
            onChange={formik.handleChange}
            value={formik.values.dishTitle}
          />
          {formik.errors.dishTitle && formik.touched.dishTitle && (
            <p className="input-feedback-error">{formik.errors.dishTitle}</p>
          )}
          <input
            name="dishPrice"
            type="number"
            placeholder={t("dish_price_placeholder")}
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
            placeholder={t("dish_description_placeholder")}
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
            {editType ? t("form_edit") : t("form_add")}
          </button>
          <button
            className="form-btn form-cancel-btn"
            onClick={() => {
              if (editType) props.changeEditState();
              else props.changeCreateState();
            }}
          >
            {t("form_cancel")}
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
              {t("form_delete")}
            </button>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
}
