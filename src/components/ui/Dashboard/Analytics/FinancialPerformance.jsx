import React, { useState } from 'react';
import { Stack, Grid, Row, Col, Panel, Button } from 'rsuite';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

// Accepts a 'data' prop: { monthly, quarterly, yearly }
const FinancialPerformance = ({ data = {} }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);
  const [activeTab, setActiveTab] = useState('Quarterly');

  const renderFinancialMetrics = (metrics) => (
    <Grid fluid>
      <Row>
        <Col xs={24} sm={8}>
          <div style={{ textAlign: 'center', padding: '16px' }}>
            <div style={{
              fontSize: 12,
              color: cardText,
              opacity: 0.8,
              marginBottom: 4
            }}>
              Total Income
            </div>
            <div style={{
              fontSize: 20,
              fontWeight: 700,
              color: cardText,
              marginBottom: 4
            }}>
              {metrics?.totalIncome ?? '-'}
            </div>
            <div style={{
              fontSize: 12,
              color: '#4CAF50',
              fontWeight: 500
            }}>
              {metrics?.incomeChange ?? ''}
            </div>
          </div>
        </Col>
        <Col xs={24} sm={8}>
          <div style={{ textAlign: 'center', padding: '16px' }}>
            <div style={{
              fontSize: 12,
              color: cardText,
              opacity: 0.8,
              marginBottom: 4
            }}>
              Total Expenses
            </div>
            <div style={{
              fontSize: 20,
              fontWeight: 700,
              color: cardText,
              marginBottom: 4
            }}>
              {metrics?.totalExpenses ?? '-'}
            </div>
            <div style={{
              fontSize: 12,
              color: '#FF9800',
              fontWeight: 500
            }}>
              {metrics?.expensesChange ?? ''}
            </div>
          </div>
        </Col>
        <Col xs={24} sm={8}>
          <div style={{ textAlign: 'center', padding: '16px' }}>
            <div style={{
              fontSize: 12,
              color: cardText,
              opacity: 0.8,
              marginBottom: 4
            }}>
              Net Profit
            </div>
            <div style={{
              fontSize: 20,
              fontWeight: 700,
              color: cardText,
              marginBottom: 4
            }}>
              {metrics?.netProfit ?? '-'}
            </div>
            <div style={{
              fontSize: 12,
              color: '#4CAF50',
              fontWeight: 500
            }}>
              {metrics?.profitChange ?? ''}
            </div>
          </div>
        </Col>
      </Row>
    </Grid>
  );

  const hasData = data && (data.monthly || data.quarterly || data.yearly);

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
        <Stack justifyContent='space-between' alignItems='center' style={{
          marginBottom: 20,
          padding: '10px 16px',
          borderBottom: `3px solid ${cardBorderBottomColor}`,
          borderBottomWidth: 1
        }}>
          <div style={{
            fontSize: 18,
            fontWeight: 600,
            color: cardText
          }}>
            Financial Performance
          </div>
          <div>
            {['Monthly', 'Quarterly', 'Yearly'].map((item, index) => (
              <Button key={index} style={{
                fontSize: 12,
                color: cardText,
                opacity: 0.8,
                marginRight: 5,
              }}
              active={activeTab === item}
              onClick={() => setActiveTab(item)}>
                {item}
              </Button>
            ))}
          </div>
        </Stack>
        <div style={{ padding: '0 16px 16px' }}>
          {!hasData ? (
            <div style={{ textAlign: 'center', color: '#666', fontSize: 16, marginTop: 16 }}>
              No financial performance data available.
            </div>
          ) : (
            activeTab === 'Monthly' ? renderFinancialMetrics(data.monthly) :
            activeTab === 'Quarterly' ? renderFinancialMetrics(data.quarterly) :
            renderFinancialMetrics(data.yearly)
          )}
        </div>
      </Panel>
    </div>
  );
};

export default FinancialPerformance; 