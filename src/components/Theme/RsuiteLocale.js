import enUS from 'rsuite/locales/en_US';
import enGB from 'rsuite/locales/en_GB';
import esES from 'rsuite/locales/es_ES';
import frFR from 'rsuite/locales/fr_FR';
import deDE from 'rsuite/locales/de_DE';
import itIT from 'rsuite/locales/it_IT';
import ptBR from 'rsuite/locales/pt_BR';
import ruRU from 'rsuite/locales/ru_RU';
import zhCN from 'rsuite/locales/zh_CN';
import zhTW from 'rsuite/locales/zh_TW';
import jaJP from 'rsuite/locales/ja_JP';
import koKR from 'rsuite/locales/ko_KR';

// ...other imports

const localeMap = {

  'en-US': enUS,
  'en-GB': enGB,
  'es': esES,
  'fr': frFR,
  'de': deDE,
  'it': itIT,
  'pt': ptBR,
  'ru': ruRU,
  'zh': zhCN,
  'ja': jaJP,
  'ko': koKR,
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  'ja-JP': jaJP,
  'ko-KR': koKR,
  };
const getLocale = (locale) => {
  return localeMap[locale] || enUS;
};

export default getLocale;   