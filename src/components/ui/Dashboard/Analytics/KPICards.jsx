import React from 'react';
import { Stack, Grid, Row, Col, Panel } from 'rsuite';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { FaDollarSign, FaUsers, FaChartLine, FaQuestionCircle, FaRupeeSign } from 'react-icons/fa';

const KPICards = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, success, danger, info, warning } = getThemeVars(theme);

  const kpiCards = [
    {
      title: "Total Revenue",
      value: "₹45,678",
      change: "+12.5% from last month",
      changeType: "positive",
      icon: <FaRupeeSign style={{ color: success }} />,
      color: success
    },
    {
      title: "Active Customers",
      value: "234",
      change: "+8.2% from last month",
      changeType: "positive",
      icon: <FaUsers style={{ color: info }} />,
      color: info
    },
    {
      title: "Avg Transaction",
      value: "₹195",
      change: "-3.1% from last month",
      changeType: "negative",
      icon: <FaChartLine style={{ color: warning }} />,
      color: warning
    },
    {
      title: "Growth Rate",
      value: "18.7%",
      change: "+2.4% from last month",
      changeType: "positive",
      icon: <FaQuestionCircle style={{ color: info }} />,
      color: info
    }
  ];

  return (
    <div style={{ marginBottom: 32 }}>
      <Grid fluid>
        <Row>
          {kpiCards.map((card, index) => (
            <Col key={index} xs={24} sm={12} md={12} lg={6} xl={6}  style={{marginBottom: 10}}>
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
                      fontSize: 14,
                      color: card.changeType === 'positive' ? success : danger,
                      fontWeight: 500
                    }}>
                      {card.change}
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

export default KPICards; 