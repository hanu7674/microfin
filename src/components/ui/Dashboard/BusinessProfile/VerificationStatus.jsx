import React from 'react';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { FaCheckCircle, FaClock } from 'react-icons/fa';

const VerificationStatus = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, success, warning, cardBorderBottomColor } = getThemeVars(theme);

  const verificationItems = [
    {
      title: 'Email Verified',
      status: 'Completed',
      icon: <FaCheckCircle style={{ color: success }} />,
      color: success
    },
    {
      title: 'Phone Verified',
      status: 'Completed',
      icon: <FaCheckCircle style={{ color: success }} />,
      color: success
    },
    {
      title: 'Document Verification',
      status: 'Pending',
      icon: <FaClock style={{ color: warning }} />,
      color: warning
    }
  ];

  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: 8,
          padding: '2%',
          boxShadow: shadow
        }}
      >
        <h3 style={{
          fontSize: 18,
          fontWeight: 600,
          margin: 0,
          marginBottom: 20,
          color: cardText,
          padding: '10px 16px',
          borderBottom: `3px solid ${cardBorderBottomColor}`,
          borderBottomWidth: 1
        }}>
          Verification Status
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 16
        }}>
          {verificationItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '16px',
                border: `1px solid ${borderColor}`,
                borderRadius: 6,
                background: 'transparent'
              }}
            >
              <div style={{
                fontSize: 20,
                color: item.color
              }}>
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: cardText,
                  marginBottom: 4
                }}>
                  {item.title}
                </div>
                <div style={{
                  fontSize: 12,
                  color: item.color,
                  fontWeight: 500
                }}>
                  {item.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerificationStatus; 