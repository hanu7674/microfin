import React from 'react';
import { Col, Grid, Panel, Row, Stack } from 'rsuite';
import { 
  FaHandHoldingUsd,
  FaUsers,
  FaFileInvoiceDollar,
  FaExclamationTriangle
} from 'react-icons/fa';
import { useTheme } from '../../Theme/theme';
import { getThemeVars } from '../../Theme/themeVars';

const FinancialOverview = ({ data = null }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted } = getThemeVars(theme);

  // Calculate realistic percentage changes based on actual data
  const calculatePercentageChange = (currentValue, previousValue) => {
    if (!previousValue || previousValue === 0) {
      return currentValue > 0 ? '+100%' : '0%';
    }
    
    const change = ((currentValue - previousValue) / previousValue) * 100;
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
  };

  // Check if we have meaningful data
  const hasData = data && (
    data.totalRevenue > 0 || 
    data.totalClients > 0 || 
    data.netProfit > 0 || 
    data.activeLoans > 0
  );

  // Use backend data or show empty state
  const overviewCards = hasData ? [
    {
      title: 'Total Loans',
      value: `₹${data.totalRevenue?.toLocaleString() || '0'}`,
      change: calculatePercentageChange(data.totalRevenue || 0, data.previousRevenue || 0),
      changeType: (data.totalRevenue || 0) >= (data.previousRevenue || 0) ? 'positive' : 'negative',
      icon: <FaHandHoldingUsd />,
      description: 'from last month',
      hasData: true
    },
    {
      title: 'Active Clients',
      value: data.totalClients?.toString() || '0',
      change: calculatePercentageChange(data.totalClients || 0, data.previousClients || 0),
      changeType: (data.totalClients || 0) >= (data.previousClients || 0) ? 'positive' : 'negative',
      icon: <FaUsers />,
      description: 'from last month',
      hasData: true
    },
    {
      title: 'Collections',
      value: `₹${data.netProfit?.toLocaleString() || '0'}`,
      change: calculatePercentageChange(data.netProfit || 0, data.previousProfit || 0),
      changeType: (data.netProfit || 0) >= (data.previousProfit || 0) ? 'positive' : 'negative',
      icon: <FaFileInvoiceDollar />,
      description: 'from last month',
      hasData: true
    },
    {
      title: 'Default Rate',
      value: `${data.overduePayments || 0}%`,
      change: calculatePercentageChange(data.overduePayments || 0, data.previousOverdue || 0),
      changeType: (data.overduePayments || 0) <= (data.previousOverdue || 0) ? 'positive' : 'negative',
      icon: <FaExclamationTriangle />,
      description: 'from last month',
      hasData: true
    }
  ] : [
    {
      title: 'Total Loans',
      value: '₹0',
      change: '0%',
      changeType: 'neutral',
      icon: <FaHandHoldingUsd />,
      description: 'No loans yet',
      hasData: false
    },
    {
      title: 'Active Clients',
      value: '0',
      change: '0%',
      changeType: 'neutral',
      icon: <FaUsers />,
      description: 'No clients yet',
      hasData: false
    },
    {
      title: 'Collections',
      value: '₹0',
      change: '0%',
      changeType: 'neutral',
      icon: <FaFileInvoiceDollar />,
      description: 'No collections yet',
      hasData: false
    },
    {
      title: 'Default Rate',
      value: '0%',
      change: '0%',
      changeType: 'neutral',
      icon: <FaExclamationTriangle />,
      description: 'No defaults yet',
      hasData: false
    }
  ];

  return (
    <div style={{ marginBottom: 32 }}>
      <Grid fluid>
        <Row>
          {overviewCards.map((card, index) => (
            <Col key={index} xs={24} sm={12} md={6}>
              <Panel
                style={{
                  background: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: 8,
                  boxShadow: shadow,
                  height: '100%',
                  opacity: card.hasData ? 1 : 0.7
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
                      fontSize: 14,
                      color: card.changeType === 'positive' ? '#10b981' : 
                             card.changeType === 'negative' ? '#ef4444' : '#6b7280',
                      fontWeight: 500
                    }}>
                      {card.change}
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: cardText,
                      opacity: 0.6
                    }}>
                      {card.description}
                    </div>
                  </Stack>
                  <div style={{
                    fontSize: 24,
                    color: cardText,
                    opacity: card.hasData ? 0.2 : 0.1
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

export default FinancialOverview;