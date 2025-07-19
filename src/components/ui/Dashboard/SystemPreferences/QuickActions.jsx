import React from 'react';
import { Stack, Panel, Button } from 'rsuite';
import { FaDownload, FaUpload, FaTrash, FaChevronRight } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const QuickActions = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);

  const quickActions = [
    {
      title: 'Export Data',
      description: 'Download all your data',
      icon: <FaDownload style={{ fontSize: 16, color: '#666' }} />,
      action: () => console.log('Export data')
    },
    {
      title: 'Import Data',
      description: 'Upload data from file',
      icon: <FaUpload style={{ fontSize: 16, color: '#666' }} />,
      action: () => console.log('Import data')
    },
    {
      title: 'Clear Cache',
      description: 'Remove temporary files',
      icon: <FaTrash style={{ fontSize: 16, color: '#666' }} />,
      action: () => console.log('Clear cache')
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
          Quick Actions
        </div>

        <div style={{ padding: '0 16px 16px' }}>
          <Stack direction="column" spacing={12} alignItems='stretch'>
            {quickActions.map((action, index) => (
              <Button block
                key={index}
                appearance="ghost"
                style={{
                  justifyContent: 'space-between',
                  padding: '16px',
                  height: 'auto',
                  border: `1px solid ${borderColor}`,
                  borderRadius: 6,
                  background: 'transparent'
                }}
                onClick={action.action}
              >
                <Stack alignItems="center" spacing={12}>
                  {action.icon}
                  <div style={{ textAlign: 'left' }}>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: cardText,
                      marginBottom: 2
                    }}>
                      {action.title}
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: cardText,
                      opacity: 0.7
                    }}>
                      {action.description}
                    </div>
                  </div>
                </Stack>
                <FaChevronRight style={{ fontSize: 12, color: '#666' }} />
              </Button>
            ))}
          </Stack>
        </div>
      </Panel>
    </div>
  );
};

export default QuickActions; 