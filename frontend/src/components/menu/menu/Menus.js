import React, { Fragment } from "react";
import { getMenus } from "../../../actions/menus";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MenuForm from "../../forms/MenuForm";
import Menu from "./Menu";
import "../../../../../static/css/reactCSS/menu/menu/Menus.css";

export default function Menus() {
  const [menus, setMenus] = useState([]);
  const [token, setToken] = useState([]);
  const [createState, setCreateState] = useState(false);
  const maxMenu = 3;
  useEffect(() => {
    getFetchedMenus();
  }, []);
  async function getFetchedMenus() {
    let fetchedMenus = getMenus();
    fetchedMenus.then((data) => {
      setMenus(data);
    });
  }
  function changeCreateState() {
    if (createState) {
      setCreateState(false);
    } else {
      setCreateState(true);
    }
  }
  // const { url, path } = useRouteMatch();
  if (typeof menus === "undefined") {
    return <p>Меню загружаются</p>;
  } else
    return (
      <section className="menus-section">
        <Router basename="/profile/menus">
          <div className="menus-select-container">
            {menus.map((menu) => (
              <Fragment key={menu.id}>
                <Link to={`/menu/${menu.slug}`} className="menu-select">
                  {/* <Link to={`/${url}/${menu.slug}`}> */}
                  {/* <div className="menu-select"> */}
                  <div className="menu-select-info">
                    <p>{menu.title}</p>
                    <p>{menu.address}</p>
                    <p>{menu.phone}</p>
                  </div>

                  <img className="" src={menu.logoURL} alt="img" />
                  {/* </div> */}
                </Link>
              </Fragment>
            ))}
            {menus.length < maxMenu ? (
              createState ? (
                <MenuForm
                  type={"create"}
                  changeCreateState={changeCreateState}
                  getFetchedMenus={getFetchedMenus}
                />
              ) : (
                <div className="menu-select">
                  <div className="menu-select-info">
                    <button
                      className="menu-select-create-btn"
                      onClick={() => {
                        changeCreateState();
                      }}
                    >
                      Создать меню
                    </button>
                  </div>
                </div>
                // <button
                //   className="menu-select-create-btn"
                //   onClick={() => {
                //     changeCreateState();
                //   }}
                // >
                //   Создать меню
                // </button>
              )
            ) : (
              <a className="menu-select">
                <div className="menu-select-info">
                  <p>Вы можете создать только {maxMenu} меню</p>
                </div>
              </a>
            )}
          </div>
          {menus.map((menu) => (
            <Switch key={menu.id}>
              <Route path={`/menu/${menu.slug}`}>
                <Menu slug={menu.slug} getFetchedMenus={getFetchedMenus} />
              </Route>
            </Switch>
          ))}
        </Router>
      </section>
    );
}
