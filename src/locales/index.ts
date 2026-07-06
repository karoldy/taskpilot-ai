import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import convertedEN from '@/locales/converted_en.json';
import convertedSC from '@/locales/converted_sc.json';
import convertedTC from '@/locales/converted_tc.json';

const initialLocale = localStorage.getItem('locale') ?? 'tc';

const resources = {
  en: {
    translation: {
      en: 'English',
      sc: '简',
      tc: '繁',
      en_thumbnail: 'Eng',
      sc_thumbnail: '简',
      tc_thumbnail: '繁',
      A: 'Normal',
      AA: 'Large',
      AAA: 'Extra Large',
      ...convertedEN,
      web_notification_cta_download_report: 'Download Report',
      web_config_setting_maintenance_template_title: 'System maintenance notification: \n',
      web__cta_donwload: 'Download',
      web_download_page_title: 'Download WIS to Manage Tasks & Assign Staff',
      web_download_page_footer_information: 'Access to Information',
      web_download_page_footer_airport_authority_bylaw: 'Airport Authority Bylaw',
      web_download_page_footer_disclaimer: 'Disclaimer',
      web_download_page_footer_privacy_policy: 'Privacy Policy',
      web_download_page_footer_terms_of_use: 'Terms of Use',
      web_download_page_footer__accessibility_statement: 'Accessibility Statement',
      web_download_page_checkbox_i_agree: 'I Accept',
      web_download_page_cta_ios_version: 'Download iOS Ver',
      web_download_page_cta_aos_version: 'Download Android Ver',
    },
  },
  sc: {
    translation: {
      en: 'English',
      sc: '简体中文',
      tc: '繁體中文',
      en_thumbnail: 'Eng',
      sc_thumbnail: '简',
      tc_thumbnail: '繁',
      A: '正常',
      AA: '大',
      AAA: '特大',
      ...convertedSC,
      web_notification_cta_download_report: '下載報告',
      web_config_setting_maintenance_template_title: '系統維護通知:\n',
      web__cta_donwload: '下載',
      web_download_page_title: '下載 WIS 以管理任務及分配人手',
      web_download_page_footer_information: '公開資料',
      web_download_page_footer_airport_authority_bylaw: '《機場管理局附例》',
      web_download_page_footer_disclaimer: '免責聲明',
      web_download_page_footer_privacy_policy: '私隱政策',
      web_download_page_footer_terms_of_use: '使用條款',
      web_download_page_footer__accessibility_statement: '無障礙瀏覽聲明',
      web_download_page_checkbox_i_agree: '我同意',
      web_download_page_cta_ios_version: '下載 iOS 版',
      web_download_page_cta_aos_version: '下載 Android 版',
    },
  },
  tc: {
    translation: {
      en: 'English',
      sc: '简体中文',
      tc: '繁體中文',
      en_thumbnail: 'Eng',
      sc_thumbnail: '简',
      tc_thumbnail: '繁',
      A: '正常',
      AA: '大',
      AAA: '特大',
      ...convertedTC,
      web_notification_cta_download_report: '下載報告',
      web_config_setting_maintenance_template_title: '系統維護通知:\n',
      web__cta_donwload: '下載',
      web_download_page_title: '下載 WIS 以管理任務及分配人手',
      web_download_page_footer_information: '公開資料',
      web_download_page_footer_airport_authority_bylaw: '《機場管理局附例》',
      web_download_page_footer_disclaimer: '免責聲明',
      web_download_page_footer_privacy_policy: '私隱政策',
      web_download_page_footer_terms_of_use: '使用條款',
      web_download_page_footer__accessibility_statement: '無障礙瀏覽聲明',
      web_download_page_checkbox_i_agree: '我同意',
      web_download_page_cta_ios_version: '下載 iOS 版',
      web_download_page_cta_aos_version: '下載 Android 版',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: initialLocale,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
