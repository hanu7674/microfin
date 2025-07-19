import React from 'react';
import { Stack, Button } from 'rsuite';
import { FaPlus } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const TransactionsHeader = ({ title = "Transactions", subtitle = "Manage your income and expense transactions", actionText = "Add Transaction", onActionClick }) => {
  const { theme } = useTheme();
  const { textMain, muted } = getThemeVars(theme);

  return (
    <Stack justifyContent="space-between" alignItems="flex-start" style={{ marginBottom: 32 }}>
      <div>
        <h1 style={{ 
          fontSize: 32, 
          fontWeight: 700, 
          margin: 0, 
          marginBottom: 8, 
          color: textMain 
        }}>
          {title}
        </h1>
        <p style={{ 
          fontSize: 16, 
          color: muted, 
          margin: 0 
        }}>
          {subtitle}
        </p>
      </div>
      <Button 
        appearance="primary" 
        size="lg"
        style={{ 
          backgroundColor: '#000', 
          color: '#fff',
          border: 'none'
        }}
        onClick={onActionClick}
      >
        <FaPlus style={{ marginRight: 8 }} />
        {actionText}
      </Button>
    </Stack>
  );
};

export default TransactionsHeader; 