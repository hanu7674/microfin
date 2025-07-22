import React, { useState, useEffect } from 'react';
import { Container, Message, Loader, Button, Stack } from 'rsuite';
import BusinessProfileHeader from './BusinessProfileHeader';
import GeneralInfo from './GeneralInfo';
import BankDetails from './BankDetails';
import TaxInformation from './TaxInformation';
import VerificationStatus from './VerificationStatus';
import BusinessDocuments from './BusinessDocuments';
import SubscriptionPlan from './SubscriptionPlan';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { useBusinessProfile } from '../../../../hooks/useDataService';
import { uploadUserDataToBusinessProfile } from '../../../../redux/auth';
import { useDispatch } from 'react-redux';
const BusinessProfile = () => {
  const { theme } = useTheme();
  const { pageBg } = getThemeVars(theme);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('general');
  const [message, setMessage] = useState(null);
  const { profile, loading, error, fetchProfile } = useBusinessProfile();

   useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);
  const handleCreateBusinessProfile = () => {
    dispatch(uploadUserDataToBusinessProfile());
  };
  React.useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (loading) {
    return <Stack justifyContent="center" alignItems="center" style={{ marginTop: 40, padding: '5%' }}><Loader content="Loading business profile..." /></Stack>;
  }

  if (error === 'Business profile not found') {
    return (
      <div style={{ marginTop: 40, padding: '5%' }}>
        <Message type="warning" style={{ marginBottom: 24 }}>
          No business profile found for your account. <Button appearance="link" onClick={handleCreateBusinessProfile}>Create Business Profile</Button>
        </Message>
         
      </div>
    );
  }
  if (error) {
    return (
      <Message type="error" style={{ marginBottom: 24 }}>
        {error}
      </Message>
    );
  }

  const handleTabChange = (key) => {
    setActiveTab(key);
  };


  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralInfo profile={profile} />;
      case 'bank':
        return <BankDetails profile={profile}/>;
      case 'tax':
        return <TaxInformation profile={profile}/>;
      case 'verification':
        return (
          <>
            <VerificationStatus emailVerified={profile?.emailVerified} phoneVerified={profile?.phoneVerified} documentVerification={profile?.documentVerification} userId={profile?.userId} />
            <BusinessDocuments/>
            <SubscriptionPlan />
          </>
        );
      default:
        return <GeneralInfo />;
    }
  };

  return (
    <div style={{ 
      background: pageBg,
      minHeight: '100vh',
      padding: '2%',
      marginTop: '5%'
    }}>
      <Container>
        {message && (
          <Message
            type={message.type}
            style={{ marginBottom: 24 }}
            closable
            onClose={() => setMessage(null)}
          >
            {message.content}
          </Message>
        )}

        <BusinessProfileHeader  
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {renderTabContent()}
      </Container>
    </div>
  );
};

export default BusinessProfile; 