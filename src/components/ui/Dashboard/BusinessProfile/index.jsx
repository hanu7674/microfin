import React, { useState } from 'react';
import { Container, Message } from 'rsuite';
import BusinessProfileHeader from './BusinessProfileHeader';
import GeneralInfo from './GeneralInfo';
import BankDetails from './BankDetails';
import TaxInformation from './TaxInformation';
import VerificationStatus from './VerificationStatus';
import BusinessDocuments from './BusinessDocuments';
import SubscriptionPlan from './SubscriptionPlan';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const BusinessProfile = () => {
  const { theme } = useTheme();
  const { pageBg } = getThemeVars(theme);
  
  const [activeTab, setActiveTab] = useState('general');
  const [message, setMessage] = useState(null);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleEdit = () => {
    setMessage({
      type: 'success',
      content: 'Information updated successfully!'
    });
  };

  const handleUploadDocument = () => {
    setMessage({
      type: 'info',
      content: 'Document upload functionality will be implemented here'
    });
  };

  const handleManagePlan = () => {
    setMessage({
      type: 'info',
      content: 'Plan management will be implemented here'
    });
  };

  // Clear message after 3 seconds
  React.useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralInfo />;
      case 'bank':
        return <BankDetails />;
      case 'tax':
        return <TaxInformation />;
      case 'verification':
        return (
          <>
            <VerificationStatus />
            <BusinessDocuments />
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