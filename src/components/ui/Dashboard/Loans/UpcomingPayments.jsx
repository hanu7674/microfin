import React from 'react';
import { Button, Tag } from 'rsuite';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const UpcomingPayments = ({ data = null, onPayNow }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, cardBorderBottomColor, ctaBg } = getThemeVars(theme);

  // Use the processed payment data directly
  const paymentsData = data && data.length > 0 ? data : [];

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
        {paymentsData.length > 0 ? (
          paymentsData.map((payment, index) => (
            <div
              key={payment.id || index}
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
                  ₹{payment.amount?.toLocaleString() || '0'}
                </div>
                <div style={{
                  fontSize: 12,
                  color: muted,
                  marginBottom: 2
                }}>
                  Due: {payment.dueDate}
                </div>
                {payment.loanName && (
                  <div style={{
                    fontSize: 11,
                    color: muted,
                    opacity: 0.8
                  }}>
                    {payment.loanName} • Month {payment.month}
                  </div>
                )}
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
          ))
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: cardText,
            opacity: 0.7
          }}>
            <div style={{
              fontSize: 16,
              fontWeight: 500,
              marginBottom: 8
            }}>
              No upcoming payments
            </div>
            <div style={{
              fontSize: 14,
              opacity: 0.8
            }}>
              You don't have any active loans at the moment
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingPayments; 