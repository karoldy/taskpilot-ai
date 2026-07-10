import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import convertedEN from '@/locales/converted_en.json';
import convertedSC from '@/locales/converted_sc.json';
import convertedTC from '@/locales/converted_tc.json';

const initialLocale = localStorage.getItem('locale') ?? 'sc';

const resources = {
  en: {
    translation: convertedEN,
  },
  sc: {
    translation: convertedSC,
  },
  tc: {
    translation: convertedTC,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: initialLocale,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
