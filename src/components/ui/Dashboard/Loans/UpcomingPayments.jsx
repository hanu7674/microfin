import React from 'react';
import { Button, Tag } from 'rsuite';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const UpcomingPayments = ({ data = null, onPayNow }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, cardBorderBottomColor, ctaBg } = getThemeVars(theme);

  // Default upcoming payments data
  const defaultData = [
    {
      id: 1,
      amount: '₹12,500',
      dueDate: '15 Jan 2025',
      status: 'due',
      isPayable: true
    },
    {
      id: 2,
      amount: '₹12,500',
      dueDate: '15 Feb 2025',
      status: 'upcoming',
      isPayable: false
    },
    {
      id: 3,
      amount: '₹12,500',
      dueDate: '15 Mar 2025',
      status: 'upcoming',
      isPayable: false
    }
  ];

  const paymentsData = data || defaultData;

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
        Upcoming Payments
      </h3>
      <div style={{ padding: '0% 5%' }}>
        {paymentsData.map((payment, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: index < paymentsData.length - 1 ? `1px solid ${muted}20` : 'none'
            }}
          >
            <div>
              <div style={{
                fontSize: 16,
                fontWeight: 600,
                color: cardText,
                marginBottom: 4
              }}>
                {payment.amount}
              </div>
              <div style={{
                fontSize: 12,
                color: muted
              }}>
                Due: {payment.dueDate}
              </div>
            </div>
            <div>
              {payment.isPayable ? (
                <Button
                  size="sm"
                  style={{
                    backgroundColor: ctaBg,
                    border: 'none',
                    borderRadius: 6,
                    padding: '6px 16px',
                    fontWeight: 600,
                    fontSize: 12
                  }}
                  onClick={() => onPayNow(payment)}
                >
                  Pay Now
                </Button>
              ) : (
                <Tag color="blue" size="sm">
                  Upcoming
                </Tag>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingPayments; 