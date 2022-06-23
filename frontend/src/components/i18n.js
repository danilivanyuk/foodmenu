import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "../assets/locales/en/translation.json";
import translationRU from "../assets/locales/ru/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ru"],
    load: "languageOnly",
    resources,

    fallbackLng: "en",
    debug: true,
    // Options for language detector
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    react: { useSuspense: false },
    // ns: "translation",
    // backend: {
    //   loadPath: "frontend/src/assets/locales/{{lng}}/translation.json",
    //   //   loadPath: "./assets/locales/{{lng}}/translation.json",
    // },
  });

export default i18n;
