import React, { useEffect, useState } from "react";
// import { Categories } from "./category/Categories";
import Categories from "../category/Categories";
import { getMenu, createCategory } from "../../../actions/menus";
import MenuForm from "../../forms/MenuForm";
import QRCode from "react-qr-code";
import "../../../../../static/css/reactCSS/menu/menu/Menu.css";

export default function Menu(props) {
  const { slug, getFetchedMenus } = props;
  const [menu, setMenu] = useState([]);
  const [editState, setEditState] = useState(false);
  useEffect(() => {
    getFetchedMenu(slug);
  }, []);
  async function getFetchedMenu(slug) {
    setMenu(await getMenu(slug));
    let fetchedMenu = getMenu(slug);
    fetchedMenu.then((data) => {
      setMenu(data);
    });
  }

  function changeEditState() {
    if (editState) {
      setEditState(false);
    } else {
      setEditState(true);
    }
  }
  let onImageDownload = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  let ROOT_URL = "/menu/";
  let SITE_URL = "https://foodmenu-demo.herokuapp.com";
  return (
    <section
      className="menu-header-section"
      style={{ background: menu.theme === "Black-White" ? "#141618" : "" }}
    >
      <div className="QRCode-container">
        <a className="customer-page-link" href={`${ROOT_URL + menu.slug}`}>
          Перейти на страницу пользователя
        </a>

        <QRCode id="QRCode" value={`${SITE_URL + ROOT_URL + menu.slug}`} />
        <input
          type="button"
          value="Скачать QR-Код"
          onClick={() => {
            onImageDownload();
          }}
        />
      </div>

      {editState ? (
        <MenuForm
          type={"edit"}
          menu={menu}
          changeEditState={changeEditState}
          getFetchedMenu={getFetchedMenu}
          getFetchedMenus={getFetchedMenus}
        />
      ) : (
        <div className="menu-header">
          <div className="menu-header-upper">
            <div className="menu-logo-container">
              <img className="menu-logo" src={menu.logoURL} alt="img" />
            </div>
            <div className="menu-instagram">
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2"
                  y="2"
                  width="40"
                  height="40"
                  rx="8"
                  stroke="white"
                  strokeWidth="3"
                />
                <rect
                  x="14"
                  y="14"
                  width="16"
                  height="16"
                  rx="8"
                  stroke="white"
                  strokeWidth="3"
                />
                <rect
                  x="30"
                  y="7"
                  width="6.4"
                  height="6.4"
                  rx="3.2"
                  fill="white"
                />
              </svg>
              <a href={`https://www.instagram.com/${menu.instagram}/`}>
                {menu.instagram}
              </a>
            </div>
          </div>

          <div className="menu-info">
            <p className="menu-address">{menu.address}</p>
            <p className="menu-title">
              {menu.title}
              <button
                className="button-edit"
                onClick={() => {
                  changeEditState();
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.60946 13.8367C2.6048 13.7249 2.64717 13.6163 2.72627 13.5372L12.7279 3.53553C12.8841 3.37932 13.1374 3.37932 13.2936 3.53553L18.3848 8.6267C18.541 8.78291 18.541 9.03618 18.3848 9.19239L8.38313 19.194C8.30402 19.2731 8.19541 19.3155 8.08363 19.3109L3.19611 19.1072C2.98828 19.0985 2.82177 18.932 2.81311 18.7242L2.60946 13.8367Z"
                    fill="white"
                  />
                  <path
                    d="M14.5944 2.23447C14.4382 2.07826 14.4382 1.825 14.5944 1.66879L15.1956 1.06753C15.2552 1.00792 15.3322 0.968665 15.4154 0.955374L16.7687 0.739305C16.8953 0.719089 17.0239 0.760795 17.1146 0.851459L21.0685 4.80542C21.1592 4.89609 21.2009 5.02472 21.1807 5.15133L20.9646 6.50461C20.9513 6.58785 20.9121 6.66477 20.8525 6.72438L20.2512 7.32564C20.095 7.48185 19.8417 7.48185 19.6855 7.32564L14.5944 2.23447Z"
                    fill="white"
                  />
                </svg>
              </button>
            </p>
            <p className="menu-phone">{menu.phone}</p>
          </div>
          {menu.id ? <Categories menu_id={menu.id} /> : ""}
        </div>
      )}
    </section>
  );
}
