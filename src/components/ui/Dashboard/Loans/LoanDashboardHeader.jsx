import React from 'react';
import { Button, Stack } from 'rsuite';
import { FaPlus } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const LoanDashboardHeader = ({ onApplyLoan }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, ctaBg } = getThemeVars(theme);

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 16
      }}>
        <div>
          <h1 style={{ 
            fontSize: 28, 
            fontWeight: 700, 
            margin: 0, 
            marginBottom: 8,
            color: cardText
          }}>
            Loan Dashboard
          </h1>
          <p style={{ 
            fontSize: 16, 
            color: cardText,
            margin: 0,
            opacity: 0.8
          }}>
            Manage your loans and repayment schedules
          </p>
        </div>
        <Button
          appearance="primary"
          size="md"
          style={{
            backgroundColor: ctaBg,
            border: 'none',
            borderRadius: 8,
            padding: '12px 24px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
          onClick={onApplyLoan}
        >
          <FaPlus />
          Apply for Loan
        </Button>
      </div>
    </div>
  );
};

export default LoanDashboardHeader; 