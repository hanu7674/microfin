import React from 'react';
import { Stack } from 'rsuite';
import { useTheme } from '../../Theme/theme';
import { getThemeVars } from '../../Theme/themeVars';

const DashboardHeader = () => {
  const { theme } = useTheme();
  const { textMain, muted } = getThemeVars(theme);

  return (
    <div style={{ padding: '24px 0' }}>
      <Stack justifyContent="flex-start" alignItems="flex-start">
        <div>
          <h1 style={{ 
            fontSize: 32, 
            fontWeight: 700, 
            margin: 0, 
            marginBottom: 8, 
            color: textMain 
          }}>
            Dashboard
          </h1>
          <p style={{ 
            fontSize: 16, 
            color: muted, 
            margin: 0 
          }}>
            Welcome back! Here's your financial overview.
          </p>
        </div>
      </Stack>
    </div>
  );
};

export default DashboardHeader; 