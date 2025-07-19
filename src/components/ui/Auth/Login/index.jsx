import React, { useState } from 'react';  
import {
  Container,
  Content,
  Panel,
  Divider,
  FlexboxGrid,
  Modal,
  Button
} from 'rsuite';
import { FaChartLine } from 'react-icons/fa';
import LoginForm from './LoginForm';
import SocialLogins from './SocialLogins';

import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import TermsOfService from '../Terms/TermsOfService';
import PrivacyPolicy from '../Privacy/PrivacyPolicy';

export const LoginComponent = () => {
  const {theme } = useTheme();
  const themeVars = getThemeVars(theme);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  return (  
  <Container style={{ background: themeVars.bgSection }}>
    <Content>
      <FlexboxGrid justify="center" align="middle" style={{ minHeight: '90vh' }}>
        <FlexboxGrid.Item colspan={24} md={12} lg={8}>
          <Panel shaded style={{ maxWidth: 500, margin: '0 auto', padding: 32 }}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <FaChartLine size={32} style={{ marginBottom: 8 }} />
              <h4 style={{ margin: 0, fontWeight: 600 }}>Welcome Back</h4>
              <div style={{ color: '#888', fontSize: 15, marginBottom: 8 }}>
                Sign in to your MicroFin account
              </div>
            </div>
            <LoginForm />
            <Divider>Or continue with</Divider>
            <SocialLogins />
            
            <div style={{ fontSize: 12, color: '#888', textAlign: 'center', marginTop: 18 }}>
              By signing in, you agree to our &nbsp;
              <a href="#" style={{ color: '#888', textDecoration: 'underline' }} onClick={() => setShowTerms(true)}>Terms of Service</a> &nbsp;and &nbsp;
              <a href="#" style={{ color: '#888', textDecoration: 'underline' }} onClick={() => setShowPrivacy(true)}>Privacy Policy</a>
            </div>
         
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Content>
    <Modal open={showTerms} onClose={() => setShowTerms(false)} size='lg' style={{ color: themeVars.textMain }}>
        <Modal.Body style={{ background: themeVars.cardBg, color: themeVars.cardText }}>
          <TermsOfService />
         
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <Button appearance="primary" onClick={() => setShowTerms(false)} style={{ background: themeVars.ctaBg, color: themeVars.ctaText }}>Close</Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal open={showPrivacy} onClose={() => setShowPrivacy(false)} size='lg' style={{ color: themeVars.textMain }}>
        <Modal.Body style={{ background: themeVars.cardBg, color: themeVars.cardText }}>
          <PrivacyPolicy />
           
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <Button appearance="primary" onClick={() => setShowPrivacy(false)} style={{ background: themeVars.ctaBg, color: themeVars.ctaText }}>Close</Button>
          </div>
        </Modal.Body>
      </Modal>
  </Container>
);
}
  
