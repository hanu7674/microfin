import React, { useState } from 'react';
import { Grid, Col, Row, Message, Loader } from 'rsuite';
import { useTheme } from '../../../../Theme/theme';
import { getThemeVars } from '../../../../Theme/themeVars';
import LoanApplicationHeader from './LoanApplicationHeader';
import LoanCalculator from './LoanCalculator';
import EligibilityCriteria from './EligibilityCriteria';
import LoanApplicationForm from './LoanApplicationForm';
import { useLoans } from '../../../../../hooks/useDataService';
import { useNavigate } from 'react-router-dom';

const LoanApplicationPage = () => {
  const { theme } = useTheme();
  const { bgMain } = getThemeVars(theme);
  const { createLoan } = useLoans();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Backend submit handler
  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    console.log('Submitting loan application with data:', formData);
    
    try {
      const result = await createLoan(formData);
      console.log('Loan created successfully:', result);
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard/loans');
      }, 1500);
    } catch (err) {
      console.error('Failed to create loan:', err);
      setError(err.message || 'Failed to submit loan application.');
    } finally {
      setLoading(false);
    }
  };

  // Event handlers for draft/steps (optional, not backend)
  const handleSaveDraft = () => {
    console.log('Save as draft clicked');
    // Save form data as draft (optional)
  };

  const handlePrevious = () => {
    console.log('Previous clicked');
    // Navigate to previous step (optional)
  };
  return (
    <div style={{ marginTop: '5%', backgroundColor: bgMain, padding: "2%" }}>
      <LoanApplicationHeader />

      <Grid fluid>
        <Row gutter={24}>
          {/* Left Column - Calculator and Eligibility */}
          <Col md={8} lg={8} sm={24} xs={24} xl={8}>
            <LoanCalculator />
            <EligibilityCriteria />
          </Col>

          {/* Right Column - Application Form */}
          <Col md={16} lg={16} sm={24} xs={24} xl={16}>
            {loading && (
              <div style={{ marginBottom: 16 }}>
                <Loader size="md" content="Submitting application..." />
              </div>
            )}
            {error && (
              <Message type="error" style={{ marginBottom: 16 }}>{error}</Message>
            )}
            {success && (
              <Message type="success" style={{ marginBottom: 16 }}>Loan application submitted successfully!</Message>
            )}
            <LoanApplicationForm 
              onSaveDraft={handleSaveDraft}
              onPrevious={handlePrevious}
               onSubmit={handleSubmit}
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default LoanApplicationPage;
