import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Panel, Button, Tag, Loader, Message } from 'rsuite';
import { FaDesktop } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { getAuth } from 'firebase/auth';
import { fetchSessions, revokeSession, sendPasswordReset, fetch2FAStatus } from '../../../../redux/security';

const SecuritySettings = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);

  const dispatch = useDispatch();
  const { sessions, loading, error, twoFAEnabled, passwordResetSuccess } = useSelector(state => state.security);
  const user = getAuth().currentUser;
   
  useEffect(() => {
    if (user) {
      dispatch(fetchSessions(user.uid));
      dispatch(fetch2FAStatus());
    }
  }, [dispatch, user]);

  const handleRevoke = (sessionId) => {
    dispatch(revokeSession(user.uid, sessionId));
  };

  const handlePasswordReset = () => {
    dispatch(sendPasswordReset(user.email));
  };

  const onEnable2FA = () => {
    console.log('2FA enrollment not implemented in this demo. See Firebase docs for multi-factor auth.');
   };

  if (loading) {
    return <div style={{ padding: 32, textAlign: 'center' }}><Loader size="md" content="Loading security settings..." /></div>;
  }
  if (error) {
    return <div style={{ padding: 32 }}><Message type="error">{error}</Message></div>;
  }

  // Get current sessionId from localStorage
  const currentSessionId = window.localStorage.getItem('sessionId');

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
          {passwordResetSuccess && <Message type="success" style={{ marginBottom: 16 }}>Password reset email sent!</Message>}
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
                  Last changed: Not available
                </div>
              </div>
              <Button appearance="ghost" size="sm" onClick={handlePasswordReset}>
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
                  Status: {twoFAEnabled ? "Enabled" : "Disabled"}
                </div>
              </div>
              <Button appearance={twoFAEnabled ? "ghost" : "primary"} size="sm" onClick={onEnable2FA} disabled={twoFAEnabled}>
                {twoFAEnabled ? "2FA Enabled" : "Enable 2FA"}
              </Button>
            </Stack>
          </div>

          {/* Active Session */}
          <div>
            <div style={{
              fontSize: 16,
              fontWeight: 600,
              color: cardText,
              marginBottom: 16
            }}>
              Active Session
            </div>
            <Stack direction="column" justifyContent='space-between' spacing={12} alignItems='stretch'>
              {user && (
                <Stack justifyContent="space-between" style={{
                  padding: '16px',
                  border: `1px solid ${borderColor}`,
                  borderRadius: 6,
                  background: 'transparent'
                }}>
                  <Stack alignItems="center" spacing={12}>
                    <FaDesktop style={{ fontSize: 16, color: '#666' }} />
                    <div>
                      <div style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: cardText,
                        marginBottom: 2
                      }}>
                        {user.displayName || user.email}
                      </div>
                      <div style={{
                        fontSize: 12,
                        color: cardText,
                        opacity: 0.7
                      }}>
                        {user.email} • Current session
                      </div>
                    </div>
                  </Stack>
                  <Tag color="green" style={{ backgroundColor: '#e6f4ea', color: '#1e7e34' }}>
                    Active
                  </Tag>
                </Stack>
              )}
            </Stack>
          </div>

          {/* All Sessions */}
          <div style={{ marginTop: 32 }}>
            <div style={{
              fontSize: 16,
              fontWeight: 600,
              color: cardText,
              marginBottom: 16
            }}>
              All Sessions
            </div>
            <Stack direction="column" spacing={12}>
              {sessions.length > 0 ? (<>
              {
                sessions.map(session => (
                <Stack key={session.sessionId} justifyContent="space-between" style={{
                  padding: '16px',
                  border: `1px solid ${borderColor}`,
                  borderRadius: 6,
                  background: 'transparent'
                }}>
                  <div>
                    {session.device} - {session.location} - {session.time}
                  </div>
                  {session.sessionId === currentSessionId ? (
                    <Tag color="green" style={{ backgroundColor: '#e6f4ea', color: '#1e7e34' }}>
                      Current
                    </Tag>
                  ) : (
                    <Button appearance="ghost" size="sm" color="red" onClick={() => handleRevoke(session.sessionId)}>
                      Revoke
                    </Button>
                  )}
                </Stack>
              )
              )} </> ) : (
                <div>No sessions found</div>
              )}
            </Stack>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default SecuritySettings; 