import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getCustomer, deleteCustomer } from "../../actions/profile";
import ChangePasswordForm from "../forms/ChangePasswordForm";
import { resendEmailConfirmation } from "../../actions/profile";
import "../../../../static/css/reactCSS/profile/Profile.css";

export default function Profile() {
  const [customerInfo, setCustomerInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState("");
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
      console.log(data.subscription);
      setSubscription(
        data.subscription === "Casual" ? t("casual_subscription") : t("none")
      );
      setCustomerInfo(data);
      setLoading(false);
    });
  }
  const { t } = useTranslation();

  return (
    <div className="profile-container">
      <p className="profile-header">{customerInfo.email}</p>
      <div className="profile-main-inner-container">
        <div className="subscription-container profile-container-object">
          <p className="profile-container-header">{t("subsctiption_title")}</p>
          {subscription === "Нет" ? (
            <div>
              <p>{t("dont_have_subscription")}</p>
              <button className="profile-btn">{t("subscribe")}</button>
            </div>
          ) : (
            <div>
              <p>{t("you_got_that_subscription", { subscription })}</p>
              {/* <button className="profile-btn">{t("unsubscribe")}</button> */}
            </div>
          )}
        </div>
        <div className="account-settings-container profile-container-object">
          {customerInfo.is_email_confirmed === false ? (
            <div className="submit-email">
              <p className="profile-settings-header">{t("confirm_email")}</p>
              <button
                className="profile-btn"
                onClick={() => {
                  resendEmailConfirmation(customerInfo.email);
                }}
              >
                {t("confirm_esend_confirm_codemail")}
              </button>
            </div>
          ) : (
            ""
          )}

          <p className="profile-container-header">{t("profile_settings")}</p>
          <div className="change-password">
            <p className="profile-settings-header">{t("change_password")}</p>
            {passwordState ? (
              <ChangePasswordForm changePasswordState={changePasswordState} />
            ) : (
              <button
                className="profile-btn"
                onClick={() => {
                  changePasswordState();
                }}
              >
                {t("change_password")}
              </button>
            )}
          </div>
          <div className="delete-account">
            <p className="profile-settings-header">
              {t("delete_account_title")}
            </p>
            <p className="disclaimer">{t("disclaimer")}</p>
            <button
              className="profile-btn"
              onClick={() => {
                deleteCustomer();
                console.log("comments");
              }}
            >
              {t("delete_account")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
