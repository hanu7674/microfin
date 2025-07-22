import React from 'react';
import { FlexboxGrid, Panel } from 'rsuite';
import { useTheme } from '../../Theme/theme';
import { getThemeVars } from '../../Theme/themeVars';

const ChartsSection = ({ data = null }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted } = getThemeVars(theme);

  // Generate charts based on available data
  const generateCharts = (dashboardData) => {
    const charts = [];
    
    // Always show loan portfolio overview
    charts.push({
      title: 'Loan Portfolio Overview',
      description: 'Chart: Monthly Loan Distribution',
      hasData: dashboardData?.activeLoans > 0
    });
    
    // Always show payment trends
    charts.push({
      title: 'Payment Trends',
      description: 'Chart: Payment Collection Trends',
      hasData: dashboardData?.activeLoans > 0
    });
    
    // Show revenue overview if there's revenue data
    if (dashboardData?.totalRevenue > 0) {
      charts.push({
        title: 'Revenue Overview',
        description: 'Chart: Monthly Revenue Trends',
        hasData: true
      });
    }
    
    // Show client growth if there are clients
    if (dashboardData?.totalClients > 0) {
      charts.push({
        title: 'Client Growth',
        description: 'Chart: Client Acquisition Trends',
        hasData: true
      });
    }
    
    return charts;
  };

  const charts = generateCharts(data);

  return (
    <div>
      <FlexboxGrid>
        {charts.map((chart, index) => (
          <FlexboxGrid.Item key={index} colspan={12} style={{ padding: '0 8px' }}>
            <Panel 
              style={{ 
                background: cardBg, 
                color: cardText, 
                border: `1px solid ${borderColor}`,
                boxShadow: shadow,
                borderRadius: 8,
                padding: '24px',
                minHeight: '300px'
              }}
            >
              <div style={{ marginBottom: 16 }}>
                <h3 style={{ 
                  fontSize: 18, 
                  fontWeight: 600, 
                  margin: 0, 
                  marginBottom: 8,
                  color: cardText
                }}>
                  {chart.title}
                </h3>
                <p style={{ 
                  fontSize: 14, 
                  color: muted, 
                  margin: 0 
                }}>
                  {chart.description}
                </p>
              </div>
              
              {/* Chart Content */}
              {chart.hasData ? (
                <div style={{
                   height: '200px',
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: muted,
                  fontSize: 16,
                  fontWeight: 500
                }}>
                  Chart Placeholder
                </div>
              ) : (
                <div style={{
                   height: '200px',
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: muted,
                  fontSize: 14,
                  textAlign: 'center',
                  padding: '20px'
                }}>
                  <div>
                    <div style={{ marginBottom: 8, fontWeight: 500 }}>
                      No data available
                    </div>
                    <div style={{ fontSize: 12, opacity: 0.8 }}>
                      Start adding loans to see charts
                    </div>
                  </div>
                </div>
              )}
            </Panel>
          </FlexboxGrid.Item>
        ))}
      </FlexboxGrid>
    </div>
  );
};

export default ChartsSection; 