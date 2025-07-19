import React from 'react';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { FaTrendingUp, FaClock, FaCheckCircle } from 'react-icons/fa';
import { IoTrendingUpOutline } from 'react-icons/io5';

const PaymentSummaryCards = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, success, warning, info } = getThemeVars(theme);

  const cards = [
    {
      title: "Today's Payments",
      amount: "₹12,450",
      trend: "+8.5% from yesterday",
      icon: <IoTrendingUpOutline style={{ color: success }} />,
      color: success
    },
    {
      title: "Pending Payments",
      amount: "₹3,200",
      trend: "5 transactions",
      icon: <FaClock style={{ color: warning }} />,
      color: warning
    },
    {
      title: "Success Rate",
      amount: "97.8%",
      trend: "Excellent performance",
      icon: <FaCheckCircle style={{ color: success }} />,
      color: success
    }
  ];

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 24
      }}>
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              background: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: 8,
              padding: '2%',
              boxShadow: shadow
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 16
            }}>
              <div>
                <h3 style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: cardText,
                  margin: 0,
                  marginBottom: 8,
                  opacity: 0.8
                }}>
                  {card.title}
                </h3>
                <div style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: cardText,
                  marginBottom: 4
                }}>
                  {card.amount}
                </div>
                <div style={{
                  fontSize: 14,
                  color: card.color,
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}>
                  {card.icon}
                  {card.trend}
                </div>
              </div>
              <div style={{
                fontSize: 24,
                color: card.color,
                opacity: 0.2
              }}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentSummaryCards; 