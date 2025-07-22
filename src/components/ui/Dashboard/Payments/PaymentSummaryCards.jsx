import React from 'react';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { FaTrendingUp, FaClock, FaCheckCircle } from 'react-icons/fa';
import { IoTrendingUpOutline } from 'react-icons/io5';

const PaymentSummaryCards = ({ payments = [] }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, success, warning, info } = getThemeVars(theme);

  // Calculate today's payments
  const today = new Date();
  const isToday = (date) => {
    const d = new Date(date);
    return d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear();
  };
  const todaysPayments = payments.filter(p => p.status === 'Success' && p.date && isToday(p.date));
  const todaysAmount = todaysPayments.reduce((sum, p) => sum + (p.amount || 0), 0);

  // Pending payments
  const pendingPayments = payments.filter(p => p.status === 'Pending');
  const pendingAmount = pendingPayments.reduce((sum, p) => sum + (p.amount || 0), 0);

  // Success rate
  const totalPayments = payments.length;
  const successPayments = payments.filter(p => p.status === 'Success').length;
  const successRate = totalPayments > 0 ? ((successPayments / totalPayments) * 100).toFixed(1) : '0.0';

  const cards = [
    {
      title: "Today's Payments",
      amount: `₹${todaysAmount.toLocaleString()}`,
      trend: `${todaysPayments.length} transactions today`,
      icon: <IoTrendingUpOutline style={{ color: success }} />,
      color: success
    },
    {
      title: "Pending Payments",
      amount: `₹${pendingAmount.toLocaleString()}`,
      trend: `${pendingPayments.length} pending`,
      icon: <FaClock style={{ color: warning }} />,
      color: warning
    },
    {
      title: "Success Rate",
      amount: `${successRate}%`,
      trend: `${successPayments} of ${totalPayments} successful`,
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