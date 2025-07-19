import React from 'react';
import { Stack, Panel, Button, Tag } from 'rsuite';
import { FaShieldAlt, FaDesktop, FaMobile, FaTablet, FaLaptop } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const SecuritySettings = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor, success } = getThemeVars(theme);

  const activeSessions = [
    {
      device: 'Desktop - Chrome',
      location: 'New York, US',
      time: 'Current session',
      icon: <FaDesktop style={{ fontSize: 16, color: '#666' }} />,
      status: 'active',
      action: null
    },
    {
      device: 'Mobile - Safari',
      location: 'New York, US',
      time: '2 hours ago',
      icon: <FaMobile style={{ fontSize: 16, color: '#666' }} />,
      status: 'inactive',
      action: 'revoke'
    },
    {
      device: 'Laptop - Firefox',
      location: 'San Francisco, US',
      time: '1 day ago',
      icon: <FaLaptop style={{ fontSize: 16, color: '#666' }} />,
      status: 'inactive',
      action: 'revoke'
    },
    {
      device: 'Tablet - Safari',
      location: 'London, UK',
      time: '3 days ago',
      icon: <FaTablet style={{ fontSize: 16, color: '#666' }} />,
      status: 'inactive',
      action: 'revoke'
    },
    {
      device: 'Desktop - Edge',
      location: 'Toronto, CA',
      time: '1 week ago',
      icon: <FaDesktop style={{ fontSize: 16, color: '#666' }} />,
      status: 'inactive',
      action: 'revoke'
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
          Security Settings
        </div>

        <div style={{ padding: '0 16px 16px' }}>
          {/* Password */}
          <div style={{ marginBottom: 24 }}>
            <Stack justifyContent="space-between" alignItems="center" style={{
              padding: '16px',
              border: `1px solid ${borderColor}`,
              borderRadius: 6,
              background: 'transparent'
            }}>
              <div>
                <div style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: cardText,
                  marginBottom: 4
                }}>
                  Password
                </div>
                <div style={{
                  fontSize: 12,
                  color: cardText,
                  opacity: 0.7
                }}>
                  Last changed 3 months ago
                </div>
              </div>
              <Button appearance="ghost" size="sm">
                Change Password
              </Button>
            </Stack>
          </div>

          {/* Two-Factor Authentication */}
          <div style={{ marginBottom: 24 }}>
            <Stack justifyContent="space-between" alignItems="center" style={{
              padding: '16px',
              border: `1px solid ${borderColor}`,
              borderRadius: 6,
              background: 'transparent'
            }}>
              <div>
                <div style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: cardText,
                  marginBottom: 4
                }}>
                  Two-Factor Authentication
                </div>
                <div style={{
                  fontSize: 12,
                  color: cardText,
                  opacity: 0.7
                }}>
                  Add an extra layer of security
                </div>
                <div style={{
                  fontSize: 12,
                  color: cardText,
                  opacity: 0.7,
                  marginTop: 4
                }}>
                  Status: Disabled
                </div>
              </div>
              <Button appearance="primary" size="sm">
                Enable 2FA
              </Button>
            </Stack>
          </div>

          {/* Active Sessions */}
          <div>
            <div style={{
              fontSize: 16,
              fontWeight: 600,
              color: cardText,
              marginBottom: 16
            }}>
              Active Sessions
            </div>
            <Stack direction="column" justifyContent='space-between' spacing={12} alignItems='stretch'>
              {activeSessions.map((session, index) => (
                <Stack key={index} justifyContent="space-between" style={{
                  padding: '16px',
                  border: `1px solid ${borderColor}`,
                  borderRadius: 6,
                  background: 'transparent'
                }}>
                  <Stack alignItems="center" spacing={12}>
                    {session.icon}
                    <div>
                      <div style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: cardText,
                        marginBottom: 2
                      }}>
                        {session.device}
                      </div>
                      <div style={{
                        fontSize: 12,
                        color: cardText,
                        opacity: 0.7
                      }}>
                        {session.location} • {session.time}
                      </div>
                    </div>
                  </Stack>
                  {session.status === 'active' ? (
                    <Tag color="green" style={{ backgroundColor: '#e6f4ea', color: '#1e7e34' }}>
                      Active
                    </Tag>
                  ) : (
                    <Button appearance="ghost" size="sm" color="red">
                      Revoke
                    </Button>
                  )}
                </Stack>
              ))}
            </Stack>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default SecuritySettings; 