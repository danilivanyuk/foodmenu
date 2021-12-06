import "core-js/stable";
import "regenerator-runtime/runtime";
// import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import Menu from "./menu/menu/Menu";
import RememberCart from "./menu/RememberCart/RememberCart";
import "./App.css";
import RememberCartProvider from "../actions/RememberContext";

export default function App() {
  return (
    <div className="container">
      <RememberCartProvider>
        <Menu />
        <RememberCart />
      </RememberCartProvider>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("App"));
