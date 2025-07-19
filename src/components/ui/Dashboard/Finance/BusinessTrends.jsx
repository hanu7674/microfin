import React from 'react';
import { Panel, Stack } from 'rsuite';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const BusinessTrends = ({ data = null }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, cardBorderBottomColor } = getThemeVars(theme);

  // Default business trends data
  const defaultData = [
    {
      name: 'Active Loans',
      value: '1,247'
    },
    {
      name: 'New Clients',
      value: '89'
    },
    {
      name: 'Loan Default Rate',
      value: '2.3%'
    },
    {
      name: 'Portfolio Growth',
      value: '+15.2%'
    }
  ];

  const trendsData = data || defaultData;

  return (
    <div 
    style={{ 
      background: cardBg, 
      color: cardText, 
      border: `1px solid ${borderColor}`,
      boxShadow: shadow,
      borderRadius: 8,
      paddingBottom: '15px'
     }}
    >
      <h3 style={{ 
        fontSize: 18, 
        fontWeight: 600, 
        margin: 0, 
        padding: '10px 16px',
        marginBottom: 20,
        color: cardText,
        borderBottom: `3px solid ${cardBorderBottomColor}`,
        borderBottomWidth: 1
      }}>
        Business Trends
      </h3>
      <div style={{padding: '0% 5%'}}>

      {trendsData.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
            paddingBottom: 12,
            borderBottom: index < trendsData.length - 1 ? `1px solid ${muted}20` : 'none'
          }}
        >
          <div style={{ 
            fontSize: 14, 
            fontWeight: 500, 
            color: cardText
          }}>
            {item.name}
          </div>
          <div style={{ 
            fontSize: 16, 
            fontWeight: 700, 
            color: cardText
          }}>
            {item.value}
          </div>
        </div>
      ))}
      </div>

    </div>
  );
};

export default BusinessTrends; 