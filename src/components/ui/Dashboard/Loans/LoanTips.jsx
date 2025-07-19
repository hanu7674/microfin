import React from 'react';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const LoanTips = ({ data = null }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, cardBorderBottomColor } = getThemeVars(theme);

  // Default loan tips data
  const defaultData = [
    {
      title: 'Pay Early',
      description: 'Making payments before due date can improve your credit score'
    },
    {
      title: 'Track Progress',
      description: 'Regular monitoring helps maintain good financial health'
    }
  ];

  const tipsData = data || defaultData;

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
        Loan Tips
      </h3>
      <div style={{ padding: '0% 5%' }}>
        {tipsData.map((tip, index) => (
          <div
            key={index}
            style={{
              marginBottom: 16,
              padding: '12px',
              border: `1px solid ${borderColor}`,
              borderRadius: 6,
              backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'
            }}
          >
            <div style={{
              fontSize: 14,
              fontWeight: 600,
              color: cardText,
              marginBottom: 6
            }}>
              {tip.title}
            </div>
            <div style={{
              fontSize: 12,
              color: muted,
              lineHeight: 1.4
            }}>
              {tip.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoanTips; 