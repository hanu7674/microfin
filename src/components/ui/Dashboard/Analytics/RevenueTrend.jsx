import React, { useState, useMemo } from 'react';
import { SelectPicker } from 'rsuite';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, Line } from 'recharts';

// Accepts a 'data' prop: array of { date, revenue }
const RevenueTrend = ({ data = [], selectedRange = '6months', setSelectedRange }) => {
  const { theme } = useTheme();
  const { cardBg, subText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);

  const timeOptions = [
    { label: 'Last 3 months', value: '3months' },
    { label: 'Last 6 months', value: '6months' },
    { label: 'Last 12 months', value: '12months' },
    { label: 'This year', value: 'thisyear' }
  ];

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
    // For daily data, filter by days in the last N months
    const cutoff = new Date(now.getFullYear(), now.getMonth() - months + 1, 1);
    return data.filter(d => new Date(d.date) >= cutoff);
  }, [data, selectedRange]);

  // Placeholder for chart rendering
  const renderChart = () => {
    if (!filteredData.length) {
      return <div style={{ textAlign: 'center', color: '#666', fontSize: 16 }}>No revenue data available for this period.</div>;
    }
    return (
      <div style={{ width: '100%', height: 300, marginBottom: 24 }}>
      <ResponsiveContainer width="100%" height="100%" >
        <LineChart data={filteredData} style={{ background: cardBg }} margin={{ top: 16, right: 24, left: 0, bottom: 0 }} >
          <CartesianGrid strokeDasharray="3 3" stroke={subText} />
          <XAxis dataKey="date" stroke={subText} fontSize={12} tickFormatter={d => new Date(d).toLocaleDateString()} />
          <YAxis stroke={subText} fontSize={12} allowDecimals={false} />
          <RechartsTooltip wrapperStyle={{ background: cardBg, color: subText }} formatter={(value) => value} labelFormatter={d => new Date(d).toLocaleDateString()} />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="Revenue" />
        </LineChart>
      </ResponsiveContainer>
      </div>
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
            color: subText
          }}>
            Revenue Trend
          </h3>
          <SelectPicker
            data={timeOptions}
            value={selectedRange}
            onChange={setSelectedRange}
            style={{ width: '150px' }}
            placement='auto'
            size="sm"
          />
        </div>
        
          {renderChart()}
          <h4 style={{
            fontSize: 14,
            fontWeight: 400,
            margin: 0,
            color: subText,
            textAlign: 'center'
          }}>
             This chart shows the revenue trend for the last 7 days only
          </h4>
       </div>
    </div>
  );
};

export default RevenueTrend; 