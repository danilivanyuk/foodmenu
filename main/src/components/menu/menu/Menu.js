import React, { useEffect, useState } from "react";
// import { Categories } from "./category/Categories";
import Categories from "../category/Categories";
import { getMenu } from "../../../actions/menus";
import "../../../../../static/css/reactCSS/menu/menu/Menu.css";

export default function Menu() {
  // const { slug, getFetchedMenus } = props;
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    // !! menuSlug обоззначен в html файле !!

    getFetchedMenu(menuSlug);
  }, []);
  async function getFetchedMenu(menuSlug) {
    setMenu(await getMenu(menuSlug));
  }

  return (
    <section
      className="menu-header-section"
      style={{ background: menu.theme === "Black-White" ? "#141618" : "" }}
    >
      <div className="menu-header">
        <div className="menu-header-upper">
          <div className="menu-logo-container">
            <img className="menu-logo" src={menu.logoURL} alt="img" />
          </div>
          <p className="menu-instagram">
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
          </p>
        </div>

        <div className="menu-info">
          <p className="menu-address">{menu.address}</p>
          <p className="menu-title">{menu.title}</p>
          <p className="menu-phone">{menu.phone}</p>
        </div>
        {menu.id ? <Categories menu_id={menu.id} /> : ""}
      </div>
    </section>
  );
}
