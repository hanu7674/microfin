import React from 'react';
import { Grid, Row, Col } from 'rsuite';
import SystemPreferencesHeader from './SystemPreferencesHeader';
import GeneralSettings from './GeneralSettings';
import DisplayPreferences from './DisplayPreferences';
import QuickActions from './QuickActions';
import SystemStatus from './SystemStatus';
import UserPermissions from './UserPermissions';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const SystemPreferences = () => {
  const { theme } = useTheme();
  const { pageBg } = getThemeVars(theme);

  return (
    <div style={{ 
      background: pageBg,
      minHeight: '100vh',
      padding: '2%',
      marginTop: '5%'
    }}>
      <>
        <SystemPreferencesHeader />
        
        <Grid fluid>
          <Row gutter={24}>
            {/* Left Column */}
            <Col xs={24} lg={12}>
              <GeneralSettings />
              <DisplayPreferences />
            </Col>
            
            {/* Right Column */}
            <Col xs={24} lg={12}>
              <QuickActions />
              <SystemStatus />
            </Col>
          </Row>
          
          {/* Full Width Section */}
          <Row>
            <Col xs={24}>
              <UserPermissions />
            </Col>
          </Row>
        </Grid>
      </>
    </div>
  );
};

export default SystemPreferences; 