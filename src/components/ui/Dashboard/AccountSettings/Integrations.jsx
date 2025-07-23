import React, { useState } from 'react';
import { Stack, Panel, Button, Toggle } from 'rsuite';
import { FaGoogle, FaEnvelope, FaMobile, FaCheck } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { useDispatch } from 'react-redux';
import { dismissNotification, notify } from 'reapop';

const Integrations = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);
  const dispatch = useDispatch();
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
    if(integration === 'googleSheets') {
      dispatch(notify({
        title: 'Google Sheets integration',
        message: 'The Google Sheets integration has been updated successfully',
        status: 'success',
        dismissible: true,
        dismissAfter: 3000,
        position: 'top-right',
        id: integration,
        icon: <FaCheck />,
        action: { label: 'Dismiss', onClick: () => dispatch(dismissNotification(integration)) }
      }));
    }
    else if(integration === 'emailNotifications') {
    dispatch(notify({
      title: 'Email Notifications',
      message: 'The email notifications have been updated successfully',
      status: 'success',
      dismissible: true,
      dismissAfter: 3000,
      position: 'top-right',
      id: integration,
      icon: <FaCheck />,
      action: { label: 'Dismiss', onClick: () => dispatch(dismissNotification(integration)) }
    }));
  }
  else if(integration === 'smsGateway') {
    dispatch(notify({
      title: 'SMS Gateway',
      message: 'The SMS gateway has been updated successfully',
      status: 'success',
      dismissible: true,
      dismissAfter: 3000,
      position: 'top-right',
      id: integration,
      icon: <FaCheck />,
      action: { label: 'Dismiss', onClick: () => dispatch(dismissNotification(integration)) }
    }));
  }
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
                  background: integration.enabled ? 'rgba(66,133,244,0.04)' : 'transparent',
                  minWidth: 320,
                  maxWidth: 480,
                  margin: '0 auto',
                  transition: 'all 0.2s ease'
                }}
              >
                <Stack justifyContent="space-between" alignItems="center">
                  <Stack alignItems="center" spacing={16}>
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
                      aria-label={`Configure ${integration.title}`}
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
                      aria-label={`Toggle ${integration.title}`}
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