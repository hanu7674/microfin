import React from 'react';
import { InputNumber } from 'rsuite';
import { useTheme } from '../../../../Theme/theme';
import { getThemeVars } from '../../../../Theme/themeVars';

const InvoiceSummary = ({ items, taxRate, discount, onTaxChange, onDiscountChange }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, cardBorderBottomColor } = getThemeVars(theme);

  // Calculate subtotal from items
  const subtotal = items.reduce((sum, item) => {
    return sum + ((item.qty || 0) * (item.rate || 0));
  }, 0);

  // Calculate tax amount
  const taxAmount = (subtotal * (taxRate || 0)) / 100;

  // Calculate discount amount
  const discountAmount = (subtotal * (discount || 0)) / 100;

  // Calculate total
  const total = subtotal + taxAmount - discountAmount;

  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: 8,
          padding: '2%',
          maxWidth: '400px',
          marginLeft: 'auto'
        }}
      >
        <h3 style={{
          fontSize: 18,
          fontWeight: 600,
          margin: 0,
          marginBottom: 20,
          color: cardText,
          fontSize: 18, 
        fontWeight: 600, 
        margin: 0, 
        padding: '10px 16px',
        marginBottom: 20,
        color: cardText,
        borderBottom: `3px solid ${cardBorderBottomColor}`,
        borderBottomWidth: 1
        }}>
          Summary
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: 14, color: cardText }}>Subtotal:</span>
            <span style={{ fontSize: 16, fontWeight: 600, color: cardText }}>
              ₹{subtotal.toFixed(2)}
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14, color: cardText }}>Tax:</span>
              <InputNumber
                value={taxRate || 18}
                onChange={onTaxChange}
                min={0}
                max={100}
                style={{ width: '60px' }}
              />
              <span style={{ fontSize: 14, color: muted }}>%</span>
            </div>
            <span style={{ fontSize: 16, fontWeight: 600, color: cardText }}>
              ₹{taxAmount.toFixed(2)}
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14, color: cardText }}>Discount:</span>
              <InputNumber
                value={discount || 0}
                onChange={onDiscountChange}
                min={0}
                max={100}
                style={{ width: '60px' }}
              />
              <span style={{ fontSize: 14, color: muted }}>%</span>
            </div>
            <span style={{ fontSize: 16, fontWeight: 600, color: cardText }}>
              ₹{discountAmount.toFixed(2)}
            </span>
          </div>
          
          <div style={{
            borderTop: `1px solid ${borderColor}`,
            paddingTop: 12,
            marginTop: 8
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: 16, fontWeight: 600, color: cardText }}>Total:</span>
              <span style={{ fontSize: 20, fontWeight: 700, color: cardText }}>
                ₹{total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSummary; 