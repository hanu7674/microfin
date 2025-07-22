import React from 'react';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const LoanSummary = ({ data = null }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, cardBorderBottomColor } = getThemeVars(theme);

  // Transform data to array format
  const transformDataToArray = (data) => {
    if (!data) return null;
    
    // If data is already an array, return it
    if (Array.isArray(data)) {
      return data;
    }
    
    // If data is an object, transform it to array format
    if (typeof data === 'object') {
      return [
        {
          label: 'Total Borrowed',
          value: data.totalLoanAmount ? `₹${data.totalLoanAmount.toLocaleString()}` : '₹0'
        },
        {
          label: 'Amount Paid',
          value: data.amountPaid ? `₹${data.amountPaid.toLocaleString()}` : '₹0'
        },
        {
          label: 'Outstanding',
          value: data.outstandingBalance ? `₹${data.outstandingBalance.toLocaleString()}` : '₹0'
        },
        {
          label: 'Interest Paid',
          value: data.interestPaid ? `₹${data.interestPaid.toLocaleString()}` : '₹0'
        },
        {
          label: 'Credit Score',
          value: data.creditScore ? data.creditScore.toString() : 'N/A'
        }
      ];
    }
    
    return null;
  };

  // Default loan summary data (when no loans exist)
  const defaultData = [
    {
      label: 'Total Borrowed',
      value: '₹0'
    },
    {
      label: 'Amount Paid',
      value: '₹0'
    },
    {
      label: 'Outstanding',
      value: '₹0'
    },
    {
      label: 'Interest Paid',
      value: '₹0'
    },
    {
      label: 'Credit Score',
      value: 'N/A'
    }
  ];

  const summaryData = transformDataToArray(data) || defaultData;

  // Ensure summaryData is always an array
  if (!Array.isArray(summaryData)) {
    console.warn('LoanSummary: summaryData is not an array, using default data');
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
          {defaultData.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: index === defaultData.length - 1 ? 'none' : `1px solid ${muted}`
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
          ))}
        </div>
      </div>
    );
  }

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
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: index === summaryData.length - 1 ? 'none' : `1px solid ${muted}`
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
        ))}
      </div>
    </div>
  );
};

export default LoanSummary; 