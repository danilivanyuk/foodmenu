import React, { useEffect, useState } from "react";
import { getCustomer, deleteCustomer } from "../../actions/profile";
import ChangePasswordForm from "../forms/ChangePasswordForm";
import { resendEmailConfirmation } from "../../actions/profile";
import "../../../../static/css/reactCSS/profile/Profile.css";

export default function Profile() {
  const [customerInfo, setCustomerInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [subscriptionRU, setSubscriptionRU] = useState("");
  const [passwordState, setPasswordState] = useState(false);
  useEffect(() => {
    getFetchedCustomer();
  }, []);

  function changePasswordState() {
    if (passwordState) {
      setPasswordState(false);
    } else {
      setPasswordState(true);
    }
  }

  function getFetchedCustomer() {
    let fetchedCustomer = getCustomer();
    fetchedCustomer.then((data) => {
      setSubscriptionRU(data.subscription === "Casual" ? "Обычная" : "Нет");
      setCustomerInfo(data);
      setLoading(false);
    });
  }
  console.log(customerInfo);
  return (
    <div className="profile-container">
      <p className="profile-header">{customerInfo.email}</p>
      <div className="profile-main-inner-container">
        <div className="subscription-container profile-container-object">
          <p className="profile-container-header">Подписка</p>
          {subscriptionRU === "Нет" ? (
            <div>
              <p>У вас нет подписки</p>
              <button className="profile-btn">Подключить</button>
            </div>
          ) : (
            <div>
              <p>У вас {subscriptionRU} подписка</p>
              <button className="profile-btn">Отключить</button>
            </div>
          )}
        </div>
        <div className="account-settings-container profile-container-object">
          {customerInfo.is_email_confirmed === false ? (
            <div className="submit-email">
              <p className="profile-settings-header">Подтвердить почту</p>
              <button
                className="profile-btn"
                onClick={() => {
                  resendEmailConfirmation(customerInfo.email);
                }}
              >
                Отправить письмо
              </button>
            </div>
          ) : (
            ""
          )}

          <p className="profile-container-header">Настройка профиля</p>
          <div className="change-password">
            <p className="profile-settings-header">Изменить пароль</p>
            {passwordState ? (
              <ChangePasswordForm changePasswordState={changePasswordState} />
            ) : (
              <button
                className="profile-btn"
                onClick={() => {
                  changePasswordState();
                }}
              >
                Изменить пароль
              </button>
            )}
          </div>
          <div className="delete-account">
            <p className="profile-settings-header">Удаление аккаунта</p>
            <p className="disclamer">
              Удаление аккаунта приведет к удалению меню, а также вы потеряете
              подписку ну и еще какой нибудь предупрежающий текст
            </p>
            <button
              className="profile-btn"
              onClick={() => {
                deleteCustomer();
                console.log("comments");
              }}
            >
              Удалить аккаунт
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
