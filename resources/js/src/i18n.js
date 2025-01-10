import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { useSelector } from "react-redux";
import { selectLanguage } from "./reducers/languageSlice";
import { matchUrlAndStoredLanguage } from "./hooks/customFunctions";
import useGeoLocation from "react-ipgeolocation";
import { useEffect, useState } from "react";

const defaultLanguage = matchUrlAndStoredLanguage();
// Get location details


const resources = {
  en_SG: {
    translation: require("./locales/en/translation.json"),
  },
  en_US: {
    translation: require("./locales/en/translation.json"),
  },
  en_AU: {
    translation: require("./locales/en/translation.json"),
  },
  en_NZ: {
    translation: require("./locales/en/translation.json"),
  },
  en_CA: {
    translation: require("./locales/en/translation.json"),
  },
  en_IN: {
    translation: require("./locales/en/translation.json"),
  },
  en_MY: {
    translation: require("./locales/en/translation.json"),
  },
  en_UK: {
    translation: require("./locales/en/translation.json"),
  },
  es_ES: {
    translation: require("./locales/es/translation.json"),
  },
  fr_FR: {
    translation: require("./locales/fr/translation.json"),
  },
  de_DE: {
    translation: require("./locales/de/translation.json"),
  },
  id_ID: {
    translation: require("./locales/id/translation.json"),
  },
  it_IT: {
    translation: require("./locales/it/translation.json"),
  },
  es_MX: {
    translation: require("./locales/es/translation.json"),
  },
  zh_CN: {
    translation: require("./locales/zh/translation.json"),
  },
  zh_HK: {
    translation: require("./locales/zh/translation.json"),
  },
  ja_JP: {
    translation: require("./locales/ja/translation.json"),
  },
  // Add other languages as needed
};

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage, // Provide a default language if needed
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
});

export const useDynamicLanguage = () => {
  const language = useSelector(selectLanguage);

  if (i18n.language !== language) {
		i18n.changeLanguage(language);
	}



  return i18n;
};

export default i18n;
