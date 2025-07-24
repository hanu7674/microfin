import React, { useState } from 'react';
import {  Button,   Loader } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { 
  FaUserPlus, 
  FaHandHoldingUsd, 
  FaFileAlt, 
  FaBell,
  FaUsers,
  FaChartLine
} from 'react-icons/fa';
import { useTheme } from '../../Theme/theme';
import { getThemeVars } from '../../Theme/themeVars';

const QuickActions = ({ dashboardData = null }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow,  muted, cardBorderBottomColor } = getThemeVars(theme);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

   const hasClients = dashboardData?.totalClients > 0;
  const hasLoans = dashboardData?.activeLoans > 0;
  const hasRevenue = dashboardData?.totalRevenue > 0;

   const handleAddNewClient = () => {
    console.log('Navigating to Add New Client...');
     navigate('/dashboard/clients');
  };

  const handleCreateLoan = () => {
    console.log('Navigating to Create Loan...');
     navigate('/dashboard/loans/new');
  };

  const handleGenerateReport = () => {
    console.log('Navigating to Financial Reports...');
     navigate('/dashboard/reports');
  };

  const handleSendReminders = async () => {
    console.log('Sending payment reminders...');
    setIsLoading(true);
    // TODO: Implement reminder sending logic
    try {
       await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Payment reminders sent successfully!');
     } catch (error) {
      console.error('Failed to send reminders:', error);
     } finally {
      setIsLoading(false);
    }
  };

  const handleViewClients = () => {
    console.log('Navigating to Clients...');
    navigate('/dashboard/clients');
  };

  const handleViewAnalytics = () => {
    console.log('Navigating to Analytics...');
    navigate('/dashboard/analytics');
  };

   const generateActions = () => {
    const actions = [];

     actions.push({
      icon: <FaUserPlus />,
      title: 'Add New Client',
      description: 'Register a new client',
      onClick: handleAddNewClient,
      color: '#4CAF50',
      priority: 'high'
    });

     if (!hasLoans) {
      actions.push({
        icon: <FaHandHoldingUsd />,
        title: 'Create Loan',
        description: 'Process a new loan',
        onClick: handleCreateLoan,
        color: '#2196F3',
        priority: 'high'
      });
    } else {
      actions.push({
        icon: <FaHandHoldingUsd />,
        title: 'Manage Loans',
        description: 'View and manage loans',
        onClick: () => navigate('/dashboard/loans'),
        color: '#2196F3',
        priority: 'medium'
      });
    }

     if (hasClients) {
      actions.push({
        icon: <FaUsers />,
        title: 'View Clients',
        description: 'Manage existing clients',
        onClick: handleViewClients,
        color: '#9C27B0',
        priority: 'medium'
      });
    }

     if (hasRevenue || hasLoans) {
      actions.push({
        icon: <FaChartLine />,
        title: 'View Analytics',
        description: 'Check performance metrics',
        onClick: handleViewAnalytics,
        color: '#FF9800',
        priority: 'medium'
      });
    }

     actions.push({
      icon: <FaFileAlt />,
      title: 'Generate Report',
      description: 'Create financial reports',
      onClick: handleGenerateReport,
      color: '#FF9800',
      priority: 'medium'
    });

     if (hasLoans) {
      actions.push({
        icon: <FaBell />,
        title: 'Send Reminders',
        description: 'Send payment reminders',
        onClick: handleSendReminders,
        color: '#9C27B0',
        priority: 'low',
        loading: isLoading
      });
    }

    return actions;
  };

  const actions = generateActions();

  return (
    <div 
      style={{ 
        background: cardBg, 
        color: cardText, 
        border: `1px solid ${borderColor}`,
        boxShadow: shadow,
        borderRadius: 8,
        paddingBottom: '15px'
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
        
      {actions.map((action, index) => (
        <Button
          key={index}
          appearance="ghost"
          onClick={action.loading ? undefined : action.onClick}
          disabled={action.loading}
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
            transition: 'all 0.2s ease',
            cursor: action.loading ? 'not-allowed' : 'pointer',
            opacity: action.loading ? 0.6 : 1
          }}
          onMouseEnter={(e) => {
            if (!action.loading) {
              e.target.style.background = `${action.color}10`;
              e.target.style.borderColor = action.color;
              e.target.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.borderColor = muted;
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <div style={{ 
            fontSize: 16,
            color: action.color
          }}>
            {action.loading ? <Loader size="xs" /> : action.icon}
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontWeight: 600, marginBottom: 2 }}>
              {action.title}
            </div>
            <div style={{ 
              fontSize: 12, 
              opacity: 0.7,
              color: muted
            }}>
              {action.description}
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default QuickActions; 