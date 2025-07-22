import React, { useState } from 'react';
import { Input, Button, Tag } from 'rsuite';
import { FaEdit, FaCheckCircle, FaClock, FaFileAlt } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { useDispatch } from 'react-redux';
import { updateBusinessProfile } from '../../../../redux/businessProfile';
const TaxInformation = ({ profile }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, success, warning, cardBorderBottomColor } = getThemeVars(theme);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({...profile});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    dispatch(updateBusinessProfile(profile.userId, formData));
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const getStatusTag = (status) => (
    <Tag color={status === 'Compliant' ? 'green' : 'orange'} style={{ 
      backgroundColor: status === 'Compliant' ? '#e6f4ea' : '#fff3e0',
      color: status === 'Compliant' ? '#1e7e34' : '#f57c00',
      border: 'none',
      borderRadius: 12,
      padding: '4px 12px',
      fontSize: 12,
      fontWeight: 500
    }}>
      {status === 'Compliant' ? 'Verified' : 'Pending'}
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
            Tax Information
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
                GST Number
              </label>
              <Input
                value={formData.gstNumber}
                onChange={(value) => handleInputChange('gstNumber', value)}
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
                PAN Number
              </label>
              <Input
                value={formData.panNumber}
                onChange={(value) => handleInputChange('panNumber', value)}
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
                Tax Category
              </label>
              <Input
                value={formData.taxCategory}
                onChange={(value) => handleInputChange('taxCategory', value)}
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
                GST Registration Type
              </label>
              <Input
                value={formData.gstRegistrationType}
                onChange={(value) => handleInputChange('gstRegistrationType', value)}
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
                Business Category
              </label>
              <Input
                value={formData.businessCategory}
                onChange={(value) => handleInputChange('businessCategory', value)}
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
                Tax Filing Frequency
              </label>
              <Input
                value={formData.taxFilingFrequency}
                onChange={(value) => handleInputChange('taxFilingFrequency', value)}
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
                Last Filing Date
              </label>
              <Input
                value={formData.lastFilingDate}
                onChange={(value) => handleInputChange('lastFilingDate', value)}
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
                Next Filing Date
              </label>
              <Input
                value={formData.nextFilingDate}
                onChange={(value) => handleInputChange('nextFilingDate', value)}
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
                Compliance Status
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {getStatusTag(formData.complianceStatus)}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxInformation; 