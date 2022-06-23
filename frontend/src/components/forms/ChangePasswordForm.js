import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { changePassword } from "../../actions/profile";
import axios from "axios";
import "../../../../static/css/reactCSS/forms/Forms.css";

export default function ChangePasswordForm(props) {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  const { t } = useTranslation();
  function createError(divToAppend, errorMessage) {
    let errorDiv = document.createElement("div");
    errorDiv.classList.add("error-container");
    let errorPTag = document.createElement("p");
    errorPTag.classList.add("error-text");
    let emptyField = errorMessage;
    errorPTag.innerHTML = emptyField;
    errorDiv.appendChild(errorPTag);
    let a = document.querySelector(`${divToAppend}`);
    a.appendChild(errorDiv);
  }

  function deleteAllErrorMessages() {
    let errorDivs = document.querySelectorAll(".error-container");
    if (errorDivs.length !== []) {
      errorDivs.forEach((element) => {
        element.remove();
      });
    }
  }

  async function changePasswordSubmit() {
    deleteAllErrorMessages();

    let url = `http://127.0.0.1:8000/auth/password/change/`;
    let csrftoken = getCookie("csrftoken");

    const newPassword = {
      new_password1: password1,
      new_password2: password2,
    };
    const headers = {
      "Content-type": "application/json",
      "X-CSRFToken": csrftoken,
    };
    axios
      .post(url, newPassword, { headers })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          createError(".new_password1", response.data.detail);
        }
        let a = setTimeout(() => {
          props.changePasswordState();
        }, 1000);
      })
      .catch((e) => {
        if (e.response.data.new_password1) {
          createError(".new_password1", e.response.data.new_password1);
        }
        if (e.response.data.new_password2) {
          createError(".new_password2", e.response.data.new_password2);
        }
      });
  }
  return (
    <div>
      <form className="form password-change">
        <div className="new_passwords_container">
          <div className="new_password1">
            <input
              name="password1"
              type="password"
              placeholder={t("password_placeholder")}
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>
          <div className="new_password2">
            <input
              name="password2"
              type="password"
              placeholder={t("repeat_password_placeholder")}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
        </div>
        <div className="form-btns-container">
          <button
            type="submit"
            className="form-btn form-submit-btn"
            onClick={(e) => {
              e.preventDefault();
              changePasswordSubmit();
            }}
          >
            {t("change_password_submit_btn")}
          </button>

          <button
            className="form-btn form-cancel-btn"
            onClick={() => {
              props.changePasswordState();
            }}
          >
            {t("form_cancel")}
          </button>
        </div>
      </form>
    </div>
  );
}
