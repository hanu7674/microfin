import React from 'react';
import { Input } from 'rsuite';
import { useTheme } from '../../../../Theme/theme';
import { getThemeVars } from '../../../../Theme/themeVars';

const InvoiceNotes = ({ formData, onFormChange }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, cardBorderBottomColor } = getThemeVars(theme);

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 24
      }}>
        {/* Notes Section */}
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
            marginBottom: 16,
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
            Notes
          </h3>
          
          <Input as="textarea"

            value={formData.notes || ''}
            onChange={(value) => onFormChange('notes', value)}
            placeholder="Additional notes or comments"
            rows={4}
            style={{ width: '100%' }}
          />
        </div>

        {/* Terms & Conditions Section */}
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
            marginBottom: 16,
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
            Terms & Conditions
          </h3>
          
          <Input as="textarea"
            value={formData.terms || ''}
            onChange={(value) => onFormChange('terms', value)}
            placeholder="Payment terms and conditions"
            rows={4}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceNotes; 