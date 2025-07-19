import React from 'react';
import { Panel, Stack, Avatar } from 'rsuite';
import { useTheme } from '../../Theme/theme';
import { getThemeVars } from '../../Theme/themeVars';

const RecentTransactions = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted } = getThemeVars(theme);

  const transactions = [
    {
      id: 1,
      name: 'Sarah Johnson',
      type: 'Loan Payment',
      amount: '$2,500',
      date: 'Jan 15, 2025',
      status: 'completed',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Michael Chen',
      type: 'New Loan Disbursed',
      amount: '$15,000',
      date: 'Jan 14, 2025',
      status: 'completed',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      type: 'Loan Payment',
      amount: '$1,200',
      date: 'Jan 13, 2025',
      status: 'completed',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'David Wilson',
      type: 'Late Payment',
      amount: '$800',
      date: 'Jan 12, 2025',
      status: 'late',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#10b981';
      case 'late':
        return '#ef4444';
      default:
        return muted;
    }
  };

  return (
    <Panel 
      style={{ 
        background: cardBg, 
        color: cardText, 
        border: `1px solid ${borderColor}`,
        boxShadow: shadow,
        borderRadius: 8,
        padding: '24px'
      }}
    >
      <h3 style={{ 
        fontSize: 18, 
        fontWeight: 600, 
        margin: 0, 
        marginBottom: 20,
        color: cardText
      }}>
        Recent Transactions
      </h3>
      
      <Stack direction="column" spacing={16}>
        {transactions.map((transaction) => (
          <div key={transaction.id} style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: `1px solid ${borderColor}`,
            borderBottomWidth: transaction.id === transactions.length ? 0 : 1
          }}>
            <Avatar 
              src={transaction.avatar} 
              size="sm" 
              style={{ marginRight: 12 }}
            />
            
            <div style={{ flex: 1 }}>
              <div style={{ 
                fontSize: 14, 
                fontWeight: 600, 
                color: cardText,
                marginBottom: 4
              }}>
                {transaction.name}
              </div>
              <div style={{ 
                fontSize: 12, 
                color: muted 
              }}>
                {transaction.type}
              </div>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <div style={{ 
                fontSize: 14, 
                fontWeight: 600, 
                color: cardText,
                marginBottom: 4
              }}>
                {transaction.amount}
              </div>
              <div style={{ 
                fontSize: 12, 
                color: getStatusColor(transaction.status)
              }}>
                {transaction.date}
              </div>
            </div>
          </div>
        ))}
      </Stack>
    </Panel>
  );
};

export default RecentTransactions; 