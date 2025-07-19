import React from 'react';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const AccountSettingsHeader = () => {
  const { theme } = useTheme();
  const { cardText } = getThemeVars(theme);

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        marginBottom: 16
      }}>
        <h1 style={{ 
          fontSize: 28, 
          fontWeight: 700, 
          margin: 0, 
          marginBottom: 8,
          color: cardText
        }}>
          Account Settings
        </h1>
        <p style={{ 
          fontSize: 16, 
          color: cardText,
          margin: 0,
          opacity: 0.8
        }}>
          Manage your profile, security, and subscription preferences
        </p>
      </div>
    </div>
  );
};

export default AccountSettingsHeader; 