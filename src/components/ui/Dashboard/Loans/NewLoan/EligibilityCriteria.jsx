import React from 'react';
import { FaInfoCircle, FaCheck } from 'react-icons/fa';
import { useTheme } from '../../../../Theme/theme';
import { getThemeVars } from '../../../../Theme/themeVars';

const EligibilityCriteria = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow } = getThemeVars(theme);

  const criteria = [
    'Minimum 6 months business operation',
    'Monthly revenue of ₹25,000+',
    'Valid business registration',
    'Good credit score (650+)'
  ];

  return (
    <div
      style={{
        background: cardBg,
        color: cardText,
        border: `1px solid ${borderColor}`,
        boxShadow: shadow,
        borderRadius: 8,
        padding: '24px'
      }}
    >
      <h3 style={{
        fontSize: 18,
        fontWeight: 600,
        margin: 0,
        marginBottom: 20,
        color: cardText,
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}>
        <FaInfoCircle />
        Eligibility Criteria
      </h3>

      <div>
        {criteria.map((criterion, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 12,
              padding: '8px 0'
            }}
          >
            <div style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: '#4CAF50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <FaCheck style={{ fontSize: 12, color: 'white' }} />
            </div>
            <span style={{
              fontSize: 14,
              color: cardText,
              lineHeight: 1.4
            }}>
              {criterion}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EligibilityCriteria; 