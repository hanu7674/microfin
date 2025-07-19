import React from 'react';
import { Button } from 'rsuite';
import { 
  FaPlus, 
  FaCreditCard, 
  FaDownload, 
  FaCalculator 
} from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const QuickActions = ({ onApplyLoan, onMakePayment, onDownloadStatement, onEMICalculator }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, cardBorderBottomColor } = getThemeVars(theme);

  const actions = [
    {
      icon: <FaPlus />,
      title: 'Apply for New Loan',
      onClick: onApplyLoan
    },
    {
      icon: <FaCreditCard />,
      title: 'Make Payment',
      onClick: onMakePayment
    },
    {
      icon: <FaDownload />,
      title: 'Download Statement',
      onClick: onDownloadStatement
    },
    {
      icon: <FaCalculator />,
      title: 'EMI Calculator',
      onClick: onEMICalculator
    }
  ];

  return (
    <div
      style={{
        background: cardBg,
        color: cardText,
        border: `1px solid ${borderColor}`,
        boxShadow: shadow,
        borderRadius: 8,
        paddingBottom: '15px',
        marginBottom: 24
      }}
    >
      <h3 style={{
        fontSize: 18,
        fontWeight: 600,
        margin: 0,
        padding: '10px 16px',
        marginBottom: 20,
        color: cardText,
        borderBottom: `3px solid ${cardBorderBottomColor}`,
        borderBottomWidth: 1
      }}>
        Quick Actions
      </h3>
      <div style={{ padding: '0% 5%' }}>
        {actions.map((action, index) => (
          <Button
            key={index}
            appearance="ghost"
            style={{
              margin: "5%",
              width: '90%',
              padding: '12px 16px',
              border: `1px solid ${muted}`,
              borderRadius: 6,
              background: 'transparent',
              color: cardText,
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 14,
              fontWeight: 500,
              transition: 'all 0.2s ease'
            }}
            onClick={action.onClick}
          >
            <div style={{ fontSize: 16 }}>
              {action.icon}
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontWeight: 600, marginBottom: 2 }}>
                {action.title}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions; 