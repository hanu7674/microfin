import React, { useState } from 'react';
import { Input, Button } from 'rsuite';
import { FaLink } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const QuickPaymentLink = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, ctaBg, cardBorderBottomColor } = getThemeVars(theme);
  
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    customerName: '',
    customerEmail: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerateLink = () => {
    console.log('Generating payment link with:', formData);
    // Implementation for generating payment link
  };

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
          Quick Payment Link
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
              Amount
            </label>
            <Input
              value={formData.amount}
              onChange={(value) => handleInputChange('amount', value)}
              placeholder="0.00"
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
              Description
            </label>
            <Input
              value={formData.description}
              onChange={(value) => handleInputChange('description', value)}
              placeholder="Payment for..."
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
                Customer Name
              </label>
              <Input
                value={formData.customerName}
                onChange={(value) => handleInputChange('customerName', value)}
                placeholder="Customer Name"
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
                Email
              </label>
              <Input
                value={formData.customerEmail}
                onChange={(value) => handleInputChange('customerEmail', value)}
                placeholder="customer@email.com"
                style={{ width: '100%' }}
              />
            </div>
          </div>
          
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
              justifyContent: 'center',
              gap: 8,
              marginTop: 8
            }}
            onClick={handleGenerateLink}
          >
            <FaLink />
            Generate Payment Link
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickPaymentLink; 