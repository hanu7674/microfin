import React from 'react';
import { Grid, Col, Row, Stack, Panel, IconButton } from 'rsuite';
import { FaRupeeSign, FaBalanceScale, FaCalendar, FaClock, FaDollarSign } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const LoanOverviewCards = ({ data = null }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, cardBorderBottomColor } = getThemeVars(theme);

  // Use backend data or fallback to default data
  const overviewData = data ? [
    {
      title: 'Total Loan Amount',
      value: `₹${data.totalLoanAmount?.toLocaleString() || '0'}`,
      icon: <FaDollarSign />,
      color: '#4CAF50'
    },
    {
      title: 'Outstanding Balance',
      value: `₹${data.outstandingBalance?.toLocaleString() || '0'}`,
      icon: <FaBalanceScale />,
      color: '#FF9800'
    },
    {
      title: 'Monthly EMI',
      value: `₹${data.monthlyEMI?.toLocaleString() || '0'}`,
      icon: <FaCalendar />,
      color: '#2196F3'
    },
    {
      title: 'Active Loans',
      value: data.activeLoans?.toString() || '0',
      icon: <FaClock />,
      color: '#9C27B0'
    }
  ] : [
    {
      title: 'Total Loan Amount',
      value: '₹0',
      icon: <FaDollarSign />,
      color: '#4CAF50'
    },
    {
      title: 'Outstanding Balance',
      value: '₹0',
      icon: <FaBalanceScale />,
      color: '#FF9800'
    },
    {
      title: 'Monthly EMI',
      value: '₹0',
      icon: <FaCalendar />,
      color: '#2196F3'
    },
    {
      title: 'Active Loans',
      value: '0',
      icon: <FaClock />,
      color: '#9C27B0'
    }
  ];

  return (
    <div style={{ marginBottom: 32 }}>
      <Grid fluid>
        <Row>
          {overviewData.map((card, index) => (
            <Col key={index} xs={24} sm={12} md={12} lg={6} xl={6} xxl={6} style={{marginBottom: 16}}>
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

export default LoanOverviewCards; 