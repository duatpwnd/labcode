import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import langEn from "src/lang/lang.en.json";
import langKo from "src/lang/lang.ko.json";
const resources = {
  en: { translation: langEn },
  ko: { translation: langKo },
};
const userLanguage = window.navigator.language;
i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || userLanguage || "en",
  fallbackLng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});
export const languages = ["ko", "en"] as const;

export type Languages = typeof languages[number];
