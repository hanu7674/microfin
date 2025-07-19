import React from 'react';
import { FlexboxGrid, Panel } from 'rsuite';
import { useTheme } from '../../Theme/theme';
import { getThemeVars } from '../../Theme/themeVars';

const ChartsSection = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted } = getThemeVars(theme);

  const charts = [
    {
      title: 'Loan Portfolio Overview',
      description: 'Chart: Monthly Loan Distribution'
    },
    {
      title: 'Payment Trends',
      description: 'Chart: Payment Collection Trends'
    }
  ];

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
              
              {/* Chart Placeholder */}
              <div style={{
                width: '100%',
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
            </Panel>
          </FlexboxGrid.Item>
        ))}
      </FlexboxGrid>
    </div>
  );
};

export default ChartsSection; 