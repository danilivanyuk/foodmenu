import axios from "axios";
import { ROOT_URL } from "./res";
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

export const changePassword = async (props) => {
  let url = `/auth/password/change/`;
  // let url = `${ROOT_URL}/auth/password/change/`;
  let csrftoken = getCookie("csrftoken");

  const newPassword = {
    password1: props.password1,
    password2: props.password2,
  };
  const headers = {
    "Content-type": "application/json",
    "X-CSRFToken": csrftoken,
  };
  let error = "";
  axios.post(url, newPassword, { headers }).catch((e) => {
    error = e;
  });
  if (error != "") {
    return error;
  }
};

export const getCustomer = async () => {
  let response;
  let url = `/api/profile/get_customer/`;
  // let url = `${ROOT_URL}/api/profile/get_customer/`;
  try {
    response = await axios.get(url);
  } catch (e) {
    // catch error
    throw new Error(e.message);
  }

  // if success return value
  return response?.data ? response?.data : null; // or set initial value
};

export const deleteCustomer = () => {
  let csrftoken = getCookie("csrftoken");
  let url = `/api/profile/delete_customer`;
  // let url = `${ROOT_URL}/api/profile/delete_customer`;
  const headers = {
    "Content-type": "application/json",
    "X-CSRFToken": csrftoken,
  };
  axios.delete(url, { headers });
};

export const resendEmailConfirmation = (props) => {
  let csrftoken = getCookie("csrftoken");
  let url = `/auth/registration/resend-email/`;
  // let url = `${ROOT_URL}/auth/registration/resend-email/`;
  const headers = {
    "Content-type": "application/json",
    "X-CSRFToken": csrftoken,
  };
  console.log(props);
  let data = {
    email: props,
  };
  axios.post(url, data, { headers }).catch((e) => {
    console.log(e);
  });
};
