import React from 'react';
import { Container, Content, Sidebar, Panel, FlexboxGrid, Stack } from 'rsuite';
import { useTheme } from '../../Theme/theme';
import { getThemeVars } from '../../Theme/themeVars';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import FinancialOverview from './FinancialOverview';
import ChartsSection from './ChartsSection';
import RecentTransactions from './RecentTransactions';
import QuickActions from './QuickActions';

const Dashboard = () => {
  const { theme } = useTheme();
  const {
    bgMain,
    textMain,
    bgSection,
    cardBg,
    cardText,
    borderColor,
    shadow,
    muted
  } = getThemeVars(theme);

  return (
    <Container fluid style={{ background: bgMain, color: textMain, minHeight: '100vh' }}>
      <Content>
        <FlexboxGrid>
          <FlexboxGrid.Item colspan={4} style={{ padding: 0 }}>
            <DashboardSidebar />
          </FlexboxGrid.Item>
          
          <FlexboxGrid.Item colspan={20} style={{ padding: '0 24px' }}>
            <Stack direction="column" spacing={24} style={{ padding: '24px 0' }} alignItems='flex-start'>
              {/* Header */}
              <DashboardHeader />
              
              {/* Financial Overview Cards */}
              <FinancialOverview />
              
              {/* Charts Section */}
              <ChartsSection />
              
              {/* Bottom Section - Recent Transactions & Quick Actions */}
              <FlexboxGrid>
                <FlexboxGrid.Item colspan={16} style={{ paddingRight: 12 }}>
                  <RecentTransactions />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={8} style={{ paddingLeft: 12 }}>
                  <QuickActions />
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Stack>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </Container>
  );
};

export default Dashboard;
