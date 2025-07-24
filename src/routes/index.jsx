import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
 import { LoginComponent } from '../components/ui/Auth/Login';
import TermsOfService from '../components/ui/Auth/Terms/TermsOfService';
import PrivacyPolicy from '../components/ui/Auth/Privacy/PrivacyPolicy';
import Dashboard from '../components/ui/Dashboard';
import DashboardFrame from '../components/ui/Dashboard/DashboardFrame';
import { dashboardNavItems } from './dashboardNavs';
import TransactionsPage from '../components/ui/Dashboard/Transactions';
import FinancialReportsPage from '../components/ui/Dashboard/Finance';
import LoanDashboardPage from '../components/ui/Dashboard/Loans';
import LoanApplicationPage from '../components/ui/Dashboard/Loans/NewLoan';
import InvoiceDashboardPage from '../components/ui/Dashboard/Invoices';
import CreateInvoice from '../components/ui/Dashboard/Invoices/New';
import PaymentProcessing from '../components/ui/Dashboard/Payments';
import ClientManagement from '../components/ui/Dashboard/Clients';
import NewClient from '../components/ui/Dashboard/Clients/NewClient';
import BusinessProfile from '../components/ui/Dashboard/BusinessProfile';
import Analytics from '../components/ui/Dashboard/Analytics';
import AccountSettings from '../components/ui/Dashboard/AccountSettings';
import SystemPreferences from '../components/ui/Dashboard/SystemPreferences';
import Support from '../components/ui/Dashboard/Support';
 
const Home = lazy(() => import('../components/ui/Home'));
const Signup = lazy(() => import('../components/ui/Auth/Signup'));

function NotFound() {
  return <div style={{ textAlign: 'center', marginTop: 80, fontSize: 24 }}>404 - Page Not Found</div>;
}

function Error403() {
  return <div style={{ textAlign: 'center', marginTop: 80, fontSize: 24, color: '#c00' }}>403 - Forbidden<br />You do not have permission to access this page.</div>;
}

function Error500() {
  return <div style={{ textAlign: 'center', marginTop: 80, fontSize: 24, color: '#c00' }}>500 - Server Error<br />Something went wrong. Please try again later.</div>;
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path='/terms-of-service' element={<TermsOfService />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/error-403" element={<Error403 />} />
        <Route path="/error-500" element={<Error500 />} />
        <Route path="/dashboard" element={<DashboardFrame navs={dashboardNavItems}  />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/transactions" element={<TransactionsPage />} />
          <Route path="/dashboard/reports" element={<FinancialReportsPage />} />
          <Route path="/dashboard/loans" element={<LoanDashboardPage />} />
          <Route path="/dashboard/loans/apply" element={<LoanApplicationPage />} />
          <Route path="/dashboard/invoices" element={<InvoiceDashboardPage />} />
          <Route path="/dashboard/invoices/new" element={<CreateInvoice />} />
          <Route path="/dashboard/payments" element={<PaymentProcessing />} />
          <Route path="/dashboard/clients" element={<ClientManagement />} />
          <Route path="/dashboard/clients/new" element={<NewClient />} />
          <Route path="/dashboard/business-profile" element={<BusinessProfile />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/dashboard/account-settings" element={<AccountSettings />} />
          <Route path="/dashboard/system-preferences" element={<SystemPreferences />} />
          <Route path="/dashboard/support" element={<Support />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
