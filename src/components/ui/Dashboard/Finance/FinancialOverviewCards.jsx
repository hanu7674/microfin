import React from 'react';
import { Panel, Stack, Grid, Col, Row, IconButton } from 'rsuite';
import { FaDollarSign, FaFileAlt, FaChartLine, FaMoneyBillWave, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { IconBase } from 'react-icons';

const FinancialOverviewCards = ({ data = null }) => {
  const { theme } = useTheme();
  const { cardBg, borderColor, shadow, muted, textMain } = getThemeVars(theme);

  // Default financial overview data
  const defaultData = [
    {
      title: 'Total Revenue',
      value: '₹124,580',
      trend: '+12.5%',
      trendType: 'positive',
      icon: <FaDollarSign />,
      color: '#10b981'
    },
    {
      title: 'Total Expenses',
      value: '₹89,240',
      trend: '+8.2%',
      trendType: 'positive',
      icon: <FaFileAlt />,
      color: '#f59e0b'
    },
    {
      title: 'Net Profit',
      value: '₹35,340',
      trend: '+18.7%',
      trendType: 'positive',
      icon: <FaChartLine />,
      color: '#3b82f6'
    },
    {
      title: 'Cash Flow',
      value: '₹42,180',
      trend: '+5.3%',
      trendType: 'positive',
      icon: <FaMoneyBillWave />,
      color: '#8b5cf6'
    }
  ];

  const financialData = data || defaultData;

  return (
    <Grid fluid style={{ marginBottom: 32 }}>
      <Row gutter={16}>
        {financialData.map((card, index) => (
          <Col key={index} md={6} lg={6} sm={12} xs={24} xl={6}>
            <Panel
              style={{
                background: cardBg,
                border: `1px solid ${borderColor}`,
                boxShadow: shadow,
                borderRadius: 12,
                padding: '5px',
                height: '140px',
                display: 'flex',
                justifyItems: 'center',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 14,
                    color: muted,
                    marginBottom: 8,
                    fontWeight: 500
                  }}>
                    {card.title}
                  </div>
                  <div style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: textMain,
                    marginBottom: 8,
                    lineHeight: 1.2
                  }}>
                    {card.value}
                  </div>
                  <div style={{
                    fontSize: 13,
                    color: card.trendType === 'positive' ? '#10b981' : '#ef4444',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}>
                    {card?.trendType === 'positive' ? (
                      <FaArrowUp />
                    ) : (<FaArrowDown />)}
                    {card.trend}
                  </div>
                </div>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  backgroundColor: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  color: '#6b7280',
                  flexShrink: 0
                }}>
                  {card.icon}
                </div>
              </div>
            </Panel>
          </Col>
        ))}
      </Row>
      
    </Grid>
  );
};

export default FinancialOverviewCards; 