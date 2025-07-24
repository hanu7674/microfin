import React, { useEffect } from 'react';
import { Stack, Panel, SelectPicker, Loader, Message } from 'rsuite';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGeneralSettings, updateGeneralSettings } from '../../../../redux/generalSettings';
 

const GeneralSettings = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);
  const dispatch = useDispatch();
  const { settings, loading, error } = useSelector(state => state.generalSettings);

  useEffect(() => {
    dispatch(fetchGeneralSettings());
  }, [dispatch]);

  const handleSettingChange = (field, value) => {
    dispatch(updateGeneralSettings({ ...settings, [field]: value }));
  };

  if (loading && !settings) return <Loader content="Loading settings..." />;
  if (error) return <Message type="error">{error}</Message>;

  const languageOptions = [
    { label: 'English (US)', value: 'en-US' },
    { label: 'English (UK)', value: 'en-GB' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Italian', value: 'it' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Russian', value: 'ru' },
    { label: 'Chinese', value: 'zh' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Korean', value: 'ko' },
    { label: 'Chinese (Traditional)', value: 'zh-TW' },
    { label: 'Chinese (Simplified)', value: 'zh-CN' },
    { label: 'Japanese (Japan)', value: 'ja-JP' },
    { label: 'Korean (South Korea)', value: 'ko-KR' },
  ];
  const timezoneOptions = [
    { label: 'Asia/Kolkata (IST)', value: 'Asia/Kolkata' },
    { label: 'America/New_York (EST)', value: 'America/New_York' },
    { label: 'Europe/London (GMT)', value: 'Europe/London' },
    { label: 'Asia/Tokyo (JST)', value: 'Asia/Tokyo' },
    { label: 'Australia/Sydney (AEDT)', value: 'Australia/Sydney' }
  ];
  const currencyOptions = [
    { label: 'INR (₹)', value: 'INR' },
    { label: 'USD ($)', value: 'USD' },
    { label: 'EUR (€)', value: 'EUR' },
    { label: 'GBP (£)', value: 'GBP' },
    { label: 'JPY (¥)', value: 'JPY' },
    { label: 'CAD ($)', value: 'CAD' },
    { label: 'AUD ($)', value: 'AUD' },
    { label: 'CHF (₣)', value: 'CHF' },
    { label: 'CNY (¥)', value: 'CNY' },
    { label: 'SEK (kr)', value: 'SEK' },
    { label: 'NOK (kr)', value: 'NOK' },
    { label: 'NZD ($)', value: 'NZD' },
  ];
  const dateFormatOptions = [
    { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
    { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
    { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
    { label: 'DD-MM-YYYY', value: 'DD-MM-YYYY' }
  ];

  return (
    <div style={{ marginBottom: 32 }}>
      <Panel style={{
        background: cardBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 8,
        boxShadow: shadow
      }}>
        <div style={{
          fontSize: 18,
          fontWeight: 600,
          margin: 0,
          marginBottom: 24,
          color: cardText,
          padding: '10px 16px',
          borderBottom: `3px solid ${cardBorderBottomColor}`,
          borderBottomWidth: 1
        }}>
          General Settings
        </div>
         <div style={{ padding: '0 16px 16px' }}>
          <Stack direction="column" spacing={16} alignItems='stretch'>
            <div>
              <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>Language</label>
              <SelectPicker
                data={languageOptions}
                value={settings?.language}
                onChange={v => handleSettingChange('language', v)}
                style={{ width: '100%' }}
                size="md"
              />
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>Time Zone</label>
              <SelectPicker
                data={timezoneOptions}
                value={settings?.timezone}
                onChange={v => handleSettingChange('timezone', v)}
                style={{ width: '100%' }}
                size="md"
              />
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>Currency</label>
              <SelectPicker
                data={currencyOptions}
                value={settings?.currency}
                onChange={v => handleSettingChange('currency', v)}
                style={{ width: '100%' }}
                size="md"
              />
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>Date Format</label>
              <SelectPicker
                data={dateFormatOptions}
                value={settings?.dateFormat}
                onChange={v => handleSettingChange('dateFormat', v)}
                style={{ width: '100%' }}
                size="md"
              />
            </div>
          </Stack>
        </div>
      </Panel>
    </div>
  );
};

export default GeneralSettings; 