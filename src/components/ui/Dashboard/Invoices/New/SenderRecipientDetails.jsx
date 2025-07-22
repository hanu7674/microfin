import React, { use, useEffect } from 'react';
import { Input, SelectPicker } from 'rsuite';
import { useTheme } from '../../../../Theme/theme';
import { getThemeVars } from '../../../../Theme/themeVars';
import { useBusinessProfile, useClients } from '../../../../../hooks/useDataService';

const SenderRecipientDetails = ({ formData, onFormChange }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, cardBorderBottomColor } = getThemeVars(theme);
  const { clients, clientsLoading, clientsError, fetchClients } = useClients();
  const {profile, loading, error, fetchProfile} = useBusinessProfile();
  useEffect(() => {
    fetchClients();
  }, [fetchClients]);
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if(profile) {
      onFormChange('senderBusinessName', profile?.businessName)
      onFormChange('senderAddress', profile?.businessAddress)
      onFormChange('senderEmail', profile?.contactEmail)
      onFormChange('senderPhone', profile?.phoneNumber)
    }
  }, [profile]);
  const clientOptions = clients?.map(client => ({
    label: client.name,
    value: client.id,
    client
  }));
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
                disabled
                value={profile?.businessName}
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
                disabled
                value={profile?.businessAddress}
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
                  disabled
                  value={profile?.contactEmail}
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
                  disabled
                  value={profile?.phoneNumber}
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
                loading={clientsLoading}
                error={clientsError}
                disabled={clientsLoading}
                data={clientOptions}
                value={formData.selectedClient || ''}
                onChange={(value, item) => {
                   onFormChange('selectedClient', value)
                  onFormChange('clientName', clientOptions?.find(client => client.value === value)?.client?.name)
                  onFormChange('clientAddress', clientOptions?.find(client => client.value === value)?.client?.address)
                  onFormChange('clientEmail', clientOptions?.find(client => client.value === value)?.client?.email)
                 }}
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
                disabled={formData.selectedClient}
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
                disabled={formData.selectedClient}
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
                disabled={formData.selectedClient}
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