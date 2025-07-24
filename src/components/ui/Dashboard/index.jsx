import React, { useEffect, useState } from 'react';
import { Grid, Col, Loader } from 'rsuite';
import { useTheme } from '../../Theme/theme';
import { getThemeVars } from '../../Theme/themeVars';
import DashboardHeader from './DashboardHeader';
import FinancialOverview from './FinancialOverview';
import ChartsSection from './ChartsSection';
import RecentTransactions from './RecentTransactions';
import QuickActions from './QuickActions';
import { useDashboardData } from '../../../hooks/useDataService';
 

const Dashboard = () => {
  const { theme } = useTheme();
  const {
    bgMain,
    textMain,
   
  } = getThemeVars(theme);

  const { 
    dashboardData, 
    loading, 
    error, 
    fetchDashboardData 
  } = useDashboardData();

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        await fetchDashboardData();
        setIsDataLoaded(true);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        setIsDataLoaded(true); // Set to true even on error to show error state
      }
    };
    
    loadDashboardData();
  }, [fetchDashboardData]);

  // Show loading state while data is being fetched
  if (loading && !isDataLoaded) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        backgroundColor: bgMain 
      }}>
        <Loader size="md" content="Loading dashboard..." />
      </div>
    );
  }

  // Show error state if there's an error
  if (error && isDataLoaded) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '20px',
        backgroundColor: bgMain,
        color: textMain 
      }}>
        <h3>Error loading dashboard</h3>
        <p>{error}</p>
        <button 
          onClick={() => {
            setIsDataLoaded(false);
            fetchDashboardData();
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  // Transform dashboard data to ensure it's in the correct format
  const transformDashboardData = (data) => {
    if (!data) {
      return {
        totalRevenue: 0,
        totalExpenses: 0,
        netProfit: 0,
        activeLoans: 0,
        totalClients: 0,
        pendingInvoices: 0,
        overduePayments: 0,
        monthlyGrowth: 0,
        // Previous month data for percentage calculations
        previousRevenue: 0,
        previousClients: 0,
        previousProfit: 0,
        previousOverdue: 0,
        chartsData: [],
        recentTransactions: []
      };
    }

    return {
      totalRevenue: data.totalRevenue || 0,
      totalExpenses: data.totalExpenses || 0,
      netProfit: data.netProfit || 0,
      activeLoans: data.activeLoans || 0,
      totalClients: data.totalClients || 0,
      pendingInvoices: data.pendingInvoices || 0,
      overduePayments: data.overduePayments || 0,
      monthlyGrowth: data.monthlyGrowth || 0,
      // Previous month data for percentage calculations
      previousRevenue: data.previousRevenue || 0,
      previousClients: data.previousClients || 0,
      previousProfit: data.previousProfit || 0,
      previousOverdue: data.previousOverdue || 0,
      chartsData: data.chartsData || [],
      recentTransactions: data.recentTransactions || []
    };
  };

  const processedDashboardData = transformDashboardData(dashboardData);

  return (
    <div style={{marginTop: '2%', backgroundColor: bgMain, padding: "2%"}}>
      <DashboardHeader />
      
      <FinancialOverview data={processedDashboardData} />
      
      <div style={{height: '10px'}}></div>
      
      <ChartsSection data={processedDashboardData} />
      
      <div style={{height: '10px'}}></div>
      
      <Grid fluid>
        <Col md={16} sm={16}>
          <RecentTransactions />
        </Col>
        <Col md={8} sm={8}>
          <QuickActions data={processedDashboardData} />
        </Col>
      </Grid>
    </div>
  );
};

export default Dashboard;
