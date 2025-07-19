import React from 'react';
import { Input, DatePicker } from 'rsuite';
import { FaCalendar } from 'react-icons/fa';
import { useTheme } from '../../../../Theme/theme';
import { getThemeVars } from '../../../../Theme/themeVars';

const InvoiceMetadata = ({ formData, onFormChange }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, cardBorderBottomColor } = getThemeVars(theme);

  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: 8,
          padding: '2%'
        }}
      >
        <h3 style={{
          fontSize: 18, 
          fontWeight: 600, 
          margin: 0, 
          padding: '10px 16px',
          marginBottom: 20,
          color: cardText,
          borderBottom: `3px solid ${cardBorderBottomColor}`,
          borderBottomWidth: 1
        }}>
          Invoice Details
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 16
        }}>
          <div>
            <label style={{
              fontSize: 14,
              fontWeight: 500,
              color: cardText,
              marginBottom: 8,
              display: 'block'
            }}>
              Invoice Number
            </label>
            <Input
              value={formData.invoiceNumber || 'INV-2025-001'}
              onChange={(value) => onFormChange('invoiceNumber', value)}
              style={{ width: '100%' }}
            />
          </div>
          
          <div>
            <label style={{
              fontSize: 14,
              fontWeight: 500,
              color: cardText,
              marginBottom: 8,
              display: 'block'
            }}>
              Issue Date
            </label>
            <DatePicker
              value={formData.issueDate || new Date('2025-01-15')}
              onChange={(value) => onFormChange('issueDate', value)}
              format="yyyy-MM-dd"
              style={{ width: '100%' }}
            />
          </div>
          
          <div>
            <label style={{
              fontSize: 14,
              fontWeight: 500,
              color: cardText,
              marginBottom: 8,
              display: 'block'
            }}>
              Due Date
            </label>
            <div style={{ position: 'relative' }}>
              <DatePicker
                value={formData.dueDate || new Date('2025-02-15')}
                onChange={(value) => onFormChange('dueDate', value)}
                format="yyyy-MM-dd"
                style={{ width: '100%' }}
              />
              <div style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: muted,
                pointerEvents: 'none'
              }}>
                <FaCalendar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceMetadata; 