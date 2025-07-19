import React from 'react';
import { SelectPicker } from 'rsuite';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const RevenueTrend = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);

  const timeOptions = [
    { label: 'Last 6 months', value: '6months' },
    { label: 'Last 3 months', value: '3months' },
    { label: 'Last 12 months', value: '12months' },
    { label: 'This year', value: 'thisyear' }
  ];

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
            Revenue Trend
          </h3>
          <SelectPicker
            data={timeOptions}
            defaultValue="6months"
            style={{ width: '150px' }}
            size="sm"
          />
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
            Revenue Chart Visualization
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueTrend; 