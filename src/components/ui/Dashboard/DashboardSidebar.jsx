import React from 'react';
import { Divider, Nav, Sidenav } from 'rsuite';
import { 
  FaChartLine, 
  FaExchangeAlt, 
  FaFileAlt, 
  FaHandHoldingUsd, 
  FaFileInvoiceDollar, 
  FaCreditCard, 
  FaUsers, 
  FaBuilding, 
  FaChartBar, 
  FaUserCog, 
  FaCog, 
  FaHeadset 
} from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../Theme/theme';
import { getThemeVars } from '../../Theme/themeVars';

const DashboardSidebar = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor } = getThemeVars(theme);
  const location = useLocation();

  const navItems = [
    { icon: <FaChartLine />, title: 'Dashboard', path: '/dashboard' },
    { icon: <FaExchangeAlt />, title: 'Transactions', path: '/transactions' },
    { icon: <FaFileAlt />, title: 'Reports', path: '/reports' },
    { icon: <FaHandHoldingUsd />, title: 'Loans', path: '/loans' },
    { icon: <FaFileInvoiceDollar />, title: 'Invoices', path: '/invoices' },
    { icon: <FaCreditCard />, title: 'Payments', path: '/payments' },
    { icon: <FaUsers />, title: 'Clients', path: '/clients' },
    { icon: <FaBuilding />, title: 'Business Profile', path: '/business-profile' },
    { icon: <FaChartBar />, title: 'Analytics', path: '/analytics' },
    { icon: <FaUserCog />, title: 'Account Settings', path: '/account-settings' },
    { icon: <FaCog />, title: 'System Preferences', path: '/system-preferences' },
    { icon: <FaHeadset />, title: 'Support', path: '/support' },
  ];

  return (
    <Sidenav 
      style={{ 
        background: cardBg, 
        color: cardText, 
        borderRight: `1px solid ${borderColor}`,
        height: '100vh',
        position: 'fixed',
        width: '18%',
        zIndex: 1000
      }}
    >
      <Sidenav.Body style={{ padding: '16px 0' }}>
        <Nav>
          {navItems.map((item, index) => (
            <Nav.Item
              key={index}
              as={NavLink}
              to={item.path}
              icon={item.icon}
              style={{
                color: location.pathname === item.path ? 'var(--color-primary)' : cardText,
                background: location.pathname === item.path ? 'rgba(var(--color-primary-rgb), 0.1)' : 'transparent',
                fontWeight: location.pathname === item.path ? 600 : 400,
                margin: '4px 8px',
                borderRadius: 6,
                padding: '12px 16px',
                position: 'relative',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: 'none',
                outline: 'none',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}
              className="sidebar-nav-item"
            >
              <span>{item.title}</span>
              {location.pathname === item.path && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--color-primary)',
                  borderRadius: '1px',
                  animation: 'slideIn 0.3s ease'
                }} />
              )}
            </Nav.Item>
          ))}
        </Nav>
      </Sidenav.Body>
      
      <style>{`
        .sidebar-nav-item {
          position: relative;
          overflow: hidden;
        }
        
        .sidebar-nav-item:hover {
          background: rgba(var(--color-primary-rgb), 0.05) !important;
          transform: translateX(4px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .sidebar-nav-item:hover::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--color-primary);
          transform: scaleY(0);
          animation: slideDown 0.3s ease forwards;
        }
        
        @keyframes slideIn {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        
        @keyframes slideDown {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
          }
        }
        
        .sidebar-nav-item:active {
          transform: translateX(2px) scale(0.98);
        }
      `}</style>
    </Sidenav>
  );
};

export default DashboardSidebar; 