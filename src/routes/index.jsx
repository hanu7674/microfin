import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/ui/Auth/Signup/Signup';
import { LoginComponent } from '../components/ui/Auth/Login';
import TermsOfService from '../components/ui/Auth/Terms/TermsOfService';
import PrivacyPolicy from '../components/ui/Auth/Privacy/PrivacyPolicy';
import Dashboard from '../components/ui/Dashboard';

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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
