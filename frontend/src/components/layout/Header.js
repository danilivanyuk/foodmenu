import React from "react";
import { Link } from "react-router-dom";
import "../../../../static/css/reactCSS/layout/Header.css";

import { logOut } from "../../actions/profile";
export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Профиль</Link>
          </li>
          <li>
            <Link to="/menus">Меню</Link>
          </li>
          <li>
            <a href="/logout/">Выйти</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
