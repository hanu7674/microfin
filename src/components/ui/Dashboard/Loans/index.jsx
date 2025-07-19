import React, { useState } from 'react';
import { Grid, Col, Row } from 'rsuite';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import LoanDashboardHeader from './LoanDashboardHeader';
import LoanOverviewCards from './LoanOverviewCards';
import ActiveLoans from './ActiveLoans';
import UpcomingPayments from './UpcomingPayments';
import LoanSummary from './LoanSummary';
import QuickActions from './QuickActions';
import LoanTips from './LoanTips';
import { useNavigate } from 'react-router-dom';

const LoanDashboardPage = () => {
  const { theme } = useTheme();
  const { bgMain } = getThemeVars(theme);
  const navigate = useNavigate();
  // Event handlers
  const handleApplyLoan = () => {
    console.log('Apply for loan clicked');
    navigate('/dashboard/loans/new');
  };

  const handlePayNow = (payment) => {
    console.log('Pay now clicked for payment:', payment);
    // Open payment modal/form
  };

  const handleMakePayment = () => {
    console.log('Make payment clicked');
    // Open payment options
  };

  const handleDownloadStatement = () => {
    console.log('Download statement clicked');
    // Generate and download statement
  };

  const handleEMICalculator = () => {
    console.log('EMI calculator clicked');
    // Open EMI calculator modal
  };

  return (
    <div style={{ marginTop: '5%', backgroundColor: bgMain, padding: "2%" }}>
      <LoanDashboardHeader onApplyLoan={handleApplyLoan} />

      <LoanOverviewCards />

      <Grid fluid>
        <Row gutter={24}>
          {/* Left Column - Main Content */}
          <Col md={16} lg={16} sm={24} xs={24} xl={16}>
            <ActiveLoans />
            <div style={{ marginTop: 24 }}>
              <UpcomingPayments onPayNow={handlePayNow} />
            </div>
          </Col>

          {/* Right Column - Sidebar */}
          <Col md={8} lg={8} sm={24} xs={24} xl={8}>
            <LoanSummary />
            <QuickActions 
              onApplyLoan={handleApplyLoan}
              onMakePayment={handleMakePayment}
              onDownloadStatement={handleDownloadStatement}
              onEMICalculator={handleEMICalculator}
            />
            <LoanTips />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default LoanDashboardPage;
