import React from 'react';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

 const TopProducts = ({ data = [] }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, success, danger, cardBorderBottomColor } = getThemeVars(theme);

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
        <h3 style={{
          fontSize: 18,
          fontWeight: 600,
          margin: 0,
          marginBottom: 20,
          color: cardText,
          padding: '10px 16px',
          borderBottom: `3px solid ${cardBorderBottomColor}`,
          borderBottomWidth: 1
        }}>
          Top Products/Services
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(!Array.isArray(data) || data.length === 0) ? (
            <div style={{ textAlign: 'center', color: '#666', fontSize: 16, marginTop: 16 }}>
              No product/service data available.
            </div>
          ) : (
            data.map((product, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  border: `1px solid ${borderColor}`,
                  borderRadius: 6,
                  background: 'transparent'
                }}
              >
                <div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: cardText,
                    marginBottom: 4
                  }}>
                    {product.name}
                  </div>
                  <div style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: cardText
                  }}>
                    {product.revenue}
                  </div>
                </div>
                <div style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: product.changeType === 'positive' ? success : danger
                }}>
                  {product.change}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TopProducts; 