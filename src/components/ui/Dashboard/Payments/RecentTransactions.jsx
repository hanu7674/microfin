import React from 'react';
import { Table, Tag } from 'rsuite';
import { FaQrcode, FaCreditCard, FaUniversity } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const { Column, HeaderCell, Cell } = Table;

const RecentTransactions = ({ payments = [] }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, success, warning, cardBorderBottomColor } = getThemeVars(theme);

  // Map real payment data to table rows
  const transactions = payments.map(payment => {
    // Choose icon based on method
    let methodIcon = <FaCreditCard />;
    if (payment.method === 'UPI') methodIcon = <FaQrcode />;
    if (payment.method === 'Bank') methodIcon = <FaUniversity />;
    // Status color
    let statusColor = warning;
    if (payment.status === 'Success') statusColor = success;
    if (payment.status === 'Pending') statusColor = warning;
    if (payment.status === 'Failed') statusColor = 'red';
    // Format date
    let dateStr = '';
    if (payment.date) {
      const d = payment.date.toDate ? payment.date.toDate() : new Date(payment.date);
      dateStr = d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
    return {
      id: payment.id || '',
      customer: payment.customer || payment.clientName || payment.payer || '',
      amount: payment.amount ? `₹${payment.amount.toLocaleString()}` : '',
      method: payment.method || '',
      methodIcon,
      status: payment.status || '',
      statusColor,
      date: dateStr
    };
  });

  const getStatusTag = (status) => {
    const statusMap = {
      Success: { color: 'green', bg: '#e6f4ea', text: '#1e7e34' },
      Pending: { color: 'orange', bg: '#fff3e0', text: '#f57c00' },
      Failed: { color: 'red', bg: '#fdecea', text: '#c82333' }
    };
    const { color, bg, text } = statusMap[status] || statusMap.Failed;
    return (
      <Tag color={color} style={{
        backgroundColor: bg,
        color: text,
        border: 'none',
        borderRadius: 12,
        padding: '4px 12px',
        fontSize: 12,
        fontWeight: 500
      }}>{status}</Tag>
    );
  };

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
          borderBottom: `3px solid ${cardBorderBottomColor}`
        }}>
          <h3 style={{
            fontSize: 18,
            fontWeight: 600,
            margin: 0,
            color: cardText
          }}>
            Recent Transactions (Last 10 Payments Only)
          </h3>
          
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
                {(rowData) => getStatusTag(rowData.status)}
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