import React from 'react';
import { Grid, Col, Row, Panel, Stack, IconButton } from 'rsuite';
import { FaFileAlt, FaCheckCircle, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const InvoiceSummaryCards = ({ data = null }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, cardBorderBottomColor } = getThemeVars(theme);

  // Default invoice summary data
  const defaultData = [
    {
      title: 'Total Invoices',
      value: '247',
      icon: <FaFileAlt />,
      color: '#2196F3'
    },
    {
      title: 'Paid Invoices',
      value: '189',
      icon: <FaCheckCircle />,
      color: '#4CAF50'
    },
    {
      title: 'Pending',
      value: '42',
      icon: <FaClock />,
      color: '#FF9800'
    },
    {
      title: 'Overdue',
      value: '16',
      icon: <FaExclamationTriangle />,
      color: '#F44336'
    }
  ];

  const summaryData = data || defaultData;

  return (
    <div style={{ marginBottom: 32 }}>
      <Grid fluid>
        <Row gutter={16}>
           
          {
            summaryData.map((card, index) => (
              <Col key={index} md={6} lg={6} sm={12} xs={24} xl={6}>
                <Panel shaded style={{backgroundColor: cardBg}}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <div >
                <div>
                  <div style={{
                  color: muted

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
                </div>
              </div>
              <div style={{
                fontSize: 28,
                fontWeight: 700,
                color: card.color,
                 
              }}>
                <IconButton circle appearance="default" color="white" icon={card.icon} disabled />
              </div>
            </Stack>

            </Panel>
              </Col>
            ))
          }
        </Row>
      </Grid>
    </div>
  );
};

export default InvoiceSummaryCards; 