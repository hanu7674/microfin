import React from 'react';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const BusinessInsights = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);

  const insights = [
    {
      title: 'Peak Hours',
      description: '2 PM - 6 PM generates 40% of daily revenue',
      color: '#4CAF50'
    },
    {
      title: 'Customer Loyalty',
      description: '65% of customers are repeat buyers',
      color: '#2196F3'
    },
    {
      title: 'Seasonal Trend',
      description: '15% increase expected in Q4',
      color: '#FF9800'
    }
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
        <h3 style={{
          fontSize: 18,
          fontWeight: 600,
          margin: 0,
          marginBottom: 20,
          color: cardText,
          padding: '10px 16px',
          borderBottom: `3px solid ${cardBorderBottomColor}`,
          borderBottomWidth: 1
        }}>
          Business Insights
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {insights.map((insight, index) => (
            <div
              key={index}
              style={{
                padding: '16px',
                border: `1px solid ${borderColor}`,
                borderRadius: 6,
                background: 'transparent',
                borderLeft: `4px solid ${insight.color}`
              }}
            >
              <div style={{
                fontSize: 14,
                fontWeight: 600,
                color: cardText,
                marginBottom: 4
              }}>
                {insight.title}
              </div>
              <div style={{
                fontSize: 12,
                color: cardText,
                opacity: 0.8
              }}>
                {insight.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessInsights; 