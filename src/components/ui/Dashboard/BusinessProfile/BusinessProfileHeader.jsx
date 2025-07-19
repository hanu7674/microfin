import React from 'react';
import { Tabs } from 'rsuite';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const BusinessProfileHeader = ({ activeTab, onTabChange }) => {
  const { theme } = useTheme();
  const { cardText, cardBorderBottomColor } = getThemeVars(theme);

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        marginBottom: 24
      }}>
        <h1 style={{ 
          fontSize: 28, 
          fontWeight: 700, 
          margin: 0, 
          marginBottom: 8,
          color: cardText,
          padding: '10px 16px',
          borderBottomWidth: 1
        }}>
          Business Profile
        </h1>
        <p style={{ 
          fontSize: 16, 
          color: cardText,
          margin: 0,
          opacity: 0.8,
          padding: '0 16px'
        }}>
          Manage your business information, bank details, and verification status
        </p>
      </div>

      <Tabs
        activeKey={activeTab}
        onSelect={onTabChange}
        style={{
          padding: '0 16px'
        }}
        appearance="subtle"
      >
        <Tabs.Tab eventKey="general" title="General Info" />
        <Tabs.Tab eventKey="bank" title="Bank Details" />
        <Tabs.Tab eventKey="tax" title="Tax Information" />
        <Tabs.Tab eventKey="verification" title="Verification" />
      </Tabs>
    </div>
  );
};

export default BusinessProfileHeader; 