import React from 'react';
import { Container } from 'rsuite';
import AnalyticsHeader from './AnalyticsHeader';
import KPICards from './KPICards';
import RevenueTrend from './RevenueTrend';
import CustomerAcquisition from './CustomerAcquisition';
import PaymentMethods from './PaymentMethods';
import TopProducts from './TopProducts';
import BusinessInsights from './BusinessInsights';
import FinancialPerformance from './FinancialPerformance';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const Analytics = () => {
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
        <AnalyticsHeader />
        
        {/* KPI Cards Section */}
        <KPICards />
        
        {/* Charts Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          marginBottom: 32
        }}>
          <RevenueTrend />
          <CustomerAcquisition />
        </div>
        
        {/* Analytics Grid Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          marginBottom: 32
        }}>
          <PaymentMethods />
          <TopProducts />
          <BusinessInsights />
        </div>
        
        {/* Financial Performance Section */}
        <FinancialPerformance />
      </Container>
    </div>
  );
};

export default Analytics; 