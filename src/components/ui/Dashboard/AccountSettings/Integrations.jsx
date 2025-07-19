import React, { useState } from 'react';
import { Stack, Grid, Row, Col, Panel, Button, Toggle } from 'rsuite';
import { FaGoogle, FaEnvelope, FaMobile, FaCog } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const Integrations = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);

  const [integrations, setIntegrations] = useState({
    googleSheets: true,
    emailNotifications: false,
    smsGateway: false
  });

  const handleToggle = (integration) => {
    setIntegrations(prev => ({
      ...prev,
      [integration]: !prev[integration]
    }));
  };

  const integrationCards = [
    {
      key: 'googleSheets',
      title: 'Google Sheets',
      subtitle: 'Export reports',
      action: 'Configure',
      icon: <FaGoogle style={{ fontSize: 20, color: '#fff' }} />,
      iconBg: '#4285F4',
      enabled: integrations.googleSheets
    },
    {
      key: 'emailNotifications',
      title: 'Email Notifications',
      subtitle: 'SMTP settings',
      action: 'Setup',
      icon: <FaEnvelope style={{ fontSize: 20, color: '#fff' }} />,
      iconBg: '#EA4335',
      enabled: integrations.emailNotifications
    },
    {
      key: 'smsGateway',
      title: 'SMS Gateway',
      subtitle: 'Payment reminders',
      action: 'Configure',
      icon: <FaMobile style={{ fontSize: 20, color: '#fff' }} />,
      iconBg: '#34A853',
      enabled: integrations.smsGateway
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
          Integrations
        </div>

        <div style={{ padding: '0 16px 16px' }}>
          <Stack direction="column" spacing={16} alignItems='stretch'>
            {integrationCards.map((integration) => (
              <div
                key={integration.key}
                style={{
                  padding: '20px',
                  border: `1px solid ${borderColor}`,
                  borderRadius: 8,
                  background: 'transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                <Stack justifyContent="space-between" >
                  <Stack alignItems="space-between" spacing={16}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 8,
                      backgroundColor: integration.iconBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      {integration.icon}
                    </div>
                    <div>
                      <div style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: cardText,
                        marginBottom: 4
                      }}>
                        {integration.title}
                      </div>
                      <div style={{
                        fontSize: 14,
                        color: cardText,
                        opacity: 0.7
                      }}>
                        {integration.subtitle}
                      </div>
                    </div>
                  </Stack>
                  
                  <Stack alignItems="center" spacing={12}>
                    <Button 
                      appearance="ghost" 
                      size="sm"
                      style={{
                        padding: '6px 12px',
                        fontSize: 12,
                        fontWeight: 500
                      }}
                    >
                      {integration.action}
                    </Button>
                    <Toggle
                      checked={integration.enabled}
                      onChange={() => handleToggle(integration.key)}
                      size="sm"
                    />
                  </Stack>
                </Stack>
              </div>
            ))}
          </Stack>
        </div>
      </Panel>
    </div>
  );
};

export default Integrations; 