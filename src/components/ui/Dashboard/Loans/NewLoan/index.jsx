import React, { useState } from 'react';
import { Grid, Col, Row } from 'rsuite';
import { useTheme } from '../../../../Theme/theme';
import { getThemeVars } from '../../../../Theme/themeVars';
import LoanApplicationHeader from './LoanApplicationHeader';
import LoanCalculator from './LoanCalculator';
import EligibilityCriteria from './EligibilityCriteria';
import LoanApplicationForm from './LoanApplicationForm';

const LoanApplicationPage = () => {
  const { theme } = useTheme();
  const { bgMain } = getThemeVars(theme);
  
  // Event handlers
  const handleSaveDraft = () => {
    console.log('Save as draft clicked');
    // Save form data as draft
  };

  const handlePrevious = () => {
    console.log('Previous clicked');
    // Navigate to previous step
  };

  const handleContinue = () => {
    console.log('Continue to review clicked');
    // Navigate to next step
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
            <LoanApplicationForm 
              onSaveDraft={handleSaveDraft}
              onPrevious={handlePrevious}
              onContinue={handleContinue}
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default LoanApplicationPage;
