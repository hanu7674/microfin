import React from 'react';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const PaymentDashboardHeader = () => {
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
          color: cardText,
          padding: '10px 16px',
           borderBottomWidth: 1
        }}>
          Payment Processing
        </h1>
        <p style={{ 
          fontSize: 16, 
          color: cardText,
          margin: 0,
          opacity: 0.8,
          padding: '0 16px'
        }}>
          Accept digital payments from your customers through multiple channels
        </p>
      </div>
    </div>
  );
};

export default PaymentDashboardHeader; 