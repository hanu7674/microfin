import React from 'react';
import { Input, SelectPicker } from 'rsuite';
import { useTheme } from '../../../../Theme/theme';
import { getThemeVars } from '../../../../Theme/themeVars';

const SenderRecipientDetails = ({ formData, onFormChange }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, cardBorderBottomColor } = getThemeVars(theme);

  // Client options for dropdown
  const clientOptions = [
    { label: 'Select Client', value: '' },
    { label: 'ABC Corp', value: 'abc-corp' },
    { label: 'XYZ Ltd', value: 'xyz-ltd' },
    { label: 'Tech Solutions', value: 'tech-solutions' },
    { label: 'Global Systems', value: 'global-systems' },
    { label: 'Innovate Inc', value: 'innovate-inc' }
  ];

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 24
      }}>
        {/* From Section */}
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
            From
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{
                fontSize: 14,
                fontWeight: 500,
                color: cardText,
                marginBottom: 8,
                display: 'block'
              }}>
                Your Business Name
              </label>
              <Input
                value={formData.senderBusinessName || ''}
                onChange={(value) => onFormChange('senderBusinessName', value)}
                placeholder="Enter your business name"
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
                Business Address
              </label>
              <Input as="textarea"
                value={formData.senderAddress || ''}
                onChange={(value) => onFormChange('senderAddress', value)}
                placeholder="Enter your business address"
                rows={3}
                style={{ width: '100%' }}
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: cardText,
                  marginBottom: 8,
                  display: 'block'
                }}>
                  Email
                </label>
                <Input
                  value={formData.senderEmail || ''}
                  onChange={(value) => onFormChange('senderEmail', value)}
                  placeholder="your@email.com"
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
                  Phone
                </label>
                <Input
                  value={formData.senderPhone || ''}
                  onChange={(value) => onFormChange('senderPhone', value)}
                  placeholder="+91 9876543210"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* To Section */}
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
            To
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{
                fontSize: 14,
                fontWeight: 500,
                color: cardText,
                marginBottom: 8,
                display: 'block'
              }}>
                Select Client
              </label>
              <SelectPicker
                data={clientOptions}
                value={formData.selectedClient || ''}
                onChange={(value) => onFormChange('selectedClient', value)}
                placeholder="Select a client"
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
                Client Name
              </label>
              <Input
                value={formData.clientName || ''}
                onChange={(value) => onFormChange('clientName', value)}
                placeholder="Enter client name"
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
                Client Address
              </label>
              <Input as="textarea"
                value={formData.clientAddress || ''}
                onChange={(value) => onFormChange('clientAddress', value)}
                placeholder="Enter client address"
                rows={3}
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
                Client Email
              </label>
              <Input
                value={formData.clientEmail || ''}
                onChange={(value) => onFormChange('clientEmail', value)}
                placeholder="client@email.com"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SenderRecipientDetails; 