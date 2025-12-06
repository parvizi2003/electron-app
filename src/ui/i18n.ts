import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: "ru",
    debug: true,

    interpolation: {
      escapeValue: false,
    },

    backend: {
      // URL backend-а
      loadPath: "http://laravel-pizza.test:8000/api/lang/ru",
      // если сервер требует JSON
      crossDomain: true,
    },
  });

export default i18n;
