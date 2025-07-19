import React from 'react';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const LoanSummary = ({ data = null }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, cardBorderBottomColor } = getThemeVars(theme);

  // Default loan summary data
  const defaultData = [
    {
      label: 'Total Borrowed',
      value: '₹2,50,000'
    },
    {
      label: 'Amount Paid',
      value: '₹65,000'
    },
    {
      label: 'Outstanding',
      value: '₹1,85,000'
    },
    {
      label: 'Interest Paid',
      value: '₹8,500'
    },
    {
      label: 'Credit Score',
      value: '750'
    }
  ];

  const summaryData = data || defaultData;

  return (
    <div
      style={{
        background: cardBg,
        color: cardText,
        border: `1px solid ${borderColor}`,
        boxShadow: shadow,
        borderRadius: 8,
        paddingBottom: '15px',
        marginBottom: 24
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
        Loan Summary
      </h3>
      <div style={{ padding: '0% 5%' }}>
        {summaryData.map((item, index) => (
          <>
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: index == summaryData.length -2  ? `1px solid ${muted}` : 'none'
            }}
          >
             <div style={{
              fontSize: 14,
              fontWeight: 500,
              color: cardText
            }}>
              {item.label}
            </div>
            <div style={{
              fontSize: 16,
              fontWeight: 700,
              color: cardText
            }}>
              {item.value}
            </div>
          </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default LoanSummary; 