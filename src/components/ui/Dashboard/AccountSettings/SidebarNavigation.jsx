import React from 'react';
import { Button, Stack } from 'rsuite';
import { FaUser, FaShieldAlt, FaBell, FaCreditCard, FaLink } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const SidebarNavigation = ({ activeTab, onTabChange }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow } = getThemeVars(theme);

  const navigationItems = [
    { key: 'profile', label: 'Profile', icon: <FaUser /> },
    { key: 'security', label: 'Security', icon: <FaShieldAlt /> },
    { key: 'notifications', label: 'Notifications', icon: <FaBell /> },
    { key: 'billing', label: 'Billing', icon: <FaCreditCard /> },
    { key: 'integrations', label: 'Integrations', icon: <FaLink /> }
  ];

  return (
    <div style={{ 
     }}>
      <div style={{
        background: cardBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 8,
        padding: '16px',
        boxShadow: shadow
      }}>
        <Stack direction="column" spacing={8} alignItems='stretch'>
          {navigationItems.map((item) => (
            <Button
              key={item.key}
              appearance={activeTab === item.key ? "primary" : "default"}
              size="md"
              block
              style={{
                justifyContent: 'flex-start',
                textAlign: 'left',
                padding: '12px 16px',
                height: 'auto',
                minHeight: '44px'
              }}
              onClick={() => onTabChange(item.key)}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                width: '100%'
              }}>
                {item.icon}
                <span>{item.label}</span>
              </div>
            </Button>
          ))}
        </Stack>
      </div>
    </div>
  );
};

export default SidebarNavigation; 