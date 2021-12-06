import axios from "axios";

// GET MENU
export const getMenu = async (slug) =>
  fetch(`/api/menu/${slug}`).then((response) => response.json());

// GET MENU
// export const getCategories = async (menu_id) => {
//   let url = `http://127.0.0.1:8000/api/menu/get_categories/2`;
//   axios.get(url)
// };

export const getCategories = async (menu_id) => {
  let response;
  let url = `/api/menu/get_categories/${menu_id}`;
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
  try {
    response = await axios.get(url);
  } catch (e) {
    // catch error
    throw new Error(e.message);
  }

  // if success return value
  return response?.data ? response?.data : null;
};
