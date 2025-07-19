import React from 'react';
import { Panel, Stack, FlexboxGrid, IconButton, Tooltip } from 'rsuite';
import { FaEllipsisV, FaChartLine, FaChartBar } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const ChartSection = ({ charts = null }) => {
  const { theme } = useTheme();
  const { cardBg, textMain, borderColor, shadow, muted } = getThemeVars(theme);

  // Default chart data
  const defaultCharts = [
    {
      title: 'Profit & Loss Trend',
      type: 'line',
      icon: <FaChartLine />,
      description: 'Line Chart - Profit/Loss Over Time',
      placeholder: 'Chart placeholder for profit/loss trend analysis'
    },
    {
      title: 'Cash Flow Analysis',
      type: 'bar',
      icon: <FaChartBar />,
      description: 'Bar Chart - Cash Flow by Month',
      placeholder: 'Chart placeholder for cash flow analysis'
    }
  ];

  const chartData = charts || defaultCharts;

  return (
    <FlexboxGrid>
      {chartData.map((chart, index) => (
        <FlexboxGrid.Item key={index} colspan={12} style={{ padding: '0 8px' }}>
          <Panel
            style={{
              background: cardBg,
              border: `1px solid ${borderColor}`,
              boxShadow: shadow,
              borderRadius: 8,
              minHeight: '400px'
            }}
          >
            <Stack justifyContent="space-between" alignItems="center" style={{ marginBottom: 24 }}>
              <h3 style={{ 
                fontSize: 18, 
                fontWeight: 600, 
                margin: 0, 
                color: textMain 
              }}>
                {chart.title}
              </h3>
              <Tooltip title="Chart options">
                <IconButton 
                  icon={<FaEllipsisV />} 
                  size="sm" 
                  appearance="subtle"
                  style={{ color: muted }}
                />
              </Tooltip>
            </Stack>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '300px',
              color: muted,
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: 48,
                marginBottom: 16,
                color: muted
              }}>
                {chart.icon}
              </div>
              <div style={{
                fontSize: 16,
                fontWeight: 500,
                marginBottom: 8,
                color: textMain
              }}>
                {chart.description}
              </div>
              <div style={{
                fontSize: 14,
                color: muted,
                maxWidth: '300px',
                lineHeight: 1.5
              }}>
                {chart.placeholder}
              </div>
            </div>
          </Panel>
        </FlexboxGrid.Item>
      ))}
    </FlexboxGrid>
  );
};

export default ChartSection; 