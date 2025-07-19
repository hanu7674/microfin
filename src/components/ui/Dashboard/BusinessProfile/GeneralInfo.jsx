import React, { useState } from 'react';
import { Input, Button } from 'rsuite';
import { FaEdit } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const GeneralInfo = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, cardBorderBottomColor } = getThemeVars(theme);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    businessName: 'ABC Electronics Store',
    businessType: 'Retail Electronics',
    registrationNumber: 'REG123456789',
    establishedDate: 'January 15, 2020',
    businessAddress: '',
    contactEmail: 'contact@abcelectronics.com',
    phoneNumber: '+91 98765 43210',
    website: 'www.abcelectronics.com',
    numberOfEmployees: '15-20'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
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
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
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
            Business Information
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
            onClick={handleEdit}
          >
            <FaEdit />
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24
        }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{
                fontSize: 14,
                fontWeight: 500,
                color: cardText,
                marginBottom: 8,
                display: 'block'
              }}>
                Business Name
              </label>
              <Input
                value={formData.businessName}
                onChange={(value) => handleInputChange('businessName', value)}
                disabled={!isEditing}
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
                Business Type
              </label>
              <Input
                value={formData.businessType}
                onChange={(value) => handleInputChange('businessType', value)}
                disabled={!isEditing}
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
                Registration Number
              </label>
              <Input
                value={formData.registrationNumber}
                onChange={(value) => handleInputChange('registrationNumber', value)}
                disabled={!isEditing}
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
                Established Date
              </label>
              <Input
                value={formData.establishedDate}
                onChange={(value) => handleInputChange('establishedDate', value)}
                disabled={!isEditing}
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
                value={formData.businessAddress}
                onChange={(value) => handleInputChange('businessAddress', value)}
                disabled={!isEditing}
                rows={3}
                style={{ width: '100%' }}
                placeholder="Enter your business address"
              />
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{
                fontSize: 14,
                fontWeight: 500,
                color: cardText,
                marginBottom: 8,
                display: 'block'
              }}>
                Contact Email
              </label>
              <Input
                value={formData.contactEmail}
                onChange={(value) => handleInputChange('contactEmail', value)}
                disabled={!isEditing}
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
                Phone Number
              </label>
              <Input
                value={formData.phoneNumber}
                onChange={(value) => handleInputChange('phoneNumber', value)}
                disabled={!isEditing}
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
                Website
              </label>
              <Input
                value={formData.website}
                onChange={(value) => handleInputChange('website', value)}
                disabled={!isEditing}
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
                Number of Employees
              </label>
              <Input
                value={formData.numberOfEmployees}
                onChange={(value) => handleInputChange('numberOfEmployees', value)}
                disabled={!isEditing}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo; 