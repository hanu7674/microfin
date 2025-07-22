import React, { useState } from 'react';
import { InputNumber, SelectPicker, Button } from 'rsuite';
import { FaCalculator } from 'react-icons/fa';
import { useTheme } from '../../../../Theme/theme';
import { getThemeVars } from '../../../../Theme/themeVars';

const LoanCalculator = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted } = getThemeVars(theme);

  // State for calculator inputs
  const [loanAmount, setLoanAmount] = useState(50000);
  const [loanTerm, setLoanTerm] = useState(6);
  const [interestRate, setInterestRate] = useState(12);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [calculated, setCalculated] = useState(false);

  // Loan term options
  const termOptions = [
    { label: '6 months', value: 6 },
    { label: '12 months', value: 12 },
    { label: '18 months', value: 18 },
    { label: '24 months', value: 24 },
    { label: '36 months', value: 36 },
    { label: '48 months', value: 48 },
  ];

  // Calculate EMI function
  const calculateEMI = () => {
    // Validate inputs
    const principal = Number(loanAmount) > 0 ? Number(loanAmount) : 0;
    const rate = Number(interestRate) > 0 ? Number(interestRate) / 12 / 100 : 0;
    const time = Number(loanTerm) > 0 ? Number(loanTerm) : 0;

    if (!principal || !rate || !time) {
      setEmi(0);
      setTotalAmount(0);
      setTotalInterest(0);
      setCalculated(false);
      return;
    }

    let emiValue = 0;
    if (rate === 0) {
      emiValue = principal / time;
    } else {
      emiValue = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    }
    emiValue = Math.max(0, Math.round(emiValue));
    const totalAmountValue = Math.max(0, emiValue * time);
    const totalInterestValue = Math.max(0, totalAmountValue - principal);

    setEmi(emiValue);
    setTotalAmount(totalAmountValue);
    setTotalInterest(totalInterestValue);
    setCalculated(true);
  };

  // Handlers to prevent null/negative values and reset calculation
  const handleLoanAmount = (val) => {
    setLoanAmount(val > 0 ? val : 0);
    setCalculated(false);
  };
  const handleLoanTerm = (val) => {
    setLoanTerm(val > 0 ? val : 0);
    setCalculated(false);
  };
  const handleInterestRate = (val) => {
    setInterestRate(val > 0 ? val : 0);
    setCalculated(false);
  };

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
          onChange={handleLoanAmount}
          min={0}
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
          onChange={handleLoanTerm}
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
          Interest Rate (% per annum)
        </label>
        <InputNumber
          value={interestRate}
          onChange={handleInterestRate}
          min={0}
          max={36}
          step={0.1}
          style={{ width: '100%' }}
          placeholder="Enter interest rate"
        />
      </div>

      <Button
        appearance="primary"
        size="md"
        style={{
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
      {calculated && (
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
      )}
    </div>
  );
};

export default LoanCalculator; 