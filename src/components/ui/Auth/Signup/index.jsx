import React from 'react';
import { Panel, FlexboxGrid } from 'rsuite';
import Signup from './Signup';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
 const SignupPage = () => {
  const {theme } = useTheme();
  const themeVars = getThemeVars(theme);
  const handleSignInLink = () => alert('Go to sign in (demo)');
  const { user } = useSelector(state => state.auth);
  if (user?.id) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <FlexboxGrid justify="center" align="middle" style={{  background: themeVars.bgSection }}>
      <FlexboxGrid.Item colspan={24} style={{ maxWidth: 560, width: '100%' }}>
        <Panel  style={{ padding: 32, margin: '40px 0', background: themeVars.cardBg }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 4 }}>MicroFin</div>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Create Your Account</div>
            <div style={{ color: '#888', fontSize: 15, marginBottom: 16 }}>Start managing your business finances today</div>
          </div>
          <Signup onSignInLinkClick={handleSignInLink} />
                  </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}

export default SignupPage;