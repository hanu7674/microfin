import React from 'react';
import { Container, Content, Sidebar, Panel, FlexboxGrid, Stack, Grid, Col } from 'rsuite';
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
    <div style={{marginTop: '2%', backgroundColor: bgMain, padding: "2%"}}>
      <>     
           
               <DashboardHeader />
              
               <FinancialOverview />
              <div style={{height: '10px'}}></div>
               <ChartsSection />
              <div style={{height: '10px'}}></div>
                <Grid fluid>
                    <Col md={16} sm={16}>
                        <RecentTransactions />
                    </Col>
                    <Col md={8} sm={8}>
                        <QuickActions />
                    </Col>
                </Grid>
                    
               
       </>
    </div>
  );
};

export default Dashboard;
