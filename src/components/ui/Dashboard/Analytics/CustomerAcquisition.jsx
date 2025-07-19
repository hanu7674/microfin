import React from 'react';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const CustomerAcquisition = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);

  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: 8,
          padding: '2%',
          boxShadow: shadow
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          padding: '10px 16px',
          borderBottom: `3px solid ${cardBorderBottomColor}`,
          borderBottomWidth: 1
        }}>
          <h3 style={{
            fontSize: 18,
            fontWeight: 600,
            margin: 0,
            color: cardText
          }}>
            Customer Acquisition
          </h3>
          <a href="#" style={{
            fontSize: 14,
            color: cardText,
            textDecoration: 'none',
            fontWeight: 500,
            opacity: 0.8
          }}>
            View Details
          </a>
        </div>
        
        <div style={{
          height: '300px',
          backgroundColor: '#f5f5f5',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dashed #ddd'
        }}>
          <div style={{
            textAlign: 'center',
            color: '#666',
            fontSize: 16
          }}>
            Customer Growth Chart
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAcquisition; 