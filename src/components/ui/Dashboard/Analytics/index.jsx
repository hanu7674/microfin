import React, { useEffect } from 'react';
import { Container, Loader } from 'rsuite';
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
import { useDashboardData } from '../../../../hooks/useDataService';

const Analytics = () => {
  const { theme } = useTheme();
  const { pageBg } = getThemeVars(theme);
  
  const { 
    kpiData, 
    chartsData, 
    loading, 
    error, 
    fetchDashboardData 
  } = useDashboardData();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) {
    return (
      <div style={{ 
        background: pageBg,
        minHeight: '100vh',
        padding: '2%',
        marginTop: '5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Loader size="md" content="Loading analytics..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        background: pageBg,
        minHeight: '100vh',
        padding: '2%',
        marginTop: '5%',
        textAlign: 'center'
      }}>
        <h3>Error loading analytics</h3>
        <p>{error}</p>
      </div>
    );
  }

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
        <KPICards data={kpiData} />
        
        {/* Charts Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          marginBottom: 32
        }}>
          <RevenueTrend data={chartsData} />
          <CustomerAcquisition data={chartsData} />
        </div>
        
        {/* Analytics Grid Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          marginBottom: 32
        }}>
          <PaymentMethods data={chartsData} />
          <TopProducts data={chartsData} />
          <BusinessInsights data={chartsData} />
        </div>
        
        {/* Financial Performance Section */}
        <FinancialPerformance data={chartsData} />
      </Container>
    </div>
  );
};

export default Analytics; 