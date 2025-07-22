import React from 'react';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

// Accepts a 'data' prop: array of { date, customers }
const CustomerAcquisition = ({ data = [] }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);

  // Placeholder for chart rendering
  const renderChart = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return <div style={{ textAlign: 'center', color: '#666', fontSize: 16 }}>No customer acquisition data available.</div>;
    }
    // If you have a chart library, render a chart here. For now, show a simple table as a placeholder.
    return (
      <table style={{ width: '100%', color: cardText, fontSize: 14 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: 4 }}>Date</th>
            <th style={{ textAlign: 'right', padding: 4 }}>New Customers</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td style={{ padding: 4 }}>{new Date(d.date).toLocaleDateString()}</td>
              <td style={{ padding: 4, textAlign: 'right' }}>{d.customers}</td>
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
            Customer Acquisition
          </h3>
          
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

export default CustomerAcquisition; 