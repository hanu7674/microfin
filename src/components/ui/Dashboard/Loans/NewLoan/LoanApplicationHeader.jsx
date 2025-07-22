import React from 'react';
  import { FaHome, FaHandHoldingUsd } from 'react-icons/fa';
import { useTheme } from '../../../../Theme/theme';
import { getThemeVars } from '../../../../Theme/themeVars';
import { Link } from 'react-router-dom';
const LoanApplicationHeader = () => {
  const { theme } = useTheme();
  const { cardText, muted } = getThemeVars(theme);

  return (
    <div style={{ marginBottom: 32 }}>
      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb" style={{ marginBottom: 16 }} >
         <ol style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0, fontSize: 13 }}>
           <li>
             <Link to="/dashboard" style={{ textDecoration: 'none', color: '#1677ff', display: 'flex', alignItems: 'center' }}>
                 Home
             </Link>
           </li>
           <li style={{ margin: '0 4px', color: '#aaa' }}>/</li>
           <li>
             <Link to="/dashboard/loans" style={{ textDecoration: 'none', color: '#1677ff', display: 'flex', alignItems: 'center' }}>
               Loans
             </Link>
           </li>
           <li style={{ margin: '0 4px', color: '#aaa' }}>/</li>
           <li style={{ color: '#888', display: 'flex', alignItems: 'center' }}>
              Apply for Loan
           </li>
         </ol>
       </nav>

      {/* Title and Subtitle */}
      <div>
        <h1 style={{ 
          fontSize: 32, 
          fontWeight: 700, 
          margin: 0, 
          marginBottom: 12,
          color: cardText
        }}>
          Apply for Micro-Loan
        </h1>
        <p style={{ 
          fontSize: 16, 
          color: muted,
          margin: 0,
          lineHeight: 1.5
        }}>
          Complete the application form to apply for a business loan tailored to your needs.
        </p>
      </div>
    </div>
  );
};

export default LoanApplicationHeader; 