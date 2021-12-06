import axios from "axios";
import { ROOT_URL } from "./res";

let API_URL = "http://127.0.0.1:8000";
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

// const isAuthorized = async () => {
//   let user_url = `${API_URL}/auth/user/`;
//   let response;
//   let authorized = false;
//   try {
//     response = await axios.get(user_url);
//     console.log(response.status);
//     if (response.status === 200) {
//       authorized = true;
//     }
//   } catch (e) {
//     console.log(e.response.data.code);
//     if (e.response.data.code === "token_not_valid") {
//       await refreshToken();
//       await isAuthorized();
//     }
//   }
//   // console.log("AAA", authorized);
//   return authorized;
// };

// const refreshToken = async () => {
//   let refresh_url = `http://127.0.0.1:8000/auth/token/refresh/`;
//   const headers = {
//     "Content-type": "multipart/form-data",
//     // "X-CSRFToken": csrftoken,
//   };
//   axios
//     .post(refresh_url, { headers })
//     .then(() => isAuthorized())
//     .catch((e) => {
//       console.log("Err in refresh", e.response.data.code);
//       if (e.response.status === 401) {
//         window.location.assign(API_URL + "/login/");
//         console.log("refreshToken err");
//       }
//     });
//   await isAuthorized();
// };

let AUTH_STATE = false;

// !!!

// # Во время теста и привлечения клиентов будет использоваться Session после того как найдутся клиенты, и будет смысл монетизировать сделаю JWTCookieAuth

// !!!

// const isAuthorized = async () => {
//   let user_url = `${API_URL}/auth/user/`;
//   await axios
//     .get(user_url)
//     .then(() => (AUTH_STATE = true))
//     .catch(() => refreshToken());
// };

// const refreshToken = async () => {
//   let refresh_url = `http://127.0.0.1:8000/auth/token/refresh/`;
//   const headers = {
//     "Content-type": "multipart/form-data",
//   };
//   await axios
//     .post(refresh_url, { headers })
//     .then(() => (AUTH_STATE = true))
//     .catch((e) => console.log(e));
// };
// GET MENUS
export const getMenus = async () => {
  let url = `/api/menus/`;
  // let url = `${ROOT_URL}/api/menus/`;
  let response;

  try {
    response = await axios.get(url);
    // console.log("RESPONSE", response);
  } catch (e) {
    // console.log("RESP", e.response);
    if (e.response.status === 401) {
      console.log("err in getMenus inner", e.response);
    }
  } finally {
    response = await axios.get(url);
  }
  // if success return value
  return response?.data ? response?.data : null;
};
// GET MENU
export const getMenu = async (slug) =>
  // fetch(`${ROOT_URL}/api/menu/${slug}`).then((response) => {
  //   response.json();
  // });
  {
    let response;
    let url = `/api/menu/${slug}`;
    // let url = `${ROOT_URL}/api/menu/${slug}`;
    try {
      response = await axios.get(url);
    } catch (e) {
      // catch error
      throw new Error(e.message);
    }
    // if success return value
    return response?.data ? response?.data : null;
  };

// GET MENU
// export const getCategories = async (menu_id) => {
//   let url = `${ROOT_URL}/api/menu/get_categories/2`;
//   axios.get(url)
// };

export const getCategories = async (menu_id) => {
  let response;
  let url = `/api/menu/get_categories/${menu_id}`;
  // let url = `${ROOT_URL}/api/menu/get_categories/${menu_id}`;
  try {
    response = await axios.get(url);
  } catch (e) {
    // catch error
    throw new Error(e.message);
  }
  // if success return value
  return response?.data ? response?.data : null; // or set initial value
};

export const getDishes = async (category_id) => {
  let response;
  let url = `/api/menu/get_dishes/${category_id}`;
  // let url = `${ROOT_URL}/api/menu/get_dishes/${category_id}`;
  try {
    response = await axios.get(url);
  } catch (e) {
    // catch error
    throw new Error(e.message);
  }

  // if success return value
  return response?.data ? response?.data : null;
};

