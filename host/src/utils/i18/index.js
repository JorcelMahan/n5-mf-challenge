import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enLang from './en/en.json';
import esLang from './es/es.json';

const resources = {
  en: {
    translation: enLang,
  },
  es: {
    translation: esLang,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'es',
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
