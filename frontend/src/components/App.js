import "core-js/stable";
import "regenerator-runtime/runtime";
// import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import Header from "./layout/Header";
import { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Menus from "./menu/menu/Menus";
import Profile from "./profile/Profile";
import "./App.css";

export default function App() {
  return (
    <div className="container">
      <Router basename="/profile">
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
