import "core-js/stable";
import "regenerator-runtime/runtime";
// import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import Header from "./layout/Header";
import { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import cookies from "js-cookie";

import "./i18n";
import { useTranslation } from "react-i18next";

import Menus from "./menu/menu/Menus";
import Profile from "./profile/Profile";
import "./App.css";

import i18next from "./i18n";
const languages = [
  {
    code: "ru",
    name: "Русский",
    country_code: "ru",
  },
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
];
export default function App() {
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  return (
    <div className="container">
      <div className="change-language">
        <input id="toggle2" type="checkbox" />
        <label htmlFor="toggle2" className="animate">
          {t("change_language")}
          <i className="fa fa-list float-right"></i>
        </label>
        <ul className="animate">
          {languages.map(({ code, name, country_code }) => (
            <li key={country_code} className="animate">
              <a
                href="#"
                onClick={() => {
                  i18next.changeLanguage(code);
                }}
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <Router basename={currentLanguageCode + "/profile"}>
        <Fragment>
          <Header />
          <Switch>
            <Route path="/menus">
              <Menus />
            </Route>
            <Route path="/">
              <Profile />
            </Route>
          </Switch>
        </Fragment>
        <Fragment></Fragment>
      </Router>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("App"));
