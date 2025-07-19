import React from 'react';
import { Stack, Grid, Row, Col, Panel } from 'rsuite';
import { FaTicketAlt, FaQuestionCircle, FaPhone, FaCheckCircle, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const SupportOverview = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, success, warning, danger, info } = getThemeVars(theme);

  const supportStats = [
    {
      title: "Total Tickets",
      value: "24",
      change: "+12% from last week",
      changeType: "positive",
      icon: <FaTicketAlt style={{ color: info }} />,
      color: info
    },
    {
      title: "Open Queries",
      value: "8",
      change: "-3% from last week",
      changeType: "negative",
      icon: <FaQuestionCircle style={{ color: warning }} />,
      color: warning
    },
    {
      title: "Callback Requests",
      value: "5",
      change: "+2 from yesterday",
      changeType: "positive",
      icon: <FaPhone style={{ color: success }} />,
      color: success
    },
    {
      title: "Resolved Issues",
      value: "156",
      change: "+18% this month",
      changeType: "positive",
      icon: <FaCheckCircle style={{ color: success }} />,
      color: success
    }
  ];

  return (
    <div style={{ marginBottom: 32 }}>
      <Grid fluid>
        <Row>
          {supportStats.map((stat, index) => (
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
                      opacity: 0.8,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}>
                      {stat.icon}
                      {stat.title}
                    </div>
                    <div style={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: cardText
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: 14,
                      color: stat.changeType === 'positive' ? success : danger,
                      fontWeight: 500
                    }}>
                      {stat.change}
                    </div>
                  </Stack>
                  <div style={{
                    fontSize: 24,
                    color: stat.color,
                    opacity: 0.2
                  }}>
                    {stat.icon}
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

export default SupportOverview; 