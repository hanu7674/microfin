import React from 'react';
import { Button } from 'rsuite';
import { FaDownload, FaPlus } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const ClientDashboardHeader = ({ onExport, onAddClient }) => {
  const { theme } = useTheme();
  const { cardText, borderColor, ctaBg, cardBorderBottomColor } = getThemeVars(theme);

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
            color: cardText,
            padding: '10px 16px',
            borderBottomWidth: 1
          }}>
            Client Management
          </h1>
          <p style={{ 
            fontSize: 16, 
            color: cardText,
            margin: 0,
            opacity: 0.8,
            padding: '0 16px'
          }}>
            Manage your customer database and relationships
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
            onClick={onExport}
          >
            <FaDownload />
            Export
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
            onClick={onAddClient}
          >
            <FaPlus />
            Add Client
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboardHeader; 