import React from 'react';
import { Button } from 'rsuite';
import { FaEye, FaPaperPlane } from 'react-icons/fa';
import { useTheme } from '../../../../Theme/theme';
import { getThemeVars } from '../../../../Theme/themeVars';

const CreateInvoiceHeader = ({ onPreview, onSendInvoice }) => {
  const { theme } = useTheme();
  const { cardText, borderColor, ctaBg } = getThemeVars(theme);

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 16
      }}>
        <div>
          <h1 style={{ 
            fontSize: 28, 
            fontWeight: 700, 
            margin: 0, 
            marginBottom: 8,
            color: cardText
          }}>
            Create Invoice
          </h1>
          <p style={{ 
            fontSize: 16, 
            color: cardText,
            margin: 0,
            opacity: 0.8
          }}>
            Generate professional invoices for your clients
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button
            appearance="ghost"
            size="md"
            style={{
              border: `1px solid ${borderColor}`,
              borderRadius: 8,
              padding: '12px 24px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
            onClick={onPreview}
          >
            <FaEye />
            Preview
          </Button>
          <Button
            appearance="primary"
            size="md"
            style={{
              backgroundColor: ctaBg,
              border: 'none',
              borderRadius: 8,
              padding: '12px 24px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
            onClick={onSendInvoice}
          >
            <FaPaperPlane />
            Send Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoiceHeader; 