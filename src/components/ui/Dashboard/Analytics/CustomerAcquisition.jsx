import React, { useMemo } from 'react';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { SelectPicker } from 'rsuite';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

// Accepts a 'data' prop: array of { date, customers }
const CustomerAcquisition = ({ data = [], selectedRange = '6months', setSelectedRange }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);

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

  // Chart rendering
  const renderChart = () => {
    if (!Array.isArray(filteredData) || filteredData.length === 0) {
      return <div style={{ textAlign: 'center', color: '#666', fontSize: 16 }}>No customer acquisition data available.</div>;
    }
    return (
      <div style={{ width: '100%', height: 300, marginBottom: 24 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData} margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={borderColor} />
            <XAxis dataKey="date" stroke={cardText} fontSize={12} tickFormatter={d => new Date(d).toLocaleDateString()} />
            <YAxis stroke={cardText} fontSize={12} allowDecimals={false} />
            <RechartsTooltip wrapperStyle={{ background: cardBg, color: cardText }} formatter={(value) => value} labelFormatter={d => new Date(d).toLocaleDateString()} />
            <Legend />
            <Line type="monotone" dataKey="customers" stroke="#3b82f6" strokeWidth={3} name="New Customers" />
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
            Customer Acquisition
          </h3>
          <SelectPicker
            data={timeOptions}
            placement='auto'
            value={selectedRange}
            onChange={setSelectedRange}
            style={{ width: '150px' }}
            size="sm"
          />
        </div>
        <h4 style={{
          fontSize: 14,
          fontWeight: 400,
          margin: 0,
          color: cardText
        }}>
          ( This chart shows the customer acquisition data for the selected period )
        </h4>
        {renderChart()}
      </div>
    </div>
  );
};

export default CustomerAcquisition; 