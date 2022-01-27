import React, { useState, useEffect } from "react";
// import "./Forms.css";
import "../../../../static/css/reactCSS/forms/Forms.css";
import {
  editCategory,
  deleteCategory,
  createCategory,
} from "../../actions/menus";

import { useFormik } from "formik";
import * as Yup from "yup";

export default function CategoryForm(props) {
  const [type, setType] = useState(props.type);
  const [editType, setEditType] = useState(type === "edit" ? true : false);
  const [createType, setCreateType] = useState(
    type === "create" ? true : false
  );

  const [categoryTitle, setCategoryTitle] = useState(
    editType ? props.title : ""
  );

  function editCategorySubmit() {
    editCategory(props.category.id, formik.values, props.category.menu);
    props.changeEditState();
    let a = setTimeout(() => {
      props.getFetchedCategories(props.category.menu);
    }, 500);
  }
  function createCategorySubmit(values) {
    console.log(values);
    if (values.categoryTitle !== "") {
      createCategory(props.menu_id, formik.values);
      props.changeAddCategoryState();
      let a = setTimeout(() => {
        props.getFetchedCategories(props.menu_id);
      }, 500);
    }
  }

  const formik = useFormik({
    initialValues: {
      categoryTitle: editType ? props.category.title : "",
      type: editType ? "edit" : "create",
    },
    validationSchema: Yup.object({
      categoryTitle: Yup.string().max(30, "Не больше 30 символов"),
    }),
    onSubmit: (values) => {
      if (values.type === "edit") {
        editCategorySubmit(values);
      } else if (values.type === "create") {
        createCategorySubmit(values);
      }
    },
  });

  return (
    <form
      className={
        createType
          ? "form category-form category-form-create"
          : "form category-form"
      }
    >
      <input
        id="new-category-title-input"
        type="text"
        name="categoryTitle"
        placeholder="Название категории"
        onChange={formik.handleChange}
        value={formik.values.categoryTitle}
      />
      {formik.errors.categoryTitle && formik.touched.categoryTitle && (
        <p className="input-feedback-error">{formik.errors.categoryTitle}</p>
      )}
      <div className="form-btns-container">
        <button
          type="submit"
          className="form-btn form-submit-btn"
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          {editType ? "Изменить" : "Добавить"}
        </button>
        <button
          className="form-btn form-cancel-btn"
          onClick={(e) => {
            // e.preventDefault();
            editType ? props.changeEditState() : props.changeAddCategoryState();
          }}
        >
          Отменить
        </button>
        {editType ? (
          <button
            className="form-btn form-delete-btn"
            onClick={(e) => {
              // e.preventDefault();
              deleteCategory(props.category.id);
              props.changeEditState();
              let a = setTimeout(() => {
                props.getFetchedCategories(props.category.menu);
              }, 200);
            }}
          >
            Удалить
          </button>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}
