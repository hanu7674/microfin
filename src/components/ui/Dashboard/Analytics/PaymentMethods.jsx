import React from 'react';
import { Stack, Grid, Row, Col, Panel, Progress } from 'rsuite';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const PaymentMethods = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);

  const paymentData = [
    { method: 'UPI', percentage: 45, color: '#4CAF50' },
    { method: 'Cards', percentage: 32, color: '#2196F3' },
    { method: 'Cash', percentage: 23, color: '#FF9800' }
  ];

  return (
    <div style={{ marginBottom: 32 }}>
      <Panel
        style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: 8,
          boxShadow: shadow
        }}
      >
        <div style={{
          fontSize: 18,
          fontWeight: 600,
          margin: 0,
          marginBottom: 20,
          color: cardText,
          padding: '10px 16px',
          borderBottom: `3px solid ${cardBorderBottomColor}`,
          borderBottomWidth: 1
        }}>
          Payment Methods
        </div>
        
        <Grid fluid>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div style={{
                height: '200px',
                backgroundColor: '#f5f5f5',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed #ddd'
              }}>
                <div style={{
                  textAlign: 'center',
                  color: '#666',
                  fontSize: 16
                }}>
                  Pie Chart
                </div>
              </div>
            </Col>
            
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                {}
                {paymentData.map((item, index) => (
                  <Stack key={index} justifyContent="space-between" alignItems="center" style={{ padding: '8px 0' }}>
                    <Stack alignItems="center" justifyContent="flex-start" spacing={8}>
                      <div style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: item.color
                      }} />
                      <span style={{
                        fontSize: 14,
                        color: cardText,
                        fontWeight: 500
                      }}>
                        {item.method}
                      </span>
                    </Stack>
                    <Progress.Line percent={item.percentage} status='active'  />
                     
                  </Stack>
                ))}
             </Col>
          </Row>
        </Grid>
      </Panel>
    </div>
  );
};

export default PaymentMethods; 