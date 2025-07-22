import React from 'react';
import { Stack, Grid, Row, Col, Panel, Progress } from 'rsuite';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

// Accepts a 'data' prop: array of { method, percentage, color }
const PaymentMethods = ({ data = [] }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);

  // Prepare data for recharts (convert percentage to value for Pie)
  const pieData = Array.isArray(data) && data.length > 0
    ? data.map(item => ({ name: item.method, value: item.percentage, color: item.color }))
    : [];

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
                height: '220px',
                backgroundColor: '#f5f5f5',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed #ddd',
                marginBottom: 12
              }}>
                {pieData.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#666', fontSize: 16 }}>
                    No payment method data available.
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={entry.color || '#888'} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              {pieData.length === 0 ? null : (
                pieData.map((item, index) => (
                  <Stack key={index} justifyContent="space-between" alignItems="center" style={{ padding: '8px 0' }}>
                    <Stack alignItems="center" justifyContent="flex-start" spacing={8}>
                      <div style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: item.color || '#888'
                      }} />
                      <span style={{
                        fontSize: 14,
                        color: cardText,
                        fontWeight: 500
                      }}>
                        {item.name}
                      </span>
                    </Stack>
                    <Progress.Line percent={item.value} status='active'  />
                  </Stack>
                ))
              )}
            </Col>
          </Row>
        </Grid>
      </Panel>
    </div>
  );
};

export default PaymentMethods; 