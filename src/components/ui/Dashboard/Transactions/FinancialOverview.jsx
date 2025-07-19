import React from 'react';
import { Panel, Stack, FlexboxGrid } from 'rsuite';
import { FaArrowUp, FaArrowDown, FaBalanceScale } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const FinancialOverview = ({ data = null }) => {
  const { theme } = useTheme();
  const { cardBg, borderColor, shadow, muted } = getThemeVars(theme);

  // Default financial overview data
  const defaultData = [
    {
      title: 'Total Income',
      value: '₹5,240.00',
      icon: <FaArrowUp style={{ color: '#10b981' }} />,
      color: '#10b981'
    },
    {
      title: 'Total Expenses',
      value: '₹3,180.00',
      icon: <FaArrowDown style={{ color: '#ef4444' }} />,
      color: '#ef4444'
    },
    {
      title: 'Net Balance',
      value: '₹2,060.00',
      icon: <FaBalanceScale style={{ color: '#3b82f6' }} />,
      color: '#3b82f6'
    }
  ];

  const financialData = data || defaultData;

  return (
    <FlexboxGrid style={{ marginBottom: 32 }}>
      {financialData.map((card, index) => (
        <FlexboxGrid.Item key={index} colspan={8} style={{ padding: '0 10px' }}>
          <Panel
            style={{
              background: cardBg,
              border: `1px solid ${borderColor}`,
              boxShadow: shadow,
              borderRadius: 8,
              padding: '24px'
            }}
          >
            <Stack spacing={16} alignItems="center">
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: card.color + '20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20
              }}>
                {card.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 14,
                  color: muted,
                  marginBottom: 4
                }}>
                  {card.title}
                </div>
                <div style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: card.color
                }}>
                  {card.value}
                </div>
              </div>
            </Stack>
          </Panel>
        </FlexboxGrid.Item>
      ))}
    </FlexboxGrid>
  );
};

export default FinancialOverview; 