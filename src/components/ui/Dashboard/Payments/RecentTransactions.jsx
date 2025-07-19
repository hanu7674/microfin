import React from 'react';
import { Table, Tag } from 'rsuite';
import { FaQrcode, FaCreditCard, FaUniversity } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const { Column, HeaderCell, Cell } = Table;

const RecentTransactions = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, success, warning, cardBorderBottomColor } = getThemeVars(theme);

  // Sample transaction data
  const transactions = [
    {
      id: '#TXN001234',
      customer: 'Rajesh Kumar',
      amount: '₹2,500',
      method: 'UPI',
      methodIcon: <FaQrcode />,
      status: 'Success',
      statusColor: success,
      date: 'Jan 15, 2025'
    },
    {
      id: '#TXN001235',
      customer: 'Priya Sharma',
      amount: '₹1,200',
      method: 'Card',
      methodIcon: <FaCreditCard />,
      status: 'Pending',
      statusColor: warning,
      date: 'Jan 15, 2025'
    },
    {
      id: '#TXN001236',
      customer: 'Amit Patel',
      amount: '₹850',
      method: 'Bank',
      methodIcon: <FaUniversity />,
      status: 'Success',
      statusColor: success,
      date: 'Jan 14, 2025'
    }
  ];

  const getStatusTag = (status, color) => (
    <Tag color={color === success ? 'green' : 'orange'} style={{ 
      backgroundColor: color === success ? '#e6f4ea' : '#fff3e0',
      color: color === success ? '#1e7e34' : '#f57c00',
      border: 'none',
      borderRadius: 12,
      padding: '4px 12px',
      fontSize: 12,
      fontWeight: 500
    }}>
      {status}
    </Tag>
  );

  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: 8,
          padding: '2%',
          boxShadow: shadow
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          padding: '10px 16px',
          borderBottom: `3px solid ${cardBorderBottomColor}`,
          borderBottomWidth: 1
        }}>
          <h3 style={{
            fontSize: 18,
            fontWeight: 600,
            margin: 0,
            color: cardText
          }}>
            Recent Transactions
          </h3>
          <a href="#" style={{
            fontSize: 14,
            color: cardText,
            textDecoration: 'none',
            fontWeight: 500,
            opacity: 0.8
          }}>
            View All
          </a>
        </div>
        
        <div style={{ margin: '2%' }}>
          <Table
            data={transactions}
            autoHeight
            rowHeight={70}
            style={{
              background: 'transparent',
              color: cardText
            }}
          >
            <Column flexGrow={1}>
              <HeaderCell style={{ color: cardText, fontWeight: 600 }}>Transaction ID</HeaderCell>
              <Cell>
                {(rowData) => (
                  <span style={{ fontWeight: 500, color: cardText }}>
                    {rowData.id}
                  </span>
                )}
              </Cell>
            </Column>

            <Column flexGrow={1}>
              <HeaderCell style={{ color: cardText, fontWeight: 600 }}>Customer</HeaderCell>
              <Cell>
                {(rowData) => (
                  <span style={{ color: cardText }}>
                    {rowData.customer}
                  </span>
                )}
              </Cell>
            </Column>

            <Column flexGrow={1}>
              <HeaderCell style={{ color: cardText, fontWeight: 600 }}>Amount</HeaderCell>
              <Cell>
                {(rowData) => (
                  <span style={{ fontWeight: 600, color: cardText }}>
                    {rowData.amount}
                  </span>
                )}
              </Cell>
            </Column>

            <Column flexGrow={1}>
              <HeaderCell style={{ color: cardText, fontWeight: 600 }}>Method</HeaderCell>
              <Cell>
                {(rowData) => (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    <span style={{ color: cardText, opacity: 0.7 }}>
                      {rowData.methodIcon}
                    </span>
                    <span style={{ color: cardText }}>
                      {rowData.method}
                    </span>
                  </div>
                )}
              </Cell>
            </Column>

            <Column flexGrow={1}>
              <HeaderCell style={{ color: cardText, fontWeight: 600 }}>Status</HeaderCell>
              <Cell>
                {(rowData) => getStatusTag(rowData.status, rowData.statusColor)}
              </Cell>
            </Column>

            <Column flexGrow={1}>
              <HeaderCell style={{ color: cardText, fontWeight: 600 }}>Date</HeaderCell>
              <Cell>
                {(rowData) => (
                  <span style={{ color: cardText, opacity: 0.8 }}>
                    {rowData.date}
                  </span>
                )}
              </Cell>
            </Column>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions; 