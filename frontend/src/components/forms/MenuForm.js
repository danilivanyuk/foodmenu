import React, { useState } from "react";
import { useFormik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import { createMenu, editMenu, deleteMenu } from "../../actions/menus";
import "../../../../static/css/reactCSS/forms/Forms.css";

export default function MenuForm(props) {
  const [editType, setEditType] = useState(
    props.type === "edit" ? true : false
  );
  const [createType, setCreateType] = useState(
    props.type === "create" ? true : false
  );

  const [logoTitle, setLogoTitle] = useState("Логотип");

  const [menuTheme, setMenuTheme] = useState(editType ? props.menu.theme : "");
  const { t } = useTranslation();
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];
  const FILE_SIZE = 1600 * 1024;

  const fieldNotLongEnough = "Не меньше 2 символов!";
  const fieldTooLong = "Не больше 60 символов!";
  const requiredField = "Обязательное поле";
  const justNumbers = "Только цифры";
  const fileTooHeavy = "Размер файла слишком большой";
  const unsupportedFormat = "Неподдерживаемый формат файла";

  const formik = useFormik({
    initialValues: {
      logoTitle: "",
      menuInst: editType ? props.menu.instagram : "",
      menuAddress: editType ? props.menu.address : "",
      menuLogo: editType ? props.menu.logo : "",
      menuLogoState: false,
      menuTitle: editType ? props.menu.title : "",
      menuPhone: editType ? props.menu.phone : "",
      menuTheme: editType ? props.menu.theme : "",
      type: editType ? "edit" : "create",
    },
    validationSchema: Yup.object({
      menuTitle: Yup.string()
        .min(2, t("field_not_long_enough", { minCharsAmount: 2 }))
        .max(60, t("chars_amount_restriction", { maxCharsAmount: 60 }))
        .required(t("required_field")),
      menuAddress: Yup.string()
        .min(2, t("field_not_long_enough", { minCharsAmount: 2 }))
        .max(60, t("chars_amount_restriction", { maxCharsAmount: 60 }))
        .required(t("required_field")),
      menuPhone: Yup.number(30, t("just_numbers")),
      menuLogo: Yup.mixed()
        .notRequired()
        .when("menuLogoState", {
          is: true,
          then: Yup.mixed()
            .test(
              "fileSize",
              t("file_too_heavy"),
              (value) => value && value.size <= FILE_SIZE
            )
            .test(
              "fileFormat",
              t("unsupported_file_format"),
              (value) => value && SUPPORTED_FORMATS.includes(value.type)
            ),
        }),
      menuInst: Yup.string().max(60, fieldTooLong),
    }),
    onSubmit: (values) => {
      if (values.type === "edit") {
        console.log("MENU FORM", values.menuLogo);
        editMenu(props.menu.id, values, menuTheme);
        let a = setTimeout(() => {
          props.getFetchedMenu(props.menu.slug);
          window.location.reload();
        }, 1000);
      } else if (values.type === "create") {
        createMenu(values);
        props.changeCreateState();
        let a = setTimeout(() => {
          props.getFetchedMenus();
        }, 100);
      }
    },
  });

  return (
    <form className="form menu-header-form">
      <div className="menu-header-upper">
        <div className="menu-new-logo-container">
          <input
            className="menu-new-logo"
            type="file"
            name="menuLogo"
            onChange={(event) => {
              formik.setFieldValue("menuLogoState", true);
              formik.setFieldValue("menuLogo", event.currentTarget.files[0]);
            }}
            accept="image/*"
          />
          {formik.errors.menuLogo && formik.touched.menuLogo && (
            <p className="input-feedback-error">{formik.errors.menuLogo}</p>
          )}
          <label forhtml="menuLogo">{logoTitle}</label>
        </div>
        <input
          type="text"
          value={formik.values.menuInst}
          name="menuInst"
          className="menu-inst"
          onChange={formik.handleChange}
          placeholder={t("inst_placeholder")}
          style={{ marginBottom: "20px" }}
        />
        {formik.errors.menuInst && formik.touched.menuInst && (
          <p className="input-feedback-error">{formik.errors.menuInst}</p>
        )}
        <select
          onChange={(e) => {
            setMenuTheme(e.target.value);
          }}
          value={menuTheme}
        >
          <option value="default">{t("default_theme")}</option>
          <option value="Black-White">{t("black_white_theme")}</option>
        </select>
      </div>
      <div className="menu-info">
        <div>
          <input
            placeholder={t("address_placeholder")}
            className="menu-address"
            name="menuAddress"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.menuAddress}
          />
          {formik.errors.menuAddress && formik.touched.menuAddress && (
            <p className="input-feedback-error">{formik.errors.menuAddress}</p>
          )}
        </div>
        <div>
          <input
            placeholder={t("title_placeholder")}
            name="menuTitle"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.menuTitle}
          />
          {formik.errors.menuTitle && formik.touched.menuTitle && (
            <p className="input-feedback-error">{formik.errors.menuTitle}</p>
          )}
        </div>
        <div>
          <input
            name="menuPhone"
            type="text"
            placeholder={t("phone_placeholder")}
            onChange={formik.handleChange}
            value={formik.values.menuPhone}
          />
          {formik.errors.menuPhone && formik.touched.menuPhone && (
            <p className="input-feedback-error">{formik.errors.menuPhone}</p>
          )}
        </div>
      </div>
      <div className="header-buttons">
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
            editType ? props.changeEditState() : props.changeCreateState();
          }}
        >
          {t("form_cancel")}
        </button>
        {editType ? (
          <button
            className="form-btn form-delete-btn"
            onClick={() => {
              deleteMenu(props.menu.id);
              props.changeEditState();
              let a = setTimeout(() => {
                props.getFetchedMenus();
              }, 100);
            }}
          >
            {t("form_delete")}
          </button>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}
