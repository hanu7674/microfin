import React from 'react';
import { useSelector } from 'react-redux';
import { CustomProvider } from 'rsuite';
import getLocale from './RsuiteLocale';

const WithLocaleProvider = ({ children }) => {
  const settings = useSelector(state => state.generalSettings?.settings);
  const locale = React.useMemo(() => getLocale(settings?.language), [settings?.language]);
  const currency = settings?.currency || 'INR';

  return <CustomProvider currency={currency} locale={locale}>{children}</CustomProvider>;
};

export default WithLocaleProvider;   