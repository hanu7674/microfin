import React from 'react';
import { Grid, Col, Row, Panel, Stack, IconButton } from 'rsuite';
import { FaFileAlt, FaCheckCircle, FaClock, FaExclamationTriangle, FaRupeeSign, FaMoneyBillWave } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const InvoiceSummaryCards = ({ data = null }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, cardBorderBottomColor } = getThemeVars(theme);

  // Use backend data or fallback to default data
  const summaryData = data ? [
    {
      title: 'Total Invoices',
      value: data.totalInvoices?.toString() || '0',
      subtitle: `${data.totalAmount ? `₹${data.totalAmount.toLocaleString()}` : '₹0'} total value`,
      icon: <FaFileAlt />,
      color: '#2196F3'
    },
    {
      title: 'Paid Invoices',
      value: data.paidInvoices?.toString() || '0',
      subtitle: `${data.paidAmount ? `₹${data.paidAmount.toLocaleString()}` : '₹0'} collected`,
      icon: <FaCheckCircle />,
      color: '#4CAF50'
    },
    {
      title: 'Pending',
      value: data.pendingInvoices?.toString() || '0',
      subtitle: `${data.pendingAmount ? `₹${data.pendingAmount.toLocaleString()}` : '₹0'} outstanding`,
      icon: <FaClock />,
      color: '#FF9800'
    },
    {
      title: 'Overdue',
      value: data.overdueInvoices?.toString() || '0',
      subtitle: 'Requires attention',
      icon: <FaExclamationTriangle />,
      color: '#F44336'
    }
  ] : [
    {
      title: 'Total Invoices',
      value: '0',
      subtitle: '₹0 total value',
      icon: <FaFileAlt />,
      color: '#2196F3'
    },
    {
      title: 'Paid Invoices',
      value: '0',
      subtitle: '₹0 collected',
      icon: <FaCheckCircle />,
      color: '#4CAF50'
    },
    {
      title: 'Pending',
      value: '0',
      subtitle: '₹0 outstanding',
      icon: <FaClock />,
      color: '#FF9800'
    },
    {
      title: 'Overdue',
      value: '0',
      subtitle: 'Requires attention',
      icon: <FaExclamationTriangle />,
      color: '#F44336'
    }
  ];

  return (
    <div style={{ marginBottom: 32 }}>
      <Grid fluid>
        <Row>
          {summaryData.map((card, index) => (
            <Col key={index} xs={24} sm={12} md={6}>
              <Panel
                style={{
                  background: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: 8,
                  boxShadow: shadow,
                  height: '100%'
                }}
              >
                <Stack justifyContent="space-between" alignItems="flex-start" style={{ marginBottom: 16 }}>
                  <Stack direction="column" spacing={8} alignItems='flex-start'>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: cardText,
                      opacity: 0.8
                    }}>
                      {card.title}
                    </div>
                    <div style={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: cardText
                    }}>
                      {card.value}
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: muted,
                      opacity: 0.8
                    }}>
                      {card.subtitle}
                    </div>
                  </Stack>
                  <div style={{
                    fontSize: 24,
                    color: card.color,
                    opacity: 0.2
                  }}>
                    {card.icon}
                  </div>
                </Stack>
              </Panel>
            </Col>
          ))}
        </Row>
      </Grid>
    </div>
  );
};

export default InvoiceSummaryCards; 