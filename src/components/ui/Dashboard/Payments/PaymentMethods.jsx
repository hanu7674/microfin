import React from 'react';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { FaQrcode, FaCreditCard, FaUniversity, FaWallet } from 'react-icons/fa';

const PaymentMethods = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, success, warning, cardBorderBottomColor } = getThemeVars(theme);

  const paymentMethods = [
    {
      title: "QR Code Payments",
      methods: "UPI, PayTM, GPay, PhonePe",
      status: "Active",
      statusColor: success,
      icon: <FaQrcode />
    },
    {
      title: "Card Payments",
      methods: "Visa, Mastercard, RuPay",
      status: "Active",
      statusColor: success,
      icon: <FaCreditCard />
    },
    {
      title: "Bank Transfer",
      methods: "NEFT, RTGS, IMPS",
      status: "Active",
      statusColor: success,
      icon: <FaUniversity />
    },
    {
      title: "Digital Wallets",
      methods: "PayTM, Amazon Pay, etc.",
      status: "Setup Required",
      statusColor: warning,
      icon: <FaWallet />
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
          Payment Methods
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {paymentMethods.map((method, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                border: `1px solid ${borderColor}`,
                borderRadius: 6,
                background: 'transparent'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  fontSize: 20,
                  color: cardText,
                  opacity: 0.8
                }}>
                  {method.icon}
                </div>
                <div>
                  <div style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: cardText,
                    marginBottom: 4
                  }}>
                    {method.title}
                  </div>
                  <div style={{
                    fontSize: 14,
                    color: cardText,
                    opacity: 0.7
                  }}>
                    {method.methods}
                  </div>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: method.statusColor
                }} />
                <span style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: method.statusColor
                }}>
                  {method.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods; 