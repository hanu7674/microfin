import React, { useState } from 'react';
import { Input, Button, Tag } from 'rsuite';
import { FaEdit, FaCheckCircle, FaClock, FaUniversity } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const BankDetails = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, success, warning, cardBorderBottomColor } = getThemeVars(theme);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bankName: 'HDFC Bank',
    accountNumber: '1234567890',
    accountType: 'Current Account',
    ifscCode: 'HDFC0001234',
    branchName: 'Mumbai Main Branch',
    accountHolderName: 'ABC Electronics Store',
    micrCode: '400240123',
    swiftCode: 'HDFCINBB',
    verificationStatus: 'Verified'
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

  const getStatusTag = (status) => (
    <Tag color={status === 'Verified' ? 'green' : 'orange'} style={{ 
      backgroundColor: status === 'Verified' ? '#e6f4ea' : '#fff3e0',
      color: status === 'Verified' ? '#1e7e34' : '#f57c00',
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
            Bank Account Information
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
                Bank Name
              </label>
              <Input
                value={formData.bankName}
                onChange={(value) => handleInputChange('bankName', value)}
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
                Account Number
              </label>
              <Input
                value={formData.accountNumber}
                onChange={(value) => handleInputChange('accountNumber', value)}
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
                Account Type
              </label>
              <Input
                value={formData.accountType}
                onChange={(value) => handleInputChange('accountType', value)}
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
                IFSC Code
              </label>
              <Input
                value={formData.ifscCode}
                onChange={(value) => handleInputChange('ifscCode', value)}
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
                Branch Name
              </label>
              <Input
                value={formData.branchName}
                onChange={(value) => handleInputChange('branchName', value)}
                disabled={!isEditing}
                style={{ width: '100%' }}
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
                Account Holder Name
              </label>
              <Input
                value={formData.accountHolderName}
                onChange={(value) => handleInputChange('accountHolderName', value)}
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
                MICR Code
              </label>
              <Input
                value={formData.micrCode}
                onChange={(value) => handleInputChange('micrCode', value)}
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
                SWIFT Code
              </label>
              <Input
                value={formData.swiftCode}
                onChange={(value) => handleInputChange('swiftCode', value)}
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
                Verification Status
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {getStatusTag(formData.verificationStatus)}
                <div style={{
                  fontSize: 16,
                  color: formData.verificationStatus === 'Verified' ? success : warning
                }}>
                  {formData.verificationStatus === 'Verified' ? <FaCheckCircle /> : <FaClock />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetails; 