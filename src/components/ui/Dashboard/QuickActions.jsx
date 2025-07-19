import React from 'react';
import { Panel, Button, Stack } from 'rsuite';
import { 
  FaUserPlus, 
  FaHandHoldingUsd, 
  FaFileAlt, 
  FaBell 
} from 'react-icons/fa';
import { useTheme } from '../../Theme/theme';
import { getThemeVars } from '../../Theme/themeVars';

const QuickActions = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, ctaBg, ctaText } = getThemeVars(theme);

  const actions = [
    {
      icon: <FaUserPlus />,
      title: 'Add New Client',
      description: 'Register a new client'
    },
    {
      icon: <FaHandHoldingUsd />,
      title: 'Create Loan',
      description: 'Process a new loan'
    },
    {
      icon: <FaFileAlt />,
      title: 'Generate Report',
      description: 'Create financial reports'
    },
    {
      icon: <FaBell />,
      title: 'Send Reminders',
      description: 'Send payment reminders'
    }
  ];

  return (
    <Panel 
      style={{ 
        background: cardBg, 
        color: cardText, 
        border: `1px solid ${borderColor}`,
        boxShadow: shadow,
        borderRadius: 8,
        padding: '24px'
      }}
    >
      <h3 style={{ 
        fontSize: 18, 
        fontWeight: 600, 
        margin: 0, 
        marginBottom: 20,
        color: cardText
      }}>
        Quick Actions
      </h3>
      
      <Stack direction="column" spacing={12}>
        {actions.map((action, index) => (
          <Button
            key={index}
            appearance="ghost"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${borderColor}`,
              borderRadius: 6,
              background: 'transparent',
              color: cardText,
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 14,
              fontWeight: 500,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = ctaBg;
              e.target.style.color = ctaText;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = cardText;
            }}
          >
            <div style={{ fontSize: 16 }}>
              {action.icon}
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontWeight: 600, marginBottom: 2 }}>
                {action.title}
              </div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>
                {action.description}
              </div>
            </div>
          </Button>
        ))}
      </Stack>
    </Panel>
  );
};

export default QuickActions; 