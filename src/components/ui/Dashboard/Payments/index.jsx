import React from 'react';
import { Loader, Message, Grid, Row, Col } from 'rsuite';
import PaymentDashboardHeader from './PaymentDashboardHeader';
import PaymentSummaryCards from './PaymentSummaryCards';
import PaymentMethods from './PaymentMethods';
import QuickPaymentLink from './QuickPaymentLink';
import RecentTransactions from './RecentTransactions';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { usePayments } from '../../../../hooks/useDataService';

const PaymentProcessing = () => {
  const { theme } = useTheme();
  const { pageBg } = getThemeVars(theme);
  const { payments, paymentMethods, loading, error } = usePayments();

  return (
    <div style={{ 
      background: pageBg,
      minHeight: '100vh',
      padding: '2%',
      marginTop: '5%'
    }}>
      <>
        <PaymentDashboardHeader />
        {loading && <Loader content="Loading payments..." />}
        {error && <Message type="error">{error}</Message>}
        <PaymentSummaryCards payments={payments} />
        <Grid fluid>
          <Row>
            <Col xs={24} md={24} lg={14} xl={14}>
              <PaymentMethods methods={paymentMethods} />
            </Col>
            <Col xs={24} md={24} lg={10} xl={10}>
              <QuickPaymentLink />
            </Col>
          </Row>
        </Grid>
        <RecentTransactions transactions={payments} />
      </>
    </div>
  );
};

export default PaymentProcessing; 