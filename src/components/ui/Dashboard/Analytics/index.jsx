import React, { useEffect, useState } from 'react';
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

// Utility to get an array of dates for the last N days
function getLastNDates(n) {
  const arr = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    arr.push(new Date(d));
  }
  return arr;
}
function getLastNMonths(n) {
  const arr = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    arr.push(new Date(d));
  }
  return arr;
}

// Generate fake data for the last 7 days (week)
const last7Days = getLastNDates(7);
const fakeRevenueTrendWeek = last7Days.map((date, i) => ({
  date: date.toISOString().split('T')[0],
  revenue: 12000 + i * 2000 + Math.floor(Math.random() * 1000)
}));
const fakeCustomerAcquisitionWeek = last7Days.map((date) => ({
  date: date.toISOString().split('T')[0],
  customers: 30 + Math.floor(Math.random() * 70)
}));


const fakeKpiData = {
  totalRevenue: { value: 123456, change: 15, trend: 'positive' },
  activeCustomers: { value: 321, change: 7, trend: 'positive' },
  avgTransaction: { value: 250, change: -2, trend: 'negative' },
  growthRate: { value: 22, change: 3, trend: 'positive' }
};

const fakeChartsData = {
   revenueTrend: fakeRevenueTrendWeek,
   customerAcquisition: fakeCustomerAcquisitionWeek,
   paymentMethods: [
    { method: 'Credit Card', percentage: 55, color: '#3498db' },
    { method: 'UPI', percentage: 25, color: '#27ae60' },
    { method: 'Cash', percentage: 10, color: '#f39c12' },
    { method: 'Bank Transfer', percentage: 10, color: '#8e44ad' }
  ],
  // For TopProducts: array of { name, revenue, change, changeType }
  topProducts: [
    { name: 'Product A', revenue: '₹12,000', change: '+10%', changeType: 'positive' },
    { name: 'Product B', revenue: '₹9,500', change: '+5%', changeType: 'positive' },
    { name: 'Product C', revenue: '₹7,800', change: '-2%', changeType: 'negative' }
  ],
  // For BusinessInsights: array of { title, description, color }
  businessInsights: [
    { title: 'High Growth', description: 'Your revenue grew by 25% in the last quarter.', color: '#27ae60' },
    { title: 'Customer Surge', description: 'You acquired 100 new customers this month.', color: '#2980b9' }
  ],
  // For FinancialPerformance: { monthly, quarterly, yearly }
  financialPerformance: {
    monthly: {
      totalIncome: '₹30,000', incomeChange: '+10%',
      totalExpenses: '₹12,000', expensesChange: '+5%',
      netProfit: '₹18,000', profitChange: '+15%'
    },
    quarterly: {
      totalIncome: '₹90,000', incomeChange: '+12%',
      totalExpenses: '₹36,000', expensesChange: '+6%',
      netProfit: '₹54,000', profitChange: '+18%'
    },
    yearly: {
      totalIncome: '₹360,000', incomeChange: '+20%',
      totalExpenses: '₹144,000', expensesChange: '+8%',
      netProfit: '₹216,000', profitChange: '+25%'
    }
  }
};

console.log(
  Array.from({ length: 7 }, (_, i) => ({ date: new Date(Date.now() - i * 24 * 60 * 60 * 1000), customers: Math.floor(Math.random() * 100) })),

);

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

  const [showFakeData, setShowFakeData] = useState(false);
  // Add filter state for RevenueTrend and CustomerAcquisition
  const [revenueRange, setRevenueRange] = useState('6months');
  const [customerRange, setCustomerRange] = useState('6months');

  // Helper to generate fake data for a given range, grouped by month
  function getFakeRevenueTrend(range) {
    let months = 1;
    if (range === '3months') months = 3;
    else if (range === '6months') months = 6;
    else if (range === '12months') months = 12;
    else if (range === 'thisyear') months = new Date().getMonth() + 1;
    const lastNMonths = getLastNMonths(months);
    return lastNMonths.map((date, i) => {
      const month = date.toISOString().slice(0, 7); // YYYY-MM
      return {
        date: month,
        revenue: 12000 + i * 2000 + Math.floor(Math.random() * 1000)
      };
    });
  }
  function getFakeCustomerAcquisition(range) {
    let months = 1;
    if (range === '3months') months = 3;
    else if (range === '6months') months = 6;
    else if (range === '12months') months = 12;
    else if (range === 'thisyear') months = new Date().getMonth() + 1;
    const lastNMonths = getLastNMonths(months);
    return lastNMonths.map((date) => {
      const month = date.toISOString().slice(0, 7); // YYYY-MM
      return {
        date: month,
        customers: 30 + Math.floor(Math.random() * 70)
      };
    });
  }

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

  // Helper to get the right data for each chart
  const getChartData = (key, fallback = []) => {
    if (showFakeData) {
      if (key === 'revenueTrend') return getFakeRevenueTrend(revenueRange);
      if (key === 'customerAcquisition') return getFakeCustomerAcquisition(customerRange);
      return fakeChartsData[key] || fallback;
    }
    if (Array.isArray(chartsData)) {
      // Try to find an object with a matching key property
      const found = chartsData.find(item => item.key === key);
      if (found && found.data) return found.data;
      // fallback: if the array is for a specific chart type and only one chart is present
      if (chartsData.length === 1 && chartsData[0].data) return chartsData[0].data;
      return fallback;
    } else if (chartsData && chartsData[key]) {
      return chartsData[key];
    }
    return fallback;
  };

  const getFinancialPerformance = () => {
    if (showFakeData) return fakeChartsData.financialPerformance;
    if (chartsData && chartsData.financialPerformance) return chartsData.financialPerformance;
    return {};
  };

  return (
    <div style={{ 
      background: pageBg,
      minHeight: '100vh',
      padding: '2%',
      marginTop: '5%'
    }}>
      <Container>
        
        <AnalyticsHeader showFakeData={showFakeData} setShowFakeData={setShowFakeData} />
        <KPICards data={showFakeData ? fakeKpiData : kpiData} />
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          marginBottom: 32
        }}>
          <RevenueTrend data={getChartData('revenueTrend')} selectedRange={revenueRange} setSelectedRange={setRevenueRange} />
          <CustomerAcquisition data={getChartData('customerAcquisition')} selectedRange={customerRange} setSelectedRange={setCustomerRange} />
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          marginBottom: 32
        }}>
          <PaymentMethods data={getChartData('paymentMethods')} />
          <TopProducts data={getChartData('topProducts')} />
          <BusinessInsights data={getChartData('businessInsights')} />
        </div>
        <FinancialPerformance data={getFinancialPerformance()} />
      </Container>
    </div>
  );
};

export default Analytics; 