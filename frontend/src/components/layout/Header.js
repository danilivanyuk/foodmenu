import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../../../../static/css/reactCSS/layout/Header.css";
import { logOut } from "../../actions/profile";
export default function Header() {
  const { t } = useTranslation();
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">{t("profile")}</Link>
          </li>
          <li>
            <Link to="/menus">{t("menu")}</Link>
          </li>
          <li>
            <a href="/">{t("back_to_homepage")}</a>
          </li>
          <li>
            <a href="/logout/">{t("sign_out")}</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
