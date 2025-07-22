import React, { useMemo } from 'react';
import { Panel, Stack, FlexboxGrid, IconButton, Tooltip } from 'rsuite';
import { FaEllipsisV, FaChartLine, FaChartBar } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
  ComposedChart
} from 'recharts';
import { BsFillPieChartFill } from 'react-icons/bs';

const ChartSection = ({ transactions = [] }) => {
  const { theme } = useTheme();
  const { cardBg, textMain, borderColor, shadow, muted } = getThemeVars(theme);

  // Calculate chart data from transactions
  const chartData = useMemo(() => {
    console.log('Calculating chart data from filtered transactions:', transactions);
    
    if (!transactions || transactions.length === 0) {
      console.log('No filtered transactions for charts, returning empty data');
      return {
        profitLossData: [],
        cashFlowData: [],
        revenuePieData: [],
        loanPortfolioData: [],
        clientGrowthData: [],
        repaymentRateData: [],
        riskAnalysisData: []
      };
    }

    // Group transactions by month for profit/loss trend
    const monthlyData = {};
    transactions.forEach(transaction => {
      const date = transaction.date?.toDate ? transaction.date.toDate() : new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { income: 0, expenses: 0 };
      }
      
      if (transaction.type === 'income') {
        monthlyData[monthKey].income += transaction.amount || 0;
      } else {
        monthlyData[monthKey].expenses += transaction.amount || 0;
      }
    });

    console.log('Filtered monthly data grouped:', monthlyData);

    // Convert to chart format
    const profitLossData = Object.entries(monthlyData)
      .map(([month, data]) => ({
        month,
        income: data.income,
        expenses: data.expenses,
        profit: data.income - data.expenses
      }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6); // Last 6 months

    console.log('Filtered profit/loss chart data:', profitLossData);

    // Cash flow data (cumulative)
    let cumulativeCash = 0;
    const cashFlowData = profitLossData.map(item => {
      cumulativeCash += item.profit;
      return {
        month: item.month,
        cashFlow: cumulativeCash
      };
    });

    console.log('Filtered cash flow chart data:', cashFlowData);

    // Monthly cash flow changes for waterfall chart
    const monthlyCashFlowChanges = profitLossData.map((item, index) => {
      const change = item.profit; // Monthly profit/loss
      return {
        month: item.month,
        change: change
      };
    });

    console.log('Filtered monthly cash flow changes:', monthlyCashFlowChanges);

    // Revenue breakdown for pie chart
    const revenueByCategory = {};
    transactions
      .filter(t => t.type === 'income')
      .forEach(transaction => {
        const category = transaction.category || 'Other';
        revenueByCategory[category] = (revenueByCategory[category] || 0) + (transaction.amount || 0);
      });

    console.log('Filtered revenue by category:', revenueByCategory);

    const revenuePieData = Object.entries(revenueByCategory)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // Top 5 categories

    console.log('Filtered revenue pie chart data:', revenuePieData);

    // Loan Portfolio Analysis
    const loanPortfolioByCategory = {};
    transactions
      .filter(t => t.type === 'loan')
      .forEach(transaction => {
        const category = transaction.category || 'Other';
        loanPortfolioByCategory[category] = (loanPortfolioByCategory[category] || 0) + (transaction.amount || 0);
      });

    console.log('Filtered loan portfolio by category:', loanPortfolioByCategory);

    const loanPortfolioData = Object.entries(loanPortfolioByCategory)
      .map(([name, value]) => ({ category: name, amount: value }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5); // Top 5 categories

    console.log('Filtered loan portfolio data:', loanPortfolioData);

    // Client Growth Trend
    const clientGrowthByMonth = {};
    transactions
      .filter(t => t.type === 'client')
      .forEach(transaction => {
        const monthKey = `${transaction.date?.toDate ? transaction.date.toDate().getFullYear() : new Date(transaction.date).getFullYear()}-${String(transaction.date?.toDate ? transaction.date.toDate().getMonth() + 1 : new Date(transaction.date).getMonth() + 1).padStart(2, '0')}`;
        clientGrowthByMonth[monthKey] = (clientGrowthByMonth[monthKey] || 0) + 1;
      });

    console.log('Filtered client growth by month:', clientGrowthByMonth);

    const clientGrowthData = Object.entries(clientGrowthByMonth)
      .map(([month, count]) => ({ month, newClients: count }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6); // Last 6 months

    console.log('Filtered client growth data:', clientGrowthData);

    // Repayment Rate Analysis
    const repaymentRateByMonth = {};
    transactions
      .filter(t => t.type === 'repayment')
      .forEach(transaction => {
        const monthKey = `${transaction.date?.toDate ? transaction.date.toDate().getFullYear() : new Date(transaction.date).getFullYear()}-${String(transaction.date?.toDate ? transaction.date.toDate().getMonth() + 1 : new Date(transaction.date).getMonth() + 1).padStart(2, '0')}`;
        repaymentRateByMonth[monthKey] = (repaymentRateByMonth[monthKey] || 0) + (transaction.amount || 0);
      });

    console.log('Filtered repayment rate by month:', repaymentRateByMonth);

    const repaymentRateData = Object.entries(repaymentRateByMonth)
      .map(([month, totalRepayments]) => {
        const totalLoans = transactions
          .filter(t => t.type === 'loan' && t.date?.toDate ? new Date(t.date.toDate()).getMonth() + 1 === new Date(month).getMonth() + 1 : new Date(t.date).getMonth() + 1 === new Date(month).getMonth() + 1)
          .reduce((sum, t) => sum + (t.amount || 0), 0);
        const repaymentRate = totalLoans > 0 ? (totalRepayments / totalLoans) * 100 : 0;
        return { month, repaymentRate };
      })
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6); // Last 6 months

    console.log('Filtered repayment rate data:', repaymentRateData);

    // Risk Analysis Dashboard
    const riskAnalysisByCategory = {};
    transactions
      .filter(t => t.type === 'default' || t.type === 'risk')
      .forEach(transaction => {
        const category = transaction.category || 'Other';
        riskAnalysisByCategory[category] = (riskAnalysisByCategory[category] || 0) + (transaction.amount || 0);
      });

    console.log('Filtered risk analysis by category:', riskAnalysisByCategory);

    const riskAnalysisData = Object.entries(riskAnalysisByCategory)
      .map(([name, exposure]) => ({ category: name, exposure, recoveryRate: 0 })) // Recovery rate is not directly available from transactions, needs calculation
      .sort((a, b) => b.exposure - a.exposure)
      .slice(0, 5); // Top 5 categories

    console.log('Filtered risk analysis data:', riskAnalysisData);

    return {
      profitLossData,
      cashFlowData,
      monthlyCashFlowChanges,
      revenuePieData,
      loanPortfolioData,
      clientGrowthData,
      repaymentRateData,
      riskAnalysisData
    };
  }, [transactions]);

  // Chart colors
  const colors = ['#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ef4444', '#06b6d4'];

  // Custom tooltip component for profit/loss chart
  const CustomTooltip = ({ active, payload, label, cardBg, borderColor, textMain }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: 8,
          padding: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ 
            fontSize: 14, 
            fontWeight: 600, 
            color: textMain, 
            marginBottom: 8 
          }}>
            {label}
          </div>
          {payload.map((entry, index) => {
            const labelMap = {
              'income': 'Income',
              'expenses': 'Expenses', 
              'profit': 'Profit'
            };
            return (
              <div key={index} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 8,
                marginBottom: 4
              }}>
                <div style={{
                  width: 12,
                  height: 12,
                  borderRadius: 2,
                  backgroundColor: entry.color
                }} />
                <span style={{ 
                  fontSize: 12, 
                  color: textMain,
                  fontWeight: 500
                }}>
                  {labelMap[entry.dataKey] || entry.dataKey}:
                </span>
                <span style={{ 
                  fontSize: 12, 
                  color: textMain,
                  fontWeight: 600
                }}>
                  ₹{entry.value.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <FlexboxGrid>
      {/* Profit & Loss Trend Chart */}
      <FlexboxGrid.Item colspan={12} style={{ padding: '0 8px', marginBottom: 16 }}>
        <Panel
          style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            boxShadow: shadow,
            borderRadius: 8,
            minHeight: '400px'
          }}
        >
          <Stack justifyContent="space-between" alignItems="center" style={{ marginBottom: 24 }}>
            <h3 style={{ 
              fontSize: 18, 
              fontWeight: 600, 
              margin: 0, 
              color: muted 
            }}>
              Profit & Loss Trend
            </h3>
            <Tooltip title="Chart options">
              <IconButton 
                icon={<FaEllipsisV />} 
                size="sm" 
                appearance="subtle"
                style={{ color: muted }}
              />
            </Tooltip>
          </Stack>

          {chartData.profitLossData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData.profitLossData}>
                <CartesianGrid strokeDasharray="3 3" stroke={muted} />
                <XAxis 
                  dataKey="month" 
                  stroke={textMain}
                  fontSize={12}
                />
                <YAxis 
                  stroke={textMain}
                  fontSize={12}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                />
                <RechartsTooltip 
                  content={<CustomTooltip cardBg={cardBg} borderColor={borderColor} textMain={textMain} />}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Income"
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Expenses"
                />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Profit"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '300px',
              color: muted,
              textAlign: 'center'
            }}>
              <FaChartLine size={48} style={{ marginBottom: 16 }} />
              <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>
                No transaction data available
              </div>
              <div style={{ fontSize: 14 }}>
                Add some transactions to see profit/loss trends
              </div>
            </div>
          )}
        </Panel>
      </FlexboxGrid.Item>
      {/* Cash Flow Analysis Chart */}
      <FlexboxGrid.Item colspan={12} style={{ padding: '0 8px', marginBottom: 16 }}>
        <Panel
          style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            boxShadow: shadow,
            borderRadius: 8,
            minHeight: '400px'
          }}
        >
          <Stack justifyContent="space-between" alignItems="center" style={{ marginBottom: 24 }}>
            <h3 style={{ 
              fontSize: 18, 
              fontWeight: 600, 
              margin: 0, 
              color: muted 
            }}>
              Cumulative Cash Flow Trend
            </h3>
            <Tooltip title="Chart options">
              <IconButton 
                icon={<FaEllipsisV />} 
                size="sm" 
                appearance="subtle"
                style={{ color: muted }}
              />
            </Tooltip>
          </Stack>

          {chartData.cashFlowData.length > 0 ? (
            <>
              {/* Cash Flow Trend (Area Chart) */}
              <div >
                 
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData.cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={muted} />
                    <XAxis 
                      dataKey="month" 
                      stroke={textMain}
                      fontSize={10}
                    />
                    <YAxis 
                      stroke={textMain}
                      fontSize={10}
                      tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                    />
                    <RechartsTooltip 
                      contentStyle={{
                        backgroundColor: cardBg,
                        border: `1px solid ${borderColor}`,
                        borderRadius: 8,
                        color: textMain
                      }}
                      formatter={(value) => [`₹${value.toLocaleString()}`, 'Cash Flow']}
                    />
                    <Area 
                      type="monotone"
                      dataKey="cashFlow" 
                      fill="#8b5cf6"
                      stroke="#8b5cf6"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              

              
            </>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '300px',
              color: muted,
              textAlign: 'center'
            }}>
              <FaChartBar size={48} style={{ marginBottom: 16 }} />
              <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>
                No transaction data available
              </div>
              <div style={{ fontSize: 14 }}>
                Add some transactions to see cash flow analysis
              </div>
            </div>
          )}
        </Panel>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={12} style={{ padding: '0 8px', marginBottom: 16 }}>
        <Panel
          style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            boxShadow: shadow,
            borderRadius: 8,
            minHeight: '400px'
          }}
        >
          <Stack justifyContent="space-between" alignItems="center" style={{ marginBottom: 24 }}>
            <h3 style={{ 
              fontSize: 18, 
              fontWeight: 600, 
              margin: 0, 
              color: muted 
            }}>
              Monthly Cash Flow Changes
            </h3>
            <Tooltip title="Chart options">
              <IconButton 
                icon={<FaEllipsisV />} 
                size="sm" 
                appearance="subtle"
                style={{ color: muted }}
              />
            </Tooltip>
          </Stack>
          {chartData.cashFlowData.length > 0 ? (
            <>
            {/* Monthly Cash Flow Changes (Waterfall Chart) */}
            <div >
                
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={chartData.monthlyCashFlowChanges}>
                    <CartesianGrid strokeDasharray="3 3" stroke={muted} />
                    <XAxis 
                      dataKey="month" 
                      stroke={textMain}
                      fontSize={10}
                    />
                    <YAxis 
                      stroke={textMain}
                      fontSize={10}
                      tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                    />
                    <RechartsTooltip 
                      contentStyle={{
                        backgroundColor: cardBg,
                        border: `1px solid ${borderColor}`,
                        borderRadius: 8,
                        color: textMain
                      }}
                      formatter={(value) => [`₹${value.toLocaleString()}`, 'Monthly Change']}
                    />
                    <Bar 
                      dataKey="change" 
                      fill={(entry) => entry.change >= 0 ? '#10b981' : '#ef4444'}
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '300px',
              color: muted,
              textAlign: 'center'
            }}>
              <FaChartBar size={48} style={{ marginBottom: 16 }} />
              <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>
                No transaction data available
              </div>
              <div style={{ fontSize: 14 }}>
                Add some transactions to see cash flow analysis
              </div>
            </div>
          )}
        </Panel>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={12} style={{ padding: '0 8px', marginBottom: 16 }}>
        <Panel
          style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            boxShadow: shadow,
            borderRadius: 8,
            minHeight: '400px'
          }}
        >
          <Stack justifyContent="space-between" alignItems="center" style={{ marginBottom: 24 }}>
            <h3 style={{ 
              fontSize: 18, 
              fontWeight: 600, 
              margin: 0, 
              color: muted 
            }}>
              Income vs Expenses
            </h3>
            <Tooltip title="Chart options">
              <IconButton 
                icon={<FaEllipsisV />} 
                size="sm" 
                appearance="subtle"
                style={{ color: muted }}
              />
            </Tooltip>
          </Stack>

          {chartData.cashFlowData.length > 0 ? (
            <>
              {/* Income vs Expenses (Stacked Bar Chart) */}
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: textMain, marginBottom: 8 }}>
                  
                </div>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={chartData.profitLossData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={muted} />
                    <XAxis 
                      dataKey="month" 
                      stroke={textMain}
                      fontSize={10}
                    />
                    <YAxis 
                      stroke={textMain}
                      fontSize={10}
                      tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                    />
                    <RechartsTooltip 
                      contentStyle={{
                        backgroundColor: cardBg,
                        border: `1px solid ${borderColor}`,
                        borderRadius: 8,
                        color: textMain
                      }}
                      formatter={(value, name) => [
                        `₹${value.toLocaleString()}`,
                        name === 'income' ? 'Income' : 'Expenses'
                      ]}
                    />
                    <Bar dataKey="income" stackId="a" fill="#10b981" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="expenses" stackId="a" fill="#ef4444" radius={[0, 0, 2, 2]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              

              
            </>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '300px',
              color: muted,
              textAlign: 'center'
            }}>
              <FaChartBar size={48} style={{ marginBottom: 16 }} />
              <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>
                No transaction data available
              </div>
              <div style={{ fontSize: 14 }}>
                Add some transactions to see cash flow analysis
              </div>
            </div>
          )}
        </Panel>
      </FlexboxGrid.Item>
      {/* Revenue Breakdown Pie Chart */}
      <FlexboxGrid.Item colspan={24} style={{ padding: '0 8px', marginBottom: 16 }}>
        <Panel
          style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            boxShadow: shadow,
            borderRadius: 8,
            minHeight: '400px'
          }}
        >
          <Stack justifyContent="space-between" alignItems="center" style={{ marginBottom: 24 }}>
            <h3 style={{ 
              fontSize: 18, 
              fontWeight: 600, 
              margin: 0, 
              color: muted 
            }}>
              Revenue Breakdown
            </h3>
            <Tooltip title="Chart options">
              <IconButton 
                icon={<FaEllipsisV />} 
                size="sm" 
                appearance="subtle"
                style={{ color: muted }}
              />
            </Tooltip>
          </Stack>

          {chartData.revenuePieData.length > 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <ResponsiveContainer width="60%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData.revenuePieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.revenuePieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{
                      backgroundColor: cardBg,
                      border: `1px solid ${borderColor}`,
                      borderRadius: 8,
                      color: muted
                    }}
                    formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Custom Legend */}
              <div style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 12,
                padding: '20px 0'
              }}>
                <div style={{ 
                  fontSize: 16, 
                  fontWeight: 600, 
                  color: muted, 
                  marginBottom: 16 
                }}>
                  Revenue Breakdown
                </div>
                {chartData.revenuePieData.map((entry, index) => {
                  const percentage = chartData.revenuePieData.reduce((sum, item) => sum + item.value, 0) > 0 
                    ? ((entry.value / chartData.revenuePieData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)
                    : '0.0';
                  
                  return (
                    <div key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 12,
                      padding: '8px 0'
                    }}>
                      <div style={{
                        width: 16,
                        height: 16,
                        borderRadius: 4,
                        backgroundColor: colors[index % colors.length],
                        flexShrink: 0
                      }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          fontSize: 14, 
                          fontWeight: 500, 
                          color: textMain,
                          marginBottom: 2
                        }}>
                          {entry.name}
                        </div>
                        <div style={{ 
                          fontSize: 12, 
                          color: muted 
                        }}>
                          ₹{entry.value.toLocaleString()} ({percentage}%)
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '300px',
              color: muted,
              textAlign: 'center'
            }}>
              <BsFillPieChartFill  size={48} style={{ marginBottom: 16 }} />
              <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>
                No revenue data available
              </div>
              <div style={{ fontSize: 14 }}>
                Add income transactions to see revenue breakdown
              </div>
            </div>
          )}
        </Panel>
      </FlexboxGrid.Item>

      {/* Loan Portfolio Analysis */}
      <FlexboxGrid.Item colspan={12} style={{ padding: '0 8px', marginBottom: 16 }}>
        <Panel
          style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            boxShadow: shadow,
            borderRadius: 8,
            minHeight: '400px'
          }}
        >
          <Stack justifyContent="space-between" alignItems="center" style={{ marginBottom: 24 }}>
            <h3 style={{ 
              fontSize: 18, 
              fontWeight: 600, 
              margin: 0, 
              color: muted 
            }}>
              Loan Portfolio Analysis
            </h3>
            <Tooltip title="Chart options">
              <IconButton 
                icon={<FaEllipsisV />} 
                size="sm" 
                appearance="subtle"
                style={{ color: muted }}
              />
            </Tooltip>
          </Stack>

          {chartData.loanPortfolioData && chartData.loanPortfolioData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.loanPortfolioData}>
                <CartesianGrid strokeDasharray="3 3" stroke={muted} />
                <XAxis 
                  dataKey="category" 
                  stroke={textMain}
                  fontSize={12}
                />
                <YAxis 
                  stroke={textMain}
                  fontSize={12}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                />
                <RechartsTooltip 
                  contentStyle={{
                    backgroundColor: cardBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: 8,
                    color: textMain
                  }}
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Loan Amount']}
                />
                <Bar 
                  dataKey="amount" 
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '300px',
              color: muted,
              textAlign: 'center'
            }}>
              <FaChartBar size={48} style={{ marginBottom: 16 }} />
              <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>
                No loan portfolio data available
              </div>
              <div style={{ fontSize: 14 }}>
                Add loan transactions to see portfolio analysis
              </div>
            </div>
          )}
        </Panel>
      </FlexboxGrid.Item>

      {/* Client Growth Trend */}
      <FlexboxGrid.Item colspan={12} style={{ padding: '0 8px', marginBottom: 16 }}>
        <Panel
          style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            boxShadow: shadow,
            borderRadius: 8,
            minHeight: '400px'
          }}
        >
          <Stack justifyContent="space-between" alignItems="center" style={{ marginBottom: 24 }}>
            <h3 style={{ 
              fontSize: 18, 
              fontWeight: 600, 
              margin: 0, 
              color: muted 
            }}>
              Client Growth Trend
            </h3>
            <Tooltip title="Chart options">
              <IconButton 
                icon={<FaEllipsisV />} 
                size="sm" 
                appearance="subtle"
                style={{ color: muted }}
              />
            </Tooltip>
          </Stack>

          {chartData.clientGrowthData && chartData.clientGrowthData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData.clientGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke={muted} />
                <XAxis 
                  dataKey="month" 
                  stroke={textMain}
                  fontSize={12}
                />
                <YAxis 
                  stroke={textMain}
                  fontSize={12}
                />
                <RechartsTooltip 
                  contentStyle={{
                    backgroundColor: cardBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: 8,
                    color: textMain
                  }}
                  formatter={(value) => [value, 'New Clients']}
                />
                <Line 
                  type="monotone" 
                  dataKey="newClients" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="New Clients"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '300px',
              color: muted,
              textAlign: 'center'
            }}>
              <FaChartLine size={48} style={{ marginBottom: 16 }} />
              <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>
                No client growth data available
              </div>
              <div style={{ fontSize: 14 }}>
                Add client transactions to see growth trends
              </div>
            </div>
          )}
        </Panel>
      </FlexboxGrid.Item>

      {/* Repayment Rate Analysis */}
      <FlexboxGrid.Item colspan={12} style={{ padding: '0 8px', marginBottom: 16 }}>
        <Panel
          style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            boxShadow: shadow,
            borderRadius: 8,
            minHeight: '400px'
          }}
        >
          <Stack justifyContent="space-between" alignItems="center" style={{ marginBottom: 24 }}>
            <h3 style={{ 
              fontSize: 18, 
              fontWeight: 600, 
              margin: 0, 
              color: muted 
            }}>
              Repayment Rate Analysis
            </h3>
            <Tooltip title="Chart options">
              <IconButton 
                icon={<FaEllipsisV />} 
                size="sm" 
                appearance="subtle"
                style={{ color: muted }}
              />
            </Tooltip>
          </Stack>

          {chartData.repaymentRateData && chartData.repaymentRateData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.repaymentRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke={muted} />
                <XAxis 
                  dataKey="month" 
                  stroke={textMain}
                  fontSize={12}
                />
                <YAxis 
                  stroke={textMain}
                  fontSize={12}
                  tickFormatter={(value) => `${value}%`}
                />
                <RechartsTooltip 
                  contentStyle={{
                    backgroundColor: cardBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: 8,
                    color: textMain
                  }}
                  formatter={(value) => [`${value}%`, 'Repayment Rate']}
                />
                <Bar 
                  dataKey="repaymentRate" 
                  fill={(entry) => entry.repaymentRate >= 90 ? '#10b981' : entry.repaymentRate >= 70 ? '#f59e0b' : '#ef4444'}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '300px',
              color: muted,
              textAlign: 'center'
            }}>
              <FaChartBar size={48} style={{ marginBottom: 16 }} />
              <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>
                No repayment data available
              </div>
              <div style={{ fontSize: 14 }}>
                Add repayment transactions to see rate analysis
              </div>
            </div>
          )}
        </Panel>
      </FlexboxGrid.Item>

      {/* Risk Analysis Dashboard */}
      <FlexboxGrid.Item colspan={12} style={{ padding: '0 8px', marginBottom: 16 }}>
        <Panel
          style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            boxShadow: shadow,
            borderRadius: 8,
            minHeight: '400px'
          }}
        >
          <Stack justifyContent="space-between" alignItems="center" style={{ marginBottom: 24 }}>
            <h3 style={{ 
              fontSize: 18, 
              fontWeight: 600, 
              margin: 0, 
              color: muted 
            }}>
              Risk Analysis Dashboard
            </h3>
            <Tooltip title="Chart options">
              <IconButton 
                icon={<FaEllipsisV />} 
                size="sm" 
                appearance="subtle"
                style={{ color: muted }}
              />
            </Tooltip>
          </Stack>

          {chartData.riskAnalysisData && chartData.riskAnalysisData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={chartData.riskAnalysisData}>
                <CartesianGrid strokeDasharray="3 3" stroke={muted} />
                <XAxis 
                  dataKey="category" 
                  stroke={textMain}
                  fontSize={12}
                />
                <YAxis 
                  stroke={textMain}
                  fontSize={12}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                />
                <RechartsTooltip 
                  contentStyle={{
                    backgroundColor: cardBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: 8,
                    color: textMain
                  }}
                  formatter={(value, name) => [
                    `₹${value.toLocaleString()}`,
                    name === 'exposure' ? 'Risk Exposure' : 'Recovery Rate'
                  ]}
                />
                <Bar dataKey="exposure" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="recoveryRate" stroke="#10b981" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '300px',
              color: muted,
              textAlign: 'center'
            }}>
              <FaChartLine size={48} style={{ marginBottom: 16 }} />
              <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>
                No risk analysis data available
              </div>
              <div style={{ fontSize: 14 }}>
                Add default/risk transactions to see analysis
              </div>
            </div>
          )}
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default ChartSection; 