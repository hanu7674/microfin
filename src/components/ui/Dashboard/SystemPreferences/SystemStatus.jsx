import React from 'react';
import { Stack, Panel } from 'rsuite';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const SystemStatus = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);

  const systemStatus = [
    {
      service: 'Database',
      status: 'Online',
      color: '#28a745'
    },
    {
      service: 'API Status',
      status: 'Active',
      color: '#28a745'
    },
    {
      service: 'Backup',
      status: 'Pending',
      color: '#ffc107'
    }
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
          marginBottom: 24,
          color: cardText,
          padding: '10px 16px',
          borderBottom: `3px solid ${cardBorderBottomColor}`,
          borderBottomWidth: 1
        }}>
          System Status
        </div>

        <div style={{ padding: '0 16px 16px' }}>
          <Stack direction="column" spacing={12} alignItems='stretch'>
            {systemStatus.map((item, index) => (
              <Stack key={index} justifyContent="space-between" alignItems="center" style={{
                padding: '12px 0'
              }}>
                <div style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: cardText
                }}>
                  {item.service}
                </div>
                <Stack alignItems="center" spacing={8}>
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: item.color
                  }} />
                  <div style={{
                    fontSize: 14,
                    color: cardText,
                    fontWeight: 500
                  }}>
                    {item.status}
                  </div>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </div>
      </Panel>
    </div>
  );
};

export default SystemStatus; 