import React, { useState, useEffect } from 'react';
import { Grid, Row, Col, Button, Loader, Message } from 'rsuite';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import LoanDashboardHeader from './LoanDashboardHeader';
import LoanOverviewCards from './LoanOverviewCards';
import ActiveLoans from './ActiveLoans';
import PendingLoans from './PendingLoans';
import ClosedLoans from './ClosedLoans';
import UpcomingPayments from './UpcomingPayments';
import LoanSummary from './LoanSummary';
import QuickActions from './QuickActions';
import LoanTips from './LoanTips';
import { useLoans } from '../../../../hooks/useDataService';
import { useNavigate } from 'react-router-dom';

const LoanDashboardPage = () => {
  const { theme } = useTheme();
  const { bgMain, cardBg, borderColor, shadow } = getThemeVars(theme);
  
  // Get loan data from Redux
  const { loans, loading, error, fetchLoans, createLoan } = useLoans();

  const navigate = useNavigate();

  // Fetch loans on component mount
  useEffect(() => {
    const loadLoans = async () => {
      try {
        console.log('Attempting to fetch loans...');
        await fetchLoans();
        console.log('Fetch loans completed');
      } catch (error) {
        console.error('Failed to load loans:', error);
      }
    };

    // Add a small delay to ensure user authentication is complete
    const timer = setTimeout(() => {
      loadLoans();
    }, 1000);

    return () => clearTimeout(timer);
  }, [fetchLoans]);

  // Process loan data for dashboard display
  const processLoanData = (loans) => {
    if (!loans || loans.length === 0) return { processedLoans: [], summaryData: {} };

    const processedLoans = loans.map(loan => {
      // Calculate loan progress
      const totalPayments = Number(loan.totalPayments) || Number(loan.term) || 0;
      const paymentsCompleted = Number(loan.paymentsCompleted) || 0;
      const progress = totalPayments > 0 ? Math.round((paymentsCompleted / totalPayments) * 100) : 0;

      // Get next payment from EMI schedule
      let nextPayment = null;
      if (loan.emiSchedule && loan.emiSchedule.length > 0) {
        const pendingPayments = loan.emiSchedule.filter(payment => payment.status === 'pending');
        nextPayment = pendingPayments.length > 0 ? pendingPayments[0] : null;
      }

      // Calculate EMI if it's missing or 0
      let displayEMI = Number(loan.emi) || 0;
      if (displayEMI === 0 && loan.principalAmount && loan.interestRate && loan.term) {
        const principal = Number(loan.principalAmount);
        const rate = Number(loan.interestRate) / 12 / 100;
        const time = Number(loan.term);
        
        if (principal > 0 && time > 0) {
          if (rate === 0) {
            displayEMI = principal / time;
          } else {
            displayEMI = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
          }
          displayEMI = Math.round(displayEMI);
        }
      }

      return {
        ...loan,
        progress,
        nextPayment,
        interestRate: loan.interestRate,
        displayName: loan.fullName || loan.businessName || `Loan ${loan.id}`,
        displayAmount: Number(loan.principalAmount) || Number(loan.amount) || Number(loan.loanAmount) || 0,
        displayEMI: displayEMI,
        displayInterestRate: Number(loan.interestRate) || 12
      };
    });

    // Calculate summary data
    const summaryData = {
      totalLoanAmount: processedLoans.filter(loan => loan.status === 'active').reduce((sum, loan) => sum + loan.displayAmount, 0),
      outstandingBalance: processedLoans.filter(loan => loan.status === 'active').reduce((sum, loan) => sum + (Number(loan.outstandingBalance) || loan.displayAmount), 0),
      monthlyEMI: processedLoans.filter(loan => loan.status === 'active').reduce((sum, loan) => sum + loan.displayEMI, 0),
      activeLoans: processedLoans.filter(loan => loan.status === 'active').length,
      totalInterest: processedLoans.filter(loan => loan.status === 'active').reduce((sum, loan) => sum + (Number(loan.interestRate) || 0), 0),
      totalAmount: processedLoans.filter(loan => loan.status === 'active').reduce((sum, loan) => sum + (Number(loan.totalAmount) || 0), 0),
      
      // Historical payment data for Loan Summary
      amountPaid: processedLoans.filter(loan => loan.status === 'active').reduce((sum, loan) => {
        const paymentsCompleted = Number(loan.paymentsCompleted) || 0;
        const emi = Number(loan.emi) || 0;
        return sum + (paymentsCompleted * emi);
      }, 0),
      interestPaid: processedLoans.filter(loan => loan.status === 'active').reduce((sum, loan) => {
        const paymentsCompleted = Number(loan.paymentsCompleted) || 0;
        const emi = Number(loan.emi) || 0;
        const principal = Number(loan.principalAmount) || 0;
        const totalPayments = Number(loan.totalPayments) || 0;
        
        if (totalPayments > 0) {
          const totalInterest = (emi * totalPayments) - principal;
          const interestPerPayment = totalInterest / totalPayments;
          return sum + (paymentsCompleted * interestPerPayment);
        }
        return sum;
      }, 0),
      creditScore: 750 // Default credit score
    };

    return { processedLoans, summaryData };
  };

  // Generate upcoming payments from all loans
  const generateUpcomingPayments = (loans) => {
    const payments = [];
    
    loans.forEach(loan => {
      if (loan.emiSchedule && loan.emiSchedule.length > 0) {
        // Get next 3 pending payments for each loan
        const pendingPayments = loan.emiSchedule
          .filter(payment => payment.status === 'pending')
          .slice(0, 3);
        
        pendingPayments.forEach(payment => {
          payments.push({
            id: `${loan.id}-payment-${payment.month}`,
            loanId: loan.id,
            loanName: loan.displayName,
            amount: payment.emi,
            dueDate: new Date(payment.dueDate).toLocaleDateString('en-IN', { 
              day: 'numeric', 
              month: 'short', 
              year: 'numeric' 
            }),
            status: payment.status,
            isPayable: payment.status === 'pending',
            month: payment.month,
            originalPayment: payment
          });
        });
      }
    });
    
    return payments.sort((a, b) => new Date(a.originalPayment.dueDate) - new Date(b.originalPayment.dueDate));
  };

  // Process data for display
  const { processedLoans, summaryData } = processLoanData(loans);
  const upcomingPayments = generateUpcomingPayments(processedLoans);

  // Filter loans by status
  const activeLoans = processedLoans.filter(loan => loan.status === 'active');
  const pendingLoans = processedLoans.filter(loan => loan.status === 'pending');
  const closedLoans = processedLoans.filter(loan => loan.status === 'completed' || loan.status === 'closed');

  // Debug logging
  useEffect(() => {
    console.log('Raw loans data:', loans);
    console.log('Processed loans:', processedLoans);
    console.log('Active loans:', activeLoans);
    console.log('Pending loans:', pendingLoans);
    console.log('Closed loans:', closedLoans);
    console.log('Summary data:', summaryData);
    console.log('Upcoming payments:', upcomingPayments);
  }, [loans, processedLoans, activeLoans, pendingLoans, closedLoans, summaryData, upcomingPayments]);

  // Event handlers
  const handleApplyLoan = () => {
    console.log('Apply for new loan');
    navigate('/dashboard/loans/apply');
  };

  const handlePayNow = (payment) => {
    console.log('Process payment:', payment);
    // Handle payment processing
  };

  const handleMakePayment = () => {
    console.log('Make a payment');
    // Navigate to payment page
  };

  const handleDownloadStatement = () => {
    console.log('Download loan statement');
    // Handle statement download
  };

  const handleEMICalculator = () => {
    console.log('Open EMI calculator');
    // Open EMI calculator modal
  };

  // Show loading state
  if (loading) {
    return (
      <div style={{ 
        marginTop: '5%', 
        backgroundColor: bgMain, 
        padding: "2%",
        textAlign: 'center'
      }}>
        <div style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: 8,
          boxShadow: shadow,
          padding: '40px 20px',
          margin: '20px 0'
        }}>
          <Loader size="lg" content="Loading loan data..." />
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div style={{ 
        marginTop: '5%', 
        backgroundColor: bgMain, 
        padding: "2%"
      }}>
        <Message type="error" style={{ marginBottom: 20 }}>
          <h4>Error loading loan data</h4>
          <p>{error}</p>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
            This might be because no loans exist yet, there's a permissions issue, or you're not authenticated.
          </p>
        </Message>
        
        <div style={{ 
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: 8,
          boxShadow: shadow,
          padding: '20px',
          marginTop: '20px'
        }}>
          <h5 style={{ marginBottom: '15px' }}>Troubleshooting</h5>
          <p style={{ marginBottom: '15px', color: '#666' }}>
            Please try the following:
          </p>
          <ul style={{ marginBottom: '15px', color: '#666', paddingLeft: '20px' }}>
            <li>Make sure you're logged in</li>
            <li>Check your internet connection</li>
            <li>Try refreshing the page</li>
            <li>Create sample data to test the system</li>
          </ul>
           
          <Button 
            appearance="ghost" 
            onClick={() => fetchLoans()}
            style={{ marginRight: 10 }}
          >
            Retry Loading
          </Button>
          
          <Button 
            appearance="primary" 
            onClick={handleApplyLoan}
          >
            Apply for Loan
          </Button>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!processedLoans || processedLoans.length === 0) {
    return (
      <div style={{ 
        marginTop: '5%', 
        backgroundColor: bgMain, 
        padding: "2%"
      }}>
        <LoanDashboardHeader onApplyLoan={handleApplyLoan} />
        
        <div style={{ 
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: 8,
          boxShadow: shadow,
          padding: '40px 20px',
          margin: '20px 0',
          textAlign: 'center'
        }}>
          <h4 style={{ marginBottom: '15px' }}>No Loans Found</h4>
          <p style={{ marginBottom: '20px', color: '#666' }}>
            You don't have any loans yet. Apply for a loan to get started with our loan management features.
          </p>
           
          <Button 
            appearance="ghost" 
            onClick={() => fetchLoans()}
            style={{ marginRight: 10 }}
          >
            Refresh Loans
          </Button>
          
          <Button 
            appearance="primary" 
            onClick={handleApplyLoan}
          >
            Apply for Loan
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '5%', backgroundColor: bgMain, padding: "2%" }}>
      <LoanDashboardHeader onApplyLoan={handleApplyLoan} />

      <LoanOverviewCards data={summaryData} />

      <Grid fluid>
        <Row gutter={24}>
          {/* Left Column - Main Content */}
          <Col md={16} lg={16} sm={24} xs={24} xl={16}>
            {/* Active Loans */}
            <ActiveLoans data={activeLoans} />
            
            {/* Pending Loans */}
            <PendingLoans data={pendingLoans} />
            
            {/* Closed Loans */}
            <ClosedLoans data={closedLoans} />
            
            <div style={{ marginTop: 24 }}>
              <UpcomingPayments 
                data={upcomingPayments}
                onPayNow={handlePayNow} 
              />
            </div>
          </Col>

          {/* Right Column - Sidebar */}
          <Col md={8} lg={8} sm={24} xs={24} xl={8}>
            <LoanSummary data={summaryData} />
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
