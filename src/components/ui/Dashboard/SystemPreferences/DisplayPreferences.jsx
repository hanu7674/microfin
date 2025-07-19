import React, { useState } from 'react';
import { Stack, Panel, Toggle } from 'rsuite';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const DisplayPreferences = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);

  const [preferences, setPreferences] = useState({
    darkMode: false,
    compactView: true
  });

  const handleToggle = (preference) => {
    setPreferences(prev => ({
      ...prev,
      [preference]: !prev[preference]
    }));
  };

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
          Display Preferences
        </div>

        <div style={{ padding: '0 16px 16px' }}>
          <Stack direction="column" spacing={16} alignItems='stretch'>
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
                  Dark Mode
                </div>
                <div style={{
                  fontSize: 12,
                  color: cardText,
                  opacity: 0.7
                }}>
                  Switch to dark theme
                </div>
              </div>
              <Toggle
                checked={preferences.darkMode}
                onChange={() => handleToggle('darkMode')}
                size="md"
              />
            </Stack>

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
                  Compact View
                </div>
                <div style={{
                  fontSize: 12,
                  color: cardText,
                  opacity: 0.7
                }}>
                  Reduce spacing between elements
                </div>
              </div>
              <Toggle
                checked={preferences.compactView}
                onChange={() => handleToggle('compactView')}
                size="md"
              />
            </Stack>
          </Stack>
        </div>
      </Panel>
    </div>
  );
};

export default DisplayPreferences; 