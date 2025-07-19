import React from 'react';
import { IconButton,Button, Tag } from 'rsuite';
import { FaUpload, FaFilePdf, FaFile, FaDownload } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const BusinessDocuments = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, success, warning, cardBorderBottomColor } = getThemeVars(theme);

  const documents = [
    {
      name: 'Business Registration Certificate',
      icon: <FaFilePdf />,
      uploadedDate: 'Jan 15, 2025',
      status: 'Verified',
      statusColor: success
    },
    {
      name: 'GST Registration Certificate',
      icon: <FaFilePdf />,
      uploadedDate: 'Jan 15, 2025',
      status: 'Pending',
      statusColor: warning
    },
    {
      name: 'Business License',
      icon: <FaFile />,
      uploadedDate: 'Jan 15, 2025',
      status: 'Verified',
      statusColor: success
    }
  ];

  const getStatusTag = (status, color) => (
    <Tag color={color === success ? 'green' : 'orange'} style={{ 
      backgroundColor: color === success ? '#e6f4ea' : '#fff3e0',
      color: color === success ? '#1e7e34' : '#f57c00',
      border: 'none',
      borderRadius: 12,
      padding: '4px 12px',
      fontSize: 12,
      fontWeight: 500
    }}>
      {status}
    </Tag>
  );

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
            Business Documents
          </h3>
          <Button
            appearance="primary"
            size="sm"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px'
            }}
          >
            <FaUpload />
            Upload Document
          </Button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {documents.map((doc, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                border: `1px solid ${borderColor}`,
                borderRadius: 6,
                background: 'transparent'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  fontSize: 20,
                  color: cardText,
                  opacity: 0.7
                }}>
                  {doc.icon}
                </div>
                <div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: cardText,
                    marginBottom: 4
                  }}>
                    {doc.name}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: cardText,
                    opacity: 0.7
                  }}>
                    Uploaded on {doc.uploadedDate}
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {getStatusTag(doc.status, doc.statusColor)}
                <IconButton
                  appearance="subtle"
                  size="xs"
                  circle
                  style={{
                    padding: '4px 8px',
                    minWidth: 'auto',
                    color: cardText,
                    opacity: 0.7
                  }}
                >
                  <FaDownload />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessDocuments; 