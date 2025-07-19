import React from 'react';
import { Button } from 'rsuite';
import { FaLock, FaDownload, FaPaperPlane } from 'react-icons/fa';
import { useTheme } from '../../../../Theme/theme';
import { getThemeVars } from '../../../../Theme/themeVars';

const InvoiceActions = ({ onSaveDraft, onDownloadPDF, onCancel, onSendInvoice }) => {
  const { theme } = useTheme();
  const { cardText, borderColor, ctaBg } = getThemeVars(theme);

  return (
    <div style={{ 
      marginTop: 32,
      paddingTop: 24,
      borderTop: `1px solid ${borderColor}`
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
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
            onClick={onSaveDraft}
          >
            <FaLock />
            Save as Draft
          </Button>
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
            onClick={onDownloadPDF}
          >
            <FaDownload />
            Download PDF
          </Button>
        </div>
        
        <div style={{ display: 'flex', gap: 12 }}>
          <Button
            appearance="ghost"
            size="md"
            style={{
              border: `1px solid ${borderColor}`,
              borderRadius: 8,
              padding: '12px 24px',
              fontWeight: 600
            }}
            onClick={onCancel}
          >
            Cancel
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

export default InvoiceActions; 