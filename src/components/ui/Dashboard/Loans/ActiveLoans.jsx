import React from 'react';
import { Tag, Progress } from 'rsuite';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const ActiveLoans = ({ data = null }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);

  // Use processed loan data
  const loansData = data && data.length > 0 ? data : [];

  // Debug logging
  console.log('ActiveLoans received data:', data);
  console.log('ActiveLoans processed data:', loansData);
  console.log('ActiveLoans data length:', loansData.length);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'green';
      case 'pending': return 'orange';
      case 'completed': return 'blue';
      case 'defaulted': return 'red';
      default: return 'default';
    }
  };

  const calculateProgress = (loan) => {
    return loan.progress || 0;
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{
        background: cardBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 8,
        boxShadow: shadow
      }}>
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
          Active Loans
        </div>

        <div style={{ padding: '0 16px 16px' }}>
          {loansData.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {loansData.map((loan, index) => (
                <div
                  key={loan.id || index}
                  style={{
                    padding: '16px',
                    border: `1px solid ${borderColor}`,
                    borderRadius: 6,
                    background: 'transparent'
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
                        {loan.displayName}
                      </div>
                      <div style={{
                        fontSize: 14,
                        color: cardText,
                        opacity: 0.7,
                        marginBottom: 8
                      }}>
                        {loan.id} • ₹{loan.displayAmount.toLocaleString()} • {loan.displayInterestRate}% p.a.
                      </div>
                    </div>
                    <Tag color={getStatusColor(loan.status)}>
                      {loan.status}
                    </Tag>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8
                  }}>
                    <div style={{
                      fontSize: 12,
                      color: cardText,
                      opacity: 0.7
                    }}>
                      {loan.paymentsCompleted || 0}/{loan.totalPayments || 0} payments completed
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: cardText,
                      opacity: 0.7
                    }}>
                      {loan.term} months
                    </div>
                  </div>
                  
                  <Progress 
                    percent={calculateProgress(loan)} 
                    status="active"
                    style={{ marginBottom: 8 }}
                  />
                  
                  <div style={{
                    fontSize: 12,
                    color: cardText,
                    opacity: 0.6
                  }}>
                    Next payment: ₹{loan.displayEMI.toLocaleString()} on {loan.nextPayment ? new Date(loan.nextPayment.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'N/A'}
                  </div>
                </div>
              ))}
            </div>
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
                No active loans
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
    </div>
  );
};

export default ActiveLoans; 