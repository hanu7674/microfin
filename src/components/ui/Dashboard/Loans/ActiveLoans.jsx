import React from 'react';
import { Tag, Progress } from 'rsuite';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const ActiveLoans = ({ data = null }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, cardBorderBottomColor } = getThemeVars(theme);

  // Default active loans data
  const defaultData = [
    {
      id: 'BEL001',
      name: 'Business Expansion Loan',
      principalAmount: '₹2,00,000',
      interestRate: '12% p.a.',
      tenure: '24 months',
      progress: 25, // 6/24 payments
      paymentsCompleted: 6,
      totalPayments: 24,
      status: 'Active'
    },
    {
      id: 'EPL002',
      name: 'Equipment Purchase Loan',
      principalAmount: '₹50,000',
      interestRate: '10% p.a.',
      tenure: '12 months',
      progress: 67, // 8/12 payments
      paymentsCompleted: 8,
      totalPayments: 12,
      status: 'Active'
    }
  ];

  const loansData = data || defaultData;

  return (
    <div
      style={{
        background: cardBg,
        color: cardText,
        border: `1px solid ₹{borderColor}`,
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
        Active Loans
      </h3>
      <div style={{ padding: '0% 5%' }}>
        {loansData.map((loan, index) => (
          <div
            key={index}
            style={{
              marginBottom: 20,
              padding: '16px',
              border: `1px solid ${borderColor}`,
              borderRadius: 8,
              backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 12
            }}>
              <div>
                <div style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: cardText,
                  marginBottom: 4
                }}>
                  {loan.name}
                </div>
                <div style={{
                  fontSize: 12,
                  color: muted,
                  marginBottom: 8
                }}>
                  Loan ID: #{loan.id}
                </div>
              </div>
              <Tag color="green" size="sm">
                {loan.status}
              </Tag>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
              marginBottom: 16
            }}>
              <div>
                <div style={{
                  fontSize: 12,
                  color: muted,
                  marginBottom: 2
                }}>
                  Principal Amount
                </div>
                <div style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: cardText
                }}>
                  {loan.principalAmount}
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: 12,
                  color: muted,
                  marginBottom: 2
                }}>
                  Interest Rate
                </div>
                <div style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: cardText
                }}>
                  {loan.interestRate}
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: 12,
                  color: muted,
                  marginBottom: 2
                }}>
                  Tenure
                </div>
                <div style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: cardText
                }}>
                  {loan.tenure}
                </div>
              </div>
            </div>

            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8
              }}>
                <div style={{
                  fontSize: 12,
                  color: muted
                }}>
                  Repayment Progress
                </div>
                <div style={{
                  fontSize: 12,
                  color: cardText,
                  fontWeight: 500
                }}>
                  {loan.paymentsCompleted}/{loan.totalPayments} payments
                </div>
              </div>
              <Progress.Line
                percent={loan.progress}
                strokeColor="#4CAF50"
                showInfo={false}
                style={{ height: 8 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveLoans; 