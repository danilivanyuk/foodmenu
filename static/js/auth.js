// import { SITE_LINK } from "./defaultVars.js";
// SITE_LINK = "https://foodmenu-demo.herokuapp.com";
let SITE_LINK = ``;
if (document.querySelector(".btn-login-submit")) {
  document.querySelector(".btn-login-submit").addEventListener("click", login);
} else if (document.querySelector(".btn-register-submit")) {
  console.log("KLJDHGFLKDJSG");
  document
    .querySelector(".btn-register-submit")
    .addEventListener("click", register);
} else if (document.querySelector(".btn-reset-password-submit")) {
  document
    .querySelector(".btn-reset-password-submit")
    .addEventListener("click", passwordResetConfirm);
} else if (document.querySelector(".btn-reset-password-request")) {
  document
    .querySelector(".btn-reset-password-request")
    .addEventListener("click", passwordResetRequest);
}

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

let emptyFieldErrorMessage = "Это поле не может быть пустым";
let emailValidationErrorMessage = "Введите корректный адрес";
let wrongEmailOrPasswordErrorMessage = "Неправильный логин или пароль";
let passwordChangedSuccessfully = "Неправильный логин или пароль";

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function isFieldFilled(data) {
  let form = document.querySelector(".form-horizontal");
  let isOk = true;
  if (data.email === "") {
    createError(".email-container", emptyFieldErrorMessage);
    isOk = false;
  } else if (data.email !== "") {
    if (!validateEmail(data.email)) {
      createError(".email-container", emailValidationErrorMessage);
      isOk = false;
    }
  }
  if (data.password === "") {
    createError(".password-container", emptyFieldErrorMessage);
    isOk = false;
  }
  let a = setTimeout(() => {
    deleteAllErrorMessages();
  }, 3000);
  return isOk;
}

function deleteAllErrorMessages() {
  let errorDivs = document.querySelectorAll(".error-container");
  if (errorDivs.length !== []) {
    errorDivs.forEach((element) => {
      element.remove();
    });
  }
}

function login() {
  let url = `${SITE_LINK}/auth/login/`;
  let form = document.querySelector(".form-horizontal");
  // var form = document.forms[0];

  let data = {
    email: form.querySelector('input[name="email"]').value,
    password: form.querySelector('input[name="password"]').value,
  };
  const headers = {
    "Content-type": "application/json",
  };
  if (isFieldFilled(data)) {
    axios
      .post(url, data, { headers })
      .then((resp) => {
        if (resp.status === 200) {
          window.location.assign(`${SITE_LINK}/profile`);
        }
      })
      .catch((e) => {
        createError(".password-container", wrongEmailOrPasswordErrorMessage);
      });
  }
}

function register() {
  deleteAllErrorMessages();
  let form = document.querySelector(".form-horizontal");
  console.log("reg rabotaet");
  let url = `${SITE_LINK}/registration/`;
  const headers = {
    "Content-type": "application/json",
  };
  let data = {
    email: form.querySelector('input[name="email"]').value,
    password1: form.querySelector('input[name="password1"]').value,
    password2: form.querySelector('input[name="password2"]').value,
  };
  linkToLogin = document.getElementById("profile-page-link");
  axios
    .post(url, data, { headers })
    .then(() => (window.location = linkToLogin.href))
    .catch((e) => {
      if (e.response.data.email) {
        createError(".email-container", e.response.data.email);
      }
      if (e.response.data.password1) {
        console.log(e.response.data.password1);
        createError(".password1-container", e.response.data.password1);
      }
      if (e.response.data.password2) {
        console.log(e.response.data.password2);

        createError(".password2-container", e.response.data.password2);
      }
    });
}

function passwordResetRequest() {
  let url = `${SITE_LINK}/auth/password/reset/`;
  let form = document.querySelector(".form-horizontal");
  let data = {
    email: form.querySelector('input[name="email"]').value,
  };

  const headers = {
    "Content-type": "application/json",
  };
  if (isFieldFilled(data)) {
    axios
      .post(url, data, { headers })
      .then((resp) => {
        if (resp.status === 200) {
          createError(".email-container", "Письмо отправлено на почтовый ящик");
        }
      })
      .catch((e) => {
        createError(".email-container", e.response);
      });
  }
}

function passwordResetConfirm() {
  deleteAllErrorMessages();

  let url = `${SITE_LINK}/auth/password/reset/confirm/`;
  let form = document.querySelector(".form-horizontal");
  var url_elements = window.location.pathname.split("/");
  let uid;
  let token;
  if (url_elements.length == 6) {
    uid = url_elements[url_elements.length - 3];
    token = url_elements[url_elements.length - 2];
  }
  let csrftoken = getCookie("csrftoken");

  const headers = {
    "Content-type": "application/json",
    "X-CSRFToken": csrftoken,
  };
  let data = {
    new_password1: form.querySelector('input[name="new_password1"]').value,
    new_password2: form.querySelector('input[name="new_password2"]').value,
    uid: uid,
    token: token,
  };
  let linkToLogin = document.getElementById("login-page");

  console.log(data);
  axios
    .post(url, data, { headers })
    .then(() => {
      createError(".password2-container", passwordChangedSuccessfully);
      window.location = linkToLogin.href;
    })
    .catch((e) => {
      console.log(e);
      if (e.response.status !== 200) {
        if (e.response.data.new_password1) {
          createError(".password1-container", e.response.data.new_password1);
        }
        if (e.response.data.new_password2 && e.response.status !== 200) {
          createError(".password2-container", e.response.data.new_password2);
        }
      }
    });
}
