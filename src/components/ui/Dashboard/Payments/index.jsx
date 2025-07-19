import React from 'react';
import { Container } from 'rsuite';
import PaymentDashboardHeader from './PaymentDashboardHeader';
import PaymentSummaryCards from './PaymentSummaryCards';
import PaymentMethods from './PaymentMethods';
import QuickPaymentLink from './QuickPaymentLink';
import RecentTransactions from './RecentTransactions';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const PaymentProcessing = () => {
  const { theme } = useTheme();
  const { pageBg } = getThemeVars(theme);

  return (
    <div style={{ 
      background: pageBg,
      minHeight: '100vh',
      padding: '2%',
      marginTop: '5%'
    }}>
      <Container>
        <PaymentDashboardHeader />
        
        <PaymentSummaryCards />
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          marginBottom: 32
        }}>
          <PaymentMethods />
          <QuickPaymentLink />
        </div>
        
        <RecentTransactions />
      </Container>
    </div>
  );
};

export default PaymentProcessing; 