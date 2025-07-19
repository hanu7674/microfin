import React, { useState } from 'react';
import { Stack, Grid, Row, Col, Panel, Button, Input } from 'rsuite';
import { FaUser, FaCamera } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const ProfileInformation = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);
  
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    businessName: 'Doe Enterprises LLC',
    address: '123 Business Street, Suite 100\nNew York, NY 10001'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Handle save functionality
    console.log('Profile saved:', formData);
  };

  return (
    <Panel
      style={{
        background: cardBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 8,
        boxShadow: shadow
      }}
    >
      <Stack justifyContent="space-between" alignItems="center" style={{
        marginBottom: 24,
        padding: '10px 16px',
        borderBottom: `3px solid ${cardBorderBottomColor}`,
        borderBottomWidth: 1
      }}>
        <div style={{
          fontSize: 18,
          fontWeight: 600,
          color: cardText
        }}>
          Profile Information
        </div>
        <Button appearance="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Stack>

      <div style={{ padding: '0 16px 16px' }}>
        {/* Profile Photo Section */}
        <Stack alignItems="center" spacing={16} style={{ marginBottom: 32 }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px solid ${borderColor}`
          }}>
            <FaUser style={{ fontSize: 32, color: '#666' }} />
          </div>
          <Stack direction="column" spacing={8}>
            <Button appearance="ghost" size="sm">
              <FaCamera style={{ marginRight: 8 }} />
              Change Photo
            </Button>
            <div style={{
              fontSize: 12,
              color: cardText,
              opacity: 0.7
            }}>
              JPG, GIF or PNG. 1MB max.
            </div>
          </Stack>
        </Stack>

        {/* Form Fields */}
        <Grid fluid>
          <Row>
            <Col xs={24} sm={12}>
              <div style={{ marginBottom: 16 }}>
                <label style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: cardText,
                  marginBottom: 8,
                  display: 'block'
                }}>
                  First Name
                </label>
                <Input
                  value={formData.firstName}
                  onChange={(value) => handleInputChange('firstName', value)}
                  style={{ width: '100%' }}
                />
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div style={{ marginBottom: 16 }}>
                <label style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: cardText,
                  marginBottom: 8,
                  display: 'block'
                }}>
                  Last Name
                </label>
                <Input
                  value={formData.lastName}
                  onChange={(value) => handleInputChange('lastName', value)}
                  style={{ width: '100%' }}
                />
              </div>
            </Col>
          </Row>
          
          <Row>
            <Col xs={24} sm={12}>
              <div style={{ marginBottom: 16 }}>
                <label style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: cardText,
                  marginBottom: 8,
                  display: 'block'
                }}>
                  Email Address
                </label>
                <Input
                  value={formData.email}
                  onChange={(value) => handleInputChange('email', value)}
                  style={{ width: '100%' }}
                />
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div style={{ marginBottom: 16 }}>
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
                  value={formData.phone}
                  onChange={(value) => handleInputChange('phone', value)}
                  style={{ width: '100%' }}
                />
              </div>
            </Col>
          </Row>
          
          <Row>
            <Col xs={24}>
              <div style={{ marginBottom: 16 }}>
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
                  style={{ width: '100%' }}
                />
              </div>
            </Col>
          </Row>
          
          <Row>
            <Col xs={24}>
              <div style={{ marginBottom: 16 }}>
                <label style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: cardText,
                  marginBottom: 8,
                  display: 'block'
                }}>
                  Address
                </label>
                <Input as='textarea'
                  value={formData.address}
                  onChange={(value) => handleInputChange('address', value)}
                  rows={3}
                  style={{ width: '100%' }}
                />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    </Panel>
  );
};

export default ProfileInformation; 