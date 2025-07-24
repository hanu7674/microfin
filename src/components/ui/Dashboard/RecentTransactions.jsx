import React, { useEffect } from 'react';
import { Panel, Table, Tag } from 'rsuite';
import { useTheme } from '../../Theme/theme';
import { getThemeVars } from '../../Theme/themeVars';
import { useTransactions } from '../../../hooks/useDataService';

const { Column, HeaderCell, Cell } = Table;

const RecentTransactions = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);
  
  const { 
    transactions, 
    loading, 
    error, 
    fetchTransactions 
  } = useTransactions();

  useEffect(() => {
    fetchTransactions({ limit: 5 }); // Fetch only recent 5 transactions
  }, [fetchTransactions]);

  const getStatusColor = (type) => {
    return type === 'income' ? 'green' : 'red';
  };

  const formatAmount = (amount, type) => {
    const formattedAmount = `₹${Math.abs(amount).toLocaleString()}`;
    return type === 'income' ? `+${formattedAmount}` : `-${formattedAmount}`;
  };

  const formatDate = (date) => {
    if (!date) return '';
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
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
          Recent Transactions
        </div>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          Loading transactions...
        </div>
      </Panel>
    );
  }

  if (error) {
    return (
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
          Recent Transactions
        </div>
        <div style={{ padding: '20px', textAlign: 'center', color: '#ef4444' }}>
          Error loading transactions: {error}
        </div>
      </Panel>
    );
  }

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
          Recent Transactions
        </div>

        <div style={{ padding: '0 16px 16px' }}>
          {transactions && transactions.length > 0 ? (
            <Table
              data={transactions}
              autoHeight
              style={{ background: 'transparent' }}
              rowHeight={50}
            >
              <Column flexGrow={1}>
                <HeaderCell>Description</HeaderCell>
                <Cell dataKey="description" />
              </Column>

              <Column flexGrow={1}>
                <HeaderCell>Category</HeaderCell>
                <Cell>
                  {(rowData) => (
                    <Tag color={getStatusColor(rowData.type)}>
                      {rowData.category}
                    </Tag>
                  )}
                </Cell>
              </Column>

              <Column flexGrow={1}>
                <HeaderCell>Amount</HeaderCell>
                <Cell>
                  {(rowData) => (
                    <span style={{
                      color: rowData.type === 'income' ? '#10b981' : '#ef4444',
                      fontWeight: 600
                    }}>
                      {formatAmount(rowData.amount, rowData.type)}
                    </span>
                  )}
                </Cell>
              </Column>

              <Column flexGrow={1}>
                <HeaderCell>Date</HeaderCell>
                <Cell>
                  {(rowData) => formatDate(rowData.date)}
                </Cell>
              </Column>
            </Table>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px 20px',
              color: cardText,
              opacity: 0.7
            }}>
              No recent transactions found
            </div>
          )}
        </div>
      </Panel>
    </div>
  );
};

export default RecentTransactions; 