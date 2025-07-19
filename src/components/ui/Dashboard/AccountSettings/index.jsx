import React, { useState } from 'react';
import { Col, Container, Grid, Row, Stack } from 'rsuite';
import AccountSettingsHeader from './AccountSettingsHeader';
import SidebarNavigation from './SidebarNavigation';
import ProfileInformation from './ProfileInformation';
import SubscriptionBilling from './SubscriptionBilling';
import SecuritySettings from './SecuritySettings';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import Integrations from './Integrations';

const AccountSettings = () => {
  const { theme } = useTheme();
  const { pageBg } = getThemeVars(theme);
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileInformation />;
      case 'billing':
        return <SubscriptionBilling />;
      case 'security':
        return <SecuritySettings />;
      case 'notifications':
        return (
          <div style={{ 
            padding: '40px', 
            textAlign: 'center', 
            color: '#666' 
          }}>
            Notifications settings will be implemented here
          </div>
        );
      case 'integrations':
        return <Integrations/>;
      default:
        return <ProfileInformation />;
    }
  };

  return (
    <div style={{ 
      background: pageBg,
      minHeight: '100vh',
      padding: '2%',
      marginTop: '5%'
    }}>
      <>
        <AccountSettingsHeader />
        <Grid fluid>
          <Row gutter={20}>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{marginBottom:'4%'}}>
            <Row>
                 <SidebarNavigation 
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
                </Row>
                </Col>
                <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                   {renderContent()}
              </Col>
          </Row>
        </Grid>
        
      </>
    </div>
  );
};

export default AccountSettings; 