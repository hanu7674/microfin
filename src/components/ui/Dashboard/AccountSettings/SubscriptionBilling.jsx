import React from 'react';
import { Stack, Grid, Row, Col, Panel, Button, Tag } from 'rsuite';
import { FaCreditCard, FaDownload, FaDesktop, FaMobile } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const SubscriptionBilling = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor, success } = getThemeVars(theme);

  const billingHistory = [
    {
      plan: 'Professional Plan',
      date: 'December 15, 2024',
      amount: '$29.00'
    },
    {
      plan: 'Professional Plan',
      date: 'November 15, 2024',
      amount: '$29.00'
    },
    {
      plan: 'Professional Plan',
      date: 'October 15, 2024',
      amount: '$29.00'
    },
    {
      plan: 'Professional Plan',
      date: 'September 15, 2024',
      amount: '$29.00'
    }
  ];

  return (
    <div style={{ marginBottom: 32 }}>
      <Panel
        style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: 8,
          boxShadow: shadow
        }}
      >
        <div style={{
          fontSize: 18,
          fontWeight: 600,
          margin: 0,
          marginBottom: 24,
          color: cardText,
          padding: '10px 16px',
          borderBottom: `3px solid ${cardBorderBottomColor}`,
          borderBottomWidth: 1
        }}>
          Subscription & Billing
        </div>

        <div style={{ padding: '0 16px 16px' }}>
          {/* Subscription Details */}
          <div style={{ marginBottom: 32 }}>
            <Stack justifyContent="space-between" alignItems="center" style={{ marginBottom: 16 }}>
              <div>
                <div style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: cardText,
                  marginBottom: 4
                }}>
                  Professional Plan
                </div>
                <div style={{
                  fontSize: 14,
                  color: cardText,
                  opacity: 0.8,
                  marginBottom: 4
                }}>
                  $29/month • Billed monthly
                </div>
                <div style={{
                  fontSize: 12,
                  color: cardText,
                  opacity: 0.7
                }}>
                  Next billing date: January 15, 2025
                </div>
              </div>
              <Stack spacing={8}>
                <Button appearance="ghost" size="sm">
                  Change Plan
                </Button>
                <Button appearance="ghost" size="sm" color="red">
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </div>

          {/* Payment Method */}
          <div style={{ marginBottom: 32 }}>
            <div style={{
              fontSize: 16,
              fontWeight: 600,
              color: cardText,
              marginBottom: 16
            }}>
              Payment Method
            </div>
            <Stack justifyContent="space-between" alignItems="center" style={{
              padding: '16px',
              border: `1px solid ${borderColor}`,
              borderRadius: 6,
              background: 'transparent'
            }}>
              <Stack alignItems="center" spacing={12}>
                <FaCreditCard style={{ fontSize: 20, color: '#1a1a1a' }} />
                <div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: cardText,
                    marginBottom: 2
                  }}>
                    VISA •••• •••• 4567
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: cardText,
                    opacity: 0.7
                  }}>
                    Expires 12/26
                  </div>
                </div>
              </Stack>
              <Button appearance="ghost" size="sm">
                Update
              </Button>
            </Stack>
          </div>

          {/* Billing History */}
          <div>
            <div style={{
              fontSize: 16,
              fontWeight: 600,
              color: cardText,
              marginBottom: 16
            }}>
              Billing History
            </div>
            <Stack direction="column" spacing={12}>
              {billingHistory.map((item, index) => (
                <Stack key={index} justifyContent="space-between" alignItems="center" style={{
                  padding: '12px 0',
                  borderBottom: index < billingHistory.length - 1 ? `1px solid ${borderColor}` : 'none'
                }}>
                  <div>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: cardText,
                      marginBottom: 2
                    }}>
                      {item.plan}
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: cardText,
                      opacity: 0.7
                    }}>
                      {item.date}
                    </div>
                  </div>
                  <Stack alignItems="center" spacing={12}>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: cardText
                    }}>
                      {item.amount}
                    </div>
                    <Button appearance="ghost" size="xs">
                      <FaDownload style={{ marginRight: 4 }} />
                      Download
                    </Button>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default SubscriptionBilling; 