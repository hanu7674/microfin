import React from 'react';
import { Container, Grid, Row, Col } from 'rsuite';
import SupportHeader from './SupportHeader';
import SupportOverview from './SupportOverview';
import SupportTickets from './SupportTickets';
import CallbackRequests from './CallbackRequests';
import KnowledgeBase from './KnowledgeBase';
import ContactSupport from './ContactSupport';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const Support = () => {
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
        <SupportHeader />
        
        <Grid fluid>
          {/* Support Overview */}
          <Row>
            <Col xs={24}>
              <SupportOverview />
            </Col>
          </Row>
          <SupportTickets />
          
              <CallbackRequests />
          {/* Knowledge Base and Contact Support */}
          <Row gutter={24}>
            <Col xs={24} lg={12}>
              <KnowledgeBase />
            </Col>
            <Col xs={24} lg={12}>
              <ContactSupport />
            </Col>
          </Row>
        </Grid>
      </>
    </div>
  );
};

export default Support; 