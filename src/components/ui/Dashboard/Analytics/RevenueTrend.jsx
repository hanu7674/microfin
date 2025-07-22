import React, { useState, useMemo } from 'react';
import { SelectPicker } from 'rsuite';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

// Accepts a 'data' prop: array of { date, revenue }
const RevenueTrend = ({ data = [] }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);

  const timeOptions = [
    { label: 'Last 3 months', value: '3months' },
    { label: 'Last 6 months', value: '6months' },
    { label: 'Last 12 months', value: '12months' },
    { label: 'This year', value: 'thisyear' }
  ];
  const [selectedRange, setSelectedRange] = useState('6months');

  // Filter data based on selected time range
  const filteredData = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [];
    const now = new Date();
    let months = 6;
    if (selectedRange === '3months') months = 3;
    if (selectedRange === '12months') months = 12;
    if (selectedRange === 'thisyear') {
      return data.filter(d => new Date(d.date).getFullYear() === now.getFullYear());
    }
    const cutoff = new Date(now.getFullYear(), now.getMonth() - months + 1, 1);
    return data.filter(d => new Date(d.date) >= cutoff);
  }, [data, selectedRange]);

  // Placeholder for chart rendering
  const renderChart = () => {
    if (!filteredData.length) {
      return <div style={{ textAlign: 'center', color: '#666', fontSize: 16 }}>No revenue data available for this period.</div>;
    }
    // If you have a chart library, render a chart here. For now, show a simple table as a placeholder.
    return (
      <table style={{ width: '100%', color: cardText, fontSize: 14 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: 4 }}>Date</th>
            <th style={{ textAlign: 'right', padding: 4 }}>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((d, i) => (
            <tr key={i}>
              <td style={{ padding: 4 }}>{new Date(d.date).toLocaleDateString()}</td>
              <td style={{ padding: 4, textAlign: 'right' }}>{d.revenue?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: 8,
          padding: '2%',
          boxShadow: shadow
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          padding: '10px 16px',
          borderBottom: `3px solid ${cardBorderBottomColor}`,
          borderBottomWidth: 1
        }}>
          <h3 style={{
            fontSize: 18,
            fontWeight: 600,
            margin: 0,
            color: cardText
          }}>
            Revenue Trend
          </h3>
          <SelectPicker
            data={timeOptions}
            value={selectedRange}
            onChange={setSelectedRange}
            style={{ width: '150px' }}
            size="sm"
          />
        </div>
        <div style={{
          height: '300px',
          backgroundColor: '#f5f5f5',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dashed #ddd',
          overflow: 'auto'
        }}>
          {renderChart()}
        </div>
      </div>
    </div>
  );
};

export default RevenueTrend; 