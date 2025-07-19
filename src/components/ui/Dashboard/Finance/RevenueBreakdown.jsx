import React from 'react';
import { Panel, Stack } from 'rsuite';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const RevenueBreakdown = ({ data = null }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, cardBorderBottomColor } = getThemeVars(theme);

  // Default revenue breakdown data
  const defaultData = [
    {
      name: 'Loan Interest',
      amount: '₹78,420',
      percentage: '62.9%'
    },
    {
      name: 'Service Fees',
      amount: '₹32,160',
      percentage: '25.8%'
    },
    {
      name: 'Investment Returns',
      amount: '₹14,000',
      percentage: '11.3%'
    }
  ];

  const revenueData = data || defaultData;

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
        Revenue Breakdown
      </h3>
      <div style={{padding: '0% 5%'}}>
      {revenueData.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 16,
            paddingBottom: 12,
            borderBottom: index < revenueData.length - 1 ? `1px solid ${muted}20` : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: muted,
              flexShrink: 0
            }} />
            <div>
              <div style={{ 
                fontSize: 14, 
                fontWeight: 500, 
                color: cardText,
                marginBottom: 4
              }}>
                {item.name}
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ 
              fontSize: 16, 
              fontWeight: 700, 
              color: cardText,
              marginBottom: 2
            }}>
              {item.amount}
            </div>
            <div style={{ 
              fontSize: 12, 
              color: muted,
              fontWeight: 500
            }}>
              {item.percentage}
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default RevenueBreakdown; 