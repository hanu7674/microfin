import React from 'react';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { FaCheckCircle, FaClock } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { notify } from 'reapop';
const VerificationStatus = ({ emailVerified, phoneVerified, documentVerification, userId }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, success, warning, cardBorderBottomColor } = getThemeVars(theme);
  const dispatch = useDispatch();
  const verificationItems = [
    {
      id:'email',
      title: 'Email Verified',
      status: emailVerified ? 'Completed' : 'Pending',
      icon: emailVerified ? <FaCheckCircle style={{ color: success }} /> : <FaClock style={{ color: warning }} />,
      color: emailVerified ? success : warning
    },
    {
      id:'phone',
      title: 'Phone Verified',
      status: phoneVerified ? 'Completed' : 'Pending',
      icon: phoneVerified ? <FaCheckCircle style={{ color: success }} /> : <FaClock style={{ color: warning }} />,
      color: phoneVerified ? success : warning
    },
    {
      id:'document',
      title: 'Document Verification',
      status: documentVerification ? 'Completed' : 'Pending',
      icon: documentVerification ? <FaCheckCircle style={{ color: success }} /> : <FaClock style={{ color: warning }} />,
      color: documentVerification ? success : warning
    }
  ];

  const handleVerify = (title) => {
    console.log(title);
    dispatch(notify({
      title: 'Notification',
      message: 'Verification request sent',
      status: 'success',
      dismissible: true,
      dismissAfter: 3000,
      position: 'top-right'
    }))
    // dispatch(updateBusinessProfile(userId, {
    //   [title.toLowerCase()]: true
    // }));
  };

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
                  {item.status === 'Completed' ? 'Verified' : 'Pending'} &nbsp; 
                  {item.status === 'Pending' && <a style={{color: 'blue', textDecoration: 'none', cursor: 'pointer'}} onClick={() => handleVerify(item.id)}> Verify</a>}
                  
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