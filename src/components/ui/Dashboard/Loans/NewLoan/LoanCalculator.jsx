import React, { useState, useEffect } from 'react';
import { Input, InputNumber, SelectPicker, Button } from 'rsuite';
import { FaCalculator } from 'react-icons/fa';
import { useTheme } from '../../../../Theme/theme';
import { getThemeVars } from '../../../../Theme/themeVars';

const LoanCalculator = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, cardBorderBottomColor, ctaBg } = getThemeVars(theme);

  // State for calculator inputs
  const [loanAmount, setLoanAmount] = useState(50000);
  const [loanTerm, setLoanTerm] = useState(6);
  const [interestRate] = useState(12); // Fixed at 12% per annum
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Loan term options
  const termOptions = [
    { label: '6 months', value: 6 },
    { label: '12 months', value: 12 },
    { label: '18 months', value: 18 },
    { label: '24 months', value: 24 },
    { label: '36 months', value: 36 }
  ];

  // Calculate EMI function
  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100; // Monthly interest rate
    const time = loanTerm;

    if (rate === 0) {
      setEmi(principal / time);
    } else {
      const emiValue = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
      setEmi(Math.round(emiValue));
    }

    const totalAmountValue = emi * time;
    const totalInterestValue = totalAmountValue - principal;

    setTotalAmount(totalAmountValue);
    setTotalInterest(totalInterestValue);
  };

  // Calculate EMI when inputs change
  useEffect(() => {
    calculateEMI();
  }, [loanAmount, loanTerm]);

  return (
    <div
      style={{
        background: cardBg,
        color: cardText,
        border: `1px solid ${borderColor}`,
        boxShadow: shadow,
        borderRadius: 8,
        padding: '24px',
        marginBottom: 24
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
        <FaCalculator />
        Loan Calculator
      </h3>

      <div style={{ marginBottom: 16 }}>
        <label style={{
          fontSize: 14,
          fontWeight: 500,
          color: cardText,
          marginBottom: 8,
          display: 'block'
        }}>
          Loan Amount (₹)
        </label>
        <InputNumber
          value={loanAmount}
          onChange={setLoanAmount}
          min={1000}
          max={1000000}
          step={1000}
          style={{ width: '100%' }}
          placeholder="Enter loan amount"
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{
          fontSize: 14,
          fontWeight: 500,
          color: cardText,
          marginBottom: 8,
          display: 'block'
        }}>
          Loan Term (months)
        </label>
        <SelectPicker
          data={termOptions}
          value={loanTerm}
          onChange={setLoanTerm}
          style={{ width: '100%' }}
          placeholder="Select loan term"
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={{
          fontSize: 14,
          fontWeight: 500,
          color: cardText,
          marginBottom: 8,
          display: 'block'
        }}>
          Interest Rate
        </label>
        <Input
          value={`${interestRate}% per annum`}
          readOnly
          style={{ width: '100%' }}
        />
      </div>

      <Button
        appearance="primary"
        size="md"
        style={{
          backgroundColor: ctaBg,
          border: 'none',
          borderRadius: 8,
          padding: '12px 24px',
          fontWeight: 600,
          width: '100%',
          marginBottom: 20
        }}
        onClick={calculateEMI}
      >
        Calculate EMI
      </Button>

      {/* Results */}
      <div style={{
        borderTop: `1px solid ${borderColor}`,
        paddingTop: 16
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 8
        }}>
          <span style={{ fontSize: 14, color: muted }}>Monthly EMI:</span>
          <span style={{ fontSize: 16, fontWeight: 600, color: cardText }}>
          ₹{emi.toLocaleString()}
          </span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 8
        }}>
          <span style={{ fontSize: 14, color: muted }}>Total Interest:</span>
          <span style={{ fontSize: 16, fontWeight: 600, color: cardText }}>
          ₹{totalInterest.toLocaleString()}
          </span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span style={{ fontSize: 14, color: muted }}>Total Amount:</span>
          <span style={{ fontSize: 16, fontWeight: 600, color: cardText }}>
          ₹{totalAmount.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator; 