export const editMenu = (menu_id, props, menuTheme) => {
  let url = `/api/menu/edit_menu/${menu_id}`;
  // let url = `${ROOT_URL}/api/menu/edit_menu/${menu_id}`;
  let csrftoken = getCookie("csrftoken");
  let formData = new FormData();
  if (typeof props.menuLogo === "object") {
    formData.append("logo", props.menuLogo);
  }
  formData.append("title", props.menuTitle);
  formData.append("instagram", props.menuInst);
  formData.append("address", props.menuAddress);
  formData.append("phone", props.menuPhone);
  formData.append("theme", menuTheme);
  for (let [name, value] of formData) {
    console.log(name, value);
  }
  const headers = {
    "Content-type": "multipart/form-data",
    "X-CSRFToken": csrftoken,
  };

  axios.post(url, formData, { headers }).catch(() => {
    alert("Кафе с таким названием и адресом уже существует");
  });
};

export const editCategory = (category_id, values, categoryMenu) => {
  let url = `/api/menu/edit_category/${category_id}`;
  // let url = `${ROOT_URL}/api/menu/edit_category/${category_id}`;
  let csrftoken = getCookie("csrftoken");
  console.log(values);
  const category = {
    id: category_id,
    menu: categoryMenu,
    title: values.categoryTitle,
  };
  const headers = {
    "Content-type": "application/json",
    "X-CSRFToken": csrftoken,
  };
  axios.post(url, category, { headers });
};

export const editDish = (dish_id, dishCategory, values) => {
  let url = `/api/menu/edit_dish/${dish_id}`;
  // let url = `${ROOT_URL}/api/menu/edit_dish/${dish_id}`;
  let csrftoken = getCookie("csrftoken");

  const dish = {
    category: dishCategory,
    title: values.dishTitle,
    description: values.dishDescription,
    price: values.dishPrice,
  };

  const headers = {
    "Content-type": "application/json",
    "X-CSRFToken": csrftoken,
  };
  axios.post(url, dish, { headers });
};

export const deleteMenu = (menu_id) => {
  let csrftoken = getCookie("csrftoken");
  let url = `/api/menu/delete_menu/${menu_id}`;
  // let url = `${ROOT_URL}/api/menu/delete_menu/${menu_id}`;
  const headers = {
    "Content-type": "application/json",
    "X-CSRFToken": csrftoken,
  };
  axios.delete(url, { headers });
};

export const deleteCategory = (category_id) => {
  let csrftoken = getCookie("csrftoken");
  let url = `${ROOT_URL}/api/menu/delete_category/${category_id}`;
  const headers = {
    "Content-type": "application/json",
    "X-CSRFToken": csrftoken,
  };
  axios.delete(url, { headers });
};

export const createMenu = (props, menuLogo) => {
  let csrftoken = getCookie("csrftoken");
  let url = `/api/menu/create_menu/`;
  // let url = `${ROOT_URL}/api/menu/create_menu/`;

  let formData = new FormData();
  if (menuLogo instanceof File) {
    formData.append("logo", menuLogo);
  }
  formData.append("title", props.menuTitle);
  formData.append("instagram", props.menuInst);
  formData.append("address", props.menuAddress);
  formData.append("phone", props.menuPhone);
  const headers = {
    "Content-type": "multipart/form-data",
    "X-CSRFToken": csrftoken,
  };
  axios.post(url, formData, { headers }).catch((err) => {
    alert("Кафе с таким названием и адресом уже существует");
  });
};

export const createCategory = (menu_id, values) => {
  let csrftoken = getCookie("csrftoken");
  let url = `/api/menu/create_category/`;
  // let url = `${ROOT_URL}/api/menu/create_category/`;
  const category = {
    menu: menu_id,
    title: values.categoryTitle,
  };
  const headers = {
    "Content-type": "application/json",
    "X-CSRFToken": csrftoken,
  };
  axios.post(url, category, { headers });
};

export const createDish = (dishCategory, values) => {
  let csrftoken = getCookie("csrftoken");
  let url = `/api/menu/create_dish/`;
  // let url = `${ROOT_URL}/api/menu/create_dish/`;
  const dish = {
    category: dishCategory,
    title: values.dishTitle,
    description: values.dishDescription,
    price: values.dishPrice,
  };
  const headers = {
    "Content-type": "application/json",
    "X-CSRFToken": csrftoken,
  };
  console.log(dish);
  axios.post(url, dish, { headers });
};

export const deleteDish = (dish_id) => {
  let csrftoken = getCookie("csrftoken");
  let url = `/api/menu/delete_dish/${dish_id}`;
  // let url = `${ROOT_URL}/api/menu/delete_dish/${dish_id}`;
  const headers = {
    "Content-type": "application/json",
    "X-CSRFToken": csrftoken,
  };
  axios.delete(url, { headers });
};
