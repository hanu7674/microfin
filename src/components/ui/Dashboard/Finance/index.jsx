import React, { useState } from 'react';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import FinancialReportsHeader from './FinancialReportsHeader';
import FinancialOverviewCards from './FinancialOverviewCards';
 import ChartSection from './ChartSection';
import BusinessTrends from './BusinessTrends';
import { Grid , Row, Col} from 'rsuite';
import RevenueBreakdown from './RevenueBreakdown';

const FinancialReportsPage = () => {
  const { theme } = useTheme();
  const { bgMain } = getThemeVars(theme);
  
  // State management
  const [dateRange, setDateRange] = useState('Last 30 days');

  // Event handlers
  const handleDateRangeChange = (value) => {
    setDateRange(value);
    console.log('Date range changed to:', value);
    // Fetch data for new date range
  };

  const handleExport = () => {
    console.log('Export financial reports');
    // Export logic here
  };

  return (
    <div style={{ marginTop: '5%', backgroundColor: bgMain, padding: "2%" }}>
      <FinancialReportsHeader 
        title="Financial Reports"
        subtitle="Visual charts and reports showing profit/loss, cash flow, and business trends"
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        onExport={handleExport}
        exportText="Export"
      />

       <FinancialOverviewCards />


      <ChartSection />
      <div style={{height: '10px'}}></div>
                <Grid fluid>
                    <Col md={16} sm={16}>
                        <RevenueBreakdown />
                    </Col>
                    <Col md={8} sm={8}>
                        <BusinessTrends />
                    </Col>
                </Grid>
                    
      
    </div>
  );
};

export default FinancialReportsPage; 