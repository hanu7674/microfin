import React, { useState } from 'react';
import { Stack, Grid, Row, Col, Panel, Tabs, Button } from 'rsuite';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const FinancialPerformance = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);
  
  const [activeTab, setActiveTab] = useState('quarterly');

  const financialData = {
    monthly: {
      totalIncome: '₹45,678',
      totalExpenses: '₹32,456',
      netProfit: '₹13,222',
      incomeChange: '+15% vs last month',
      expensesChange: '+8% vs last month',
      profitChange: '+22% vs last month'
    },
    quarterly: {
      totalIncome: '₹1,23,456',
      totalExpenses: '₹87,654',
      netProfit: '₹35,802',
      incomeChange: '+18% vs last quarter',
      expensesChange: '+12% vs last quarter',
      profitChange: '+25% vs last quarter'
    },
    yearly: {
      totalIncome: '₹4,56,789',
      totalExpenses: '₹3,21,456',
      netProfit: '₹1,35,333',
      incomeChange: '+28% vs last year',
      expensesChange: '+15% vs last year',
      profitChange: '+35% vs last year'
    }
  };

  const renderFinancialMetrics = (data) => (
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
              {data.totalIncome}
            </div>
            <div style={{
              fontSize: 12,
              color: '#4CAF50',
              fontWeight: 500
            }}>
              {data.incomeChange}
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
              {data.totalExpenses}
            </div>
            <div style={{
              fontSize: 12,
              color: '#FF9800',
              fontWeight: 500
            }}>
              {data.expensesChange}
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
              {data.netProfit}
            </div>
            <div style={{
              fontSize: 12,
              color: '#4CAF50',
              fontWeight: 500
            }}>
              {data.profitChange}
            </div>
          </div>
        </Col>
      </Row>
    </Grid>
  );

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
            {
              ['Monthly', 'Quarterly', 'Yearly'].map((item, index) => (
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
              ))
            }
          </div>
          
        </Stack>
        
        <div style={{ padding: '0 16px 16px' }}>
          {activeTab === 'Monthly' && renderFinancialMetrics(financialData.monthly)}
          {activeTab === 'Quarterly' && renderFinancialMetrics(financialData.quarterly)}
          {activeTab === 'Yearly' && renderFinancialMetrics(financialData.yearly)}
        </div>
      </Panel>
    </div>
  );
};

export default FinancialPerformance; 