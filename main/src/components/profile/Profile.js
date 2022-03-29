import React, { useEffect, useState } from "react";
import { getCustomer, deleteCustomer } from "../../actions/profile";

import "./profile.css";
import "../../../../static/css/reactCSS/profile/Profile.css";

export default function Profile() {
  const [customerInfo, setCustomerInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [subscriptionRU, setSubscriptionRU] = useState("");
  useEffect(() => {
    getFetchedCustomer();
  }, []);

  function getFetchedCustomer() {
    let fetchedCustomer = getCustomer();
    fetchedCustomer.then((data) => {
      setSubscriptionRU(data.subscription === "Casual" ? "Обычная" : "Нет");
      setCustomerInfo(data);
      setLoading(false);
    });
  }
  return (
    <div className="profile-container">
      <p className="profile-header">{customerInfo.email}</p>
      <div className="profile-main-inner-container">
        <div className="subscription-container profile-container-object">
          <p className="profile-container-header">Подписка</p>
          <p>Ваша подписка {subscriptionRU}</p>
          {subscriptionRU === "Нет" ? (
            <button className="profile-btn">Подключить</button>
          ) : (
            <button className="profile-btn">Отключить</button>
          )}
        </div>
        <div className="account-settings-container profile-container-object">
          <p className="profile-container-header">Настройка профиля</p>
          <div className="delete-account">
            <p className="profile-settings-header">WHY</p>
            <p className="disclamer">
              Удаление аккаунта приведет к удалению меню, а также вы потеряете
              подписку ну и еще какой нибудь предупрежающий текст
            </p>
            <button
              className="profile-btn"
              onClick={() => {
                console.log("asd");
                // deleteCustomer();
              }}
            >
              Удалить аккаунт
            </button>
          </div>
          <div className="change-password">
            <p className="profile-settings-header">Изменить пароль</p>
            <button
              className="profile-btn"
              onClick={() => {
                // deleteCustomer();
                console.log("Включить функцию");
              }}
            >
              Изменить пароль
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
