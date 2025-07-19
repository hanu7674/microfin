import React from 'react';
import { Breadcrumb } from 'rsuite';
import { FaHome, FaHandHoldingUsd } from 'react-icons/fa';
import { useTheme } from '../../../../Theme/theme';
import { getThemeVars } from '../../../../Theme/themeVars';

const LoanApplicationHeader = () => {
  const { theme } = useTheme();
  const { cardText, muted } = getThemeVars(theme);

  return (
    <div style={{ marginBottom: 32 }}>
      {/* Breadcrumbs */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item href="#" icon={<FaHome />}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#" icon={<FaHandHoldingUsd />}>
          Loans
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Apply for Loan</Breadcrumb.Item>
      </Breadcrumb>

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