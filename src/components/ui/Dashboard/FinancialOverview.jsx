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

const FinancialOverview = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted } = getThemeVars(theme);

  const overviewCards = [
    {
      title: 'Total Loans',
      value: '₹1,245,678',
      change: '+12.5%',
      changeType: 'positive',
      icon: <FaHandHoldingUsd />,
      description: 'from last month'
    },
    {
      title: 'Active Clients',
      value: '1,234',
      change: '+5.2%',
      changeType: 'positive',
      icon: <FaUsers />,
      description: 'from last month'
    },
    {
      title: 'Collections',
      value: '₹89,456',
      change: '-2.1%',
      changeType: 'negative',
      icon: <FaFileInvoiceDollar />,
      description: 'from last month'
    },
    {
      title: 'Default Rate',
      value: '3.2%',
      change: '-0.5%',
      changeType: 'negative',
      icon: <FaExclamationTriangle />,
      description: 'from last month'
    }
  ];

  return (
    <Grid fluid>
      <Row gutter={16}>
        {overviewCards.map((card, index) => (
          <Col key={index} xs={24} sm={12} md={12} lg={6} xl={6} xxl={6} style={{marginBottom: '10px'}}>
            <Panel
              style={{
                background: cardBg,
                color: cardText,
                border: `1px solid ${borderColor}`,
                boxShadow: shadow,
                borderRadius: 8,
                padding: '20px',
                height: '100%',
                display: 'flex', // Use flexbox
                flexDirection: 'column', // Stack children vertically
                justifyContent: 'space-between' // Distribute space
              }}
            >
              <Stack justifyContent="space-between" alignItems="flex-start" wrap>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 14,
                    color: muted,
                    marginBottom: 8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    {card.icon}
                    {card.title}
                  </div>
                  <div style={{
                    fontSize: 28,
                    fontWeight: 700,
                    marginBottom: 4,
                    color: cardText
                  }}>
                    {card.value}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: card.changeType === 'positive' ? '#10b981' : '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}>
                    <span style={{ fontWeight: 600 }}>{card.change}</span>
                    <span style={{ color: muted }}>{card.description}</span>
                  </div>
                </div>
              </Stack>
            </Panel>
          </Col>
        ))}
      </Row>
    </Grid>
  );
};

export default FinancialOverview;