import React from 'react';
import { Stack, Button, SelectPicker } from 'rsuite';
import { FaDownload } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const FinancialReportsHeader = ({ 
  title = "Financial Reports", 
  subtitle = "Visual charts and reports showing profit/loss, cash flow, and business trends",
  dateRange = "Last 30 days",
  onDateRangeChange,
  onExport,
  exportText = "Export"
}) => {
  const { theme } = useTheme();
  const { textMain, muted } = getThemeVars(theme);

  const dateRangeOptions = [
    { label: 'Last 7 days', value: 'Last 7 days' },
    { label: 'Last 30 days', value: 'Last 30 days' },
    { label: 'Last 90 days', value: 'Last 90 days' },
    { label: 'Last 6 months', value: 'Last 6 months' },
    { label: 'Last 1 year', value: 'Last 1 year' },
    { label: 'All time', value: 'All time' }
  ];

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
      <Stack spacing={12} alignItems="center">
        <SelectPicker
          data={dateRangeOptions}
          value={dateRange}
          onChange={onDateRangeChange}
          style={{ width: 150 }}
          appearance="default"
          placeholder="Select date range"
          defaultValue='Last 30 days'
        />
        <Button 
          appearance="primary" 
          size="md"
          style={{ 
            backgroundColor: '#000', 
            color: '#fff',
            border: 'none'
          }}
          onClick={onExport}
        >
          <FaDownload style={{ marginRight: 8 }} />
          {exportText}
        </Button>
      </Stack>
    </Stack>
  );
};

export default FinancialReportsHeader; 