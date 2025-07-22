import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import FinancialReportsHeader from './FinancialReportsHeader';
import FinancialOverviewCards from './FinancialOverviewCards';
import ChartSection from './ChartSection';
import BusinessTrends from './BusinessTrends';
import { Grid, Row, Col, Loader, Message } from 'rsuite';
import RevenueBreakdown from './RevenueBreakdown';
import { useTransactions } from '../../../../hooks/useDataService';
import { FaDollarSign, FaFileAlt, FaChartLine, FaMoneyBillWave } from 'react-icons/fa';
import jsPDF from 'jspdf';

const FinancialReportsPage = () => {
  const { theme } = useTheme();
  const { bgMain, cardBg, cardText, borderColor, shadow } = getThemeVars(theme);
  
  // Get transaction data from Redux
  const { transactions, loading, error, fetchTransactions } = useTransactions();
  
  // State management
  const [dateRange, setDateRange] = useState('Last 30 days');

  // Fetch transactions on component mount
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Filter transactions based on date range
  const filteredTransactions = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    const now = new Date();
    let startDate = new Date();

    switch (dateRange) {
      case 'Last 7 days':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'Last 30 days':
        startDate.setDate(now.getDate() - 30);
        break;
      case 'Last 3 months':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case 'Last 6 months':
        startDate.setMonth(now.getMonth() - 6);
        break;
      case 'Last 1 year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      case 'All time':
        return transactions;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    return transactions.filter(transaction => {
      const transactionDate = transaction.date?.toDate ? transaction.date.toDate() : new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= now;
    });
  }, [transactions, dateRange]);

  // Calculate financial metrics from filtered transaction data
  const financialMetrics = useMemo(() => {
    console.log('Calculating financial metrics from filtered transactions:', filteredTransactions);
    
    if (!filteredTransactions || filteredTransactions.length === 0) {
      console.log('No filtered transactions found, using default metrics');
      return {
        totalRevenue: 0,
        totalExpenses: 0,
        netProfit: 0,
        cashFlow: 0,
        revenueBreakdown: [],
        businessTrends: []
      };
    }

    // Calculate totals
    const incomeTransactions = filteredTransactions.filter(t => t.type === 'income');
    const expenseTransactions = filteredTransactions.filter(t => t.type === 'expense');
    
    console.log('Filtered income transactions:', incomeTransactions.length);
    console.log('Filtered expense transactions:', expenseTransactions.length);
    
    const totalRevenue = incomeTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
    const totalExpenses = expenseTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
    const netProfit = totalRevenue - totalExpenses;
    const cashFlow = netProfit; // Simplified for now

    console.log('Filtered financial calculations:', {
      totalRevenue,
      totalExpenses,
      netProfit,
      cashFlow
    });

    // Calculate revenue breakdown by category
    const revenueByCategory = {};
    incomeTransactions.forEach(transaction => {
      const category = transaction.category || 'Other';
      revenueByCategory[category] = (revenueByCategory[category] || 0) + (transaction.amount || 0);
    });

    console.log('Filtered revenue by category:', revenueByCategory);

    const revenueBreakdown = Object.entries(revenueByCategory)
      .map(([name, amount]) => ({
        name,
        amount: `₹${amount.toLocaleString()}`,
        percentage: totalRevenue > 0 ? `${((amount / totalRevenue) * 100).toFixed(1)}%` : '0%'
      }))
      .sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));

    // Calculate business trends
    const activeLoans = incomeTransactions.filter(t => t.category === 'Loan Interest').length;
    const newClients = incomeTransactions.filter(t => t.category === 'Service Fees').length;
    const defaultRate = expenseTransactions.filter(t => t.category === 'Default').length;
    const portfolioGrowth = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : 0;

    const businessTrends = [
      {
        name: 'Active Loans',
        value: activeLoans.toString()
      },
      {
        name: 'New Clients',
        value: newClients.toString()
      },
      {
        name: 'Loan Default Rate',
        value: totalRevenue > 0 ? `${((defaultRate / incomeTransactions.length) * 100).toFixed(1)}%` : '0%'
      },
      {
        name: 'Portfolio Growth',
        value: `${portfolioGrowth > 0 ? '+' : ''}${portfolioGrowth}%`
      }
    ];

    console.log('Filtered business trends:', businessTrends);

    return {
      totalRevenue,
      totalExpenses,
      netProfit,
      cashFlow,
      revenueBreakdown,
      businessTrends
    };
  }, [filteredTransactions]);

  // Transform financial metrics for FinancialOverviewCards
  const financialOverviewData = useMemo(() => {
    const { totalRevenue, totalExpenses, netProfit, cashFlow } = financialMetrics;
    
    return [
      {
        title: 'Total Revenue',
        value: `₹${totalRevenue.toLocaleString()}`,
        trend: '+0%',
        trendType: 'positive',
        icon: <FaDollarSign />,
        color: '#10b981'
      },
      {
        title: 'Total Expenses',
        value: `₹${totalExpenses.toLocaleString()}`,
        trend: '+0%',
        trendType: 'positive',
        icon: <FaFileAlt />,
        color: '#f59e0b'
      },
      {
        title: 'Net Profit',
        value: `₹${netProfit.toLocaleString()}`,
        trend: netProfit >= 0 ? '+0%' : '-0%',
        trendType: netProfit >= 0 ? 'positive' : 'negative',
        icon: <FaChartLine />,
        color: '#3b82f6'
      },
      {
        title: 'Cash Flow',
        value: `₹${cashFlow.toLocaleString()}`,
        trend: cashFlow >= 0 ? '+0%' : '-0%',
        trendType: cashFlow >= 0 ? 'positive' : 'negative',
        icon: <FaMoneyBillWave />,
        color: '#8b5cf6'
      }
    ];
  }, [financialMetrics]);

  // Generate PDF report
  const generatePDFReport = () => {
    const { totalRevenue, totalExpenses, netProfit, cashFlow, revenueBreakdown, businessTrends } = financialMetrics;
    
    // Helper function to format currency for PDF
    const formatCurrencyForPDF = (amount) => {
      return `Rs. ${amount.toLocaleString()}`;
    };
    
    // Create PDF document
    const pdf = new jsPDF();
    
    // Set font and colors
    pdf.setFont('helvetica');
    pdf.setFontSize(24);
    pdf.setTextColor(0, 0, 0);
    
    // Title
    pdf.text('MICROFINANCE FINANCIAL REPORT', 20, 30);
    
    // Subtitle
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
    pdf.text(`Date Range: ${dateRange}`, 20, 55);
    
    // Add a line separator
    pdf.setDrawColor(200, 200, 200);
    pdf.line(20, 65, 190, 65);
    
    // Executive Summary
    pdf.setFontSize(18);
    pdf.setTextColor(0, 0, 0);
    pdf.text('EXECUTIVE SUMMARY', 20, 85);
    
    // Create a summary table
    pdf.setFontSize(12);
    pdf.setTextColor(50, 50, 50);
    
    // Summary table background
    pdf.setFillColor(245, 245, 245);
    pdf.rect(20, 95, 170, 50, 'F');
    
    // Summary data
    pdf.text('Total Revenue:', 25, 105);
    pdf.text(formatCurrencyForPDF(totalRevenue), 120, 105);
    
    pdf.text('Total Expenses:', 25, 115);
    pdf.text(formatCurrencyForPDF(totalExpenses), 120, 115);
    
    pdf.text('Net Profit:', 25, 125);
    pdf.setTextColor(netProfit >= 0 ? 0 : 255, netProfit >= 0 ? 128 : 0, 0);
    pdf.text(formatCurrencyForPDF(netProfit), 120, 125);
    
    pdf.setTextColor(50, 50, 50);
    pdf.text('Cash Flow:', 25, 135);
    pdf.setTextColor(cashFlow >= 0 ? 0 : 255, cashFlow >= 0 ? 128 : 0, 0);
    pdf.text(formatCurrencyForPDF(cashFlow), 120, 135);
    
    // Reset text color
    pdf.setTextColor(50, 50, 50);
    
    // Revenue Breakdown
    pdf.setFontSize(18);
    pdf.setTextColor(0, 0, 0);
    pdf.text('REVENUE BREAKDOWN', 20, 165);
    
    // Revenue breakdown table
    pdf.setFillColor(245, 245, 245);
    pdf.rect(20, 175, 170, Math.min(revenueBreakdown.length * 15 + 10, 80), 'F');
    
    pdf.setFontSize(12);
    pdf.setTextColor(50, 50, 50);
    let yPos = 185;
    revenueBreakdown.forEach((item, index) => {
      if (yPos > 250) {
        pdf.addPage();
        yPos = 20;
        pdf.setFontSize(18);
        pdf.setTextColor(0, 0, 0);
        pdf.text('REVENUE BREAKDOWN (Continued)', 20, yPos);
        yPos += 20;
        pdf.setFontSize(12);
        pdf.setTextColor(50, 50, 50);
      }
      pdf.text(`${item.name}:`, 25, yPos);
      // Extract amount from the formatted string and reformat for PDF
      const amountValue = item.amount.replace('₹', '').trim();
      pdf.text(`Rs. ${amountValue} (${item.percentage})`, 120, yPos);
      yPos += 15;
    });
    
    // Business Trends
    pdf.setFontSize(18);
    pdf.setTextColor(0, 0, 0);
    pdf.text('BUSINESS TRENDS', 20, yPos + 20);
    
    // Business trends table
    pdf.setFillColor(245, 245, 245);
    pdf.rect(20, yPos + 30, 170, Math.min(businessTrends.length * 15 + 10, 80), 'F');
    
    pdf.setFontSize(12);
    pdf.setTextColor(50, 50, 50);
    yPos += 40;
    businessTrends.forEach((item, index) => {
      if (yPos > 250) {
        pdf.addPage();
        yPos = 20;
        pdf.setFontSize(18);
        pdf.setTextColor(0, 0, 0);
        pdf.text('BUSINESS TRENDS (Continued)', 20, yPos);
        yPos += 20;
        pdf.setFontSize(12);
        pdf.setTextColor(50, 50, 50);
      }
      pdf.text(`${item.name}:`, 25, yPos);
      pdf.text(`${item.value}`, 120, yPos);
      yPos += 15;
    });
    
    // Transaction Summary
    pdf.setFontSize(18);
    pdf.setTextColor(0, 0, 0);
    pdf.text('TRANSACTION SUMMARY', 20, yPos + 20);
    
    // Transaction summary table
    pdf.setFillColor(245, 245, 245);
    pdf.rect(20, yPos + 30, 170, 40, 'F');
    
    pdf.setFontSize(12);
    pdf.setTextColor(50, 50, 50);
    yPos += 40;
    pdf.text(`Total Transactions:`, 25, yPos);
    pdf.text(`${filteredTransactions.length}`, 120, yPos);
    yPos += 15;
    pdf.text(`Income Transactions:`, 25, yPos);
    pdf.text(`${filteredTransactions.filter(t => t.type === 'income').length}`, 120, yPos);
    yPos += 15;
    pdf.text(`Expense Transactions:`, 25, yPos);
    pdf.text(`${filteredTransactions.filter(t => t.type === 'expense').length}`, 120, yPos);
    
    // Footer
    pdf.setFontSize(10);
    pdf.setTextColor(150, 150, 150);
    pdf.text('Generated by MicroFinance Management System', 20, 280);
    
    // Save PDF
    const filename = `financial-report-${dateRange.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(filename);
    
    console.log('PDF report generated for date range:', dateRange);
  };

  // Event handlers
  const handleDateRangeChange = (value) => {
    setDateRange(value);
    console.log('Date range changed to:', value);
    console.log('Filtered transactions count:', filteredTransactions.length);
  };

  const handleExport = () => {
    generatePDFReport();
  };

  // Monitor data changes
  useEffect(() => {
    console.log('Financial metrics updated:', financialMetrics);
    console.log('Filtered transactions count:', filteredTransactions?.length || 0);
  }, [financialMetrics, filteredTransactions]);

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
          <Loader size="lg" content="Loading financial data..." />
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
          <h4>Error loading financial data</h4>
          <p>{error}</p>
        </Message>
      </div>
    );
  }
 
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

      <FinancialOverviewCards data={financialOverviewData} />

      <ChartSection transactions={filteredTransactions} />

      <div style={{height: '10px'}}></div>
      
      <Grid fluid>
        <Col md={16} sm={16}>
          <RevenueBreakdown data={financialMetrics.revenueBreakdown} />
        </Col>
        <Col md={8} sm={8}>
          <BusinessTrends data={financialMetrics.businessTrends} />
        </Col>
      </Grid>
    </div>
  );
};

export default FinancialReportsPage; 