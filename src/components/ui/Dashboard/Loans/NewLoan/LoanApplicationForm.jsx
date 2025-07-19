import React, { useState } from 'react';
import { 
  Input, 
  InputNumber, 
  SelectPicker,  
  DatePicker,
  Button,
  Checkbox,
  Panel,
  Progress
} from 'rsuite';
import { FaUser, FaBuilding, FaHandHoldingUsd, FaCloudUploadAlt, FaCheckCircle, FaFileAlt } from 'react-icons/fa';
import { useTheme } from '../../../../Theme/theme';
import { getThemeVars } from '../../../../Theme/themeVars';

const LoanApplicationForm = ({ onSaveDraft, onPrevious, onContinue }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, cardBorderBottomColor, ctaBg } = getThemeVars(theme);

  // Current step state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Form state
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '+91 9876543210',
    dateOfBirth: null,
    address: '',

    // Business Information
    businessName: '',
    businessType: '',
    yearsInBusiness: 'Less than 1 year',
    monthlyRevenue: 50000,
    gstNumber: '',
    panNumber: '',

    // Loan Details
    loanAmount: 50000,
    loanPurpose: 'Working Capital',
    preferredTenure: 6,
    monthlyIncome: 75000,

    // Additional Information (Step 2)
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    nomineeName: '',
    nomineeRelation: '',
    nomineePhone: '',

    // Review & Submit (Step 3)
    agreeToTerms: false,
    agreeToMarketing: false
  });

  // Options for dropdowns
  const businessTypeOptions = [
    { label: 'Sole Proprietorship', value: 'Sole Proprietorship' },
    { label: 'Partnership', value: 'Partnership' },
    { label: 'Private Limited', value: 'Private Limited' },
    { label: 'Public Limited', value: 'Public Limited' },
    { label: 'LLP', value: 'LLP' }
  ];

  const yearsInBusinessOptions = [
    { label: 'Less than 1 year', value: 'Less than 1 year' },
    { label: '1-2 years', value: '1-2 years' },
    { label: '2-5 years', value: '2-5 years' },
    { label: '5-10 years', value: '5-10 years' },
    { label: 'More than 10 years', value: 'More than 10 years' }
  ];

  const loanPurposeOptions = [
    { label: 'Working Capital', value: 'Working Capital' },
    { label: 'Equipment Purchase', value: 'Equipment Purchase' },
    { label: 'Business Expansion', value: 'Business Expansion' },
    { label: 'Inventory Purchase', value: 'Inventory Purchase' },
    { label: 'Debt Consolidation', value: 'Debt Consolidation' }
  ];

  const tenureOptions = [
    { label: '6 months', value: 6 },
    { label: '12 months', value: 12 },
    { label: '18 months', value: 18 },
    { label: '24 months', value: 24 },
    { label: '36 months', value: 36 }
  ];

  const relationOptions = [
    { label: 'Spouse', value: 'Spouse' },
    { label: 'Parent', value: 'Parent' },
    { label: 'Sibling', value: 'Sibling' },
    { label: 'Child', value: 'Child' },
    { label: 'Other', value: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (documentType) => {
    console.log(`Upload ${documentType}`);
    // File upload logic here
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onContinue();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onPrevious();
    }
  };

  const renderStep1 = () => (
    <>
      {/* Personal Information */}
      <Panel
        header={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FaUser />
            Personal Information
          </div>
        }
        style={{ marginBottom: 24 }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>
              Full Name
            </label>
            <Input
              value={formData.fullName}
              onChange={(value) => handleInputChange('fullName', value)}
              placeholder="Enter your full name"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>
              Email Address
            </label>
            <Input
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              placeholder="your@email.com"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>
              Phone Number
            </label>
            <Input
              value={formData.phone}
              onChange={(value) => handleInputChange('phone', value)}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>
              Date of Birth
            </label>
            <DatePicker
              value={formData.dateOfBirth}
              onChange={(value) => handleInputChange('dateOfBirth', value)}
              placeholder="mm/dd/yyyy"
              style={{ width: '100%' }}
            />
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>
            Address
          </label>
          <Input
            as="textarea"
            value={formData.address}
            onChange={(value) => handleInputChange('address', value)}
            placeholder="Enter your complete address"
            rows={3}
            style={{ width: '100%' }}
          />
        </div>
      </Panel>

      {/* Business Information */}
      <Panel
        header={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FaBuilding />
            Business Information
          </div>
        }
        style={{ marginBottom: 24 }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>
              Business Name
            </label>
            <Input
              value={formData.businessName}
              onChange={(value) => handleInputChange('businessName', value)}
              placeholder="Enter business name"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>
              Business Type
            </label>
            <SelectPicker
              data={businessTypeOptions}
              value={formData.businessType}
              onChange={(value) => handleInputChange('businessType', value)}
              placeholder="Select business type"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>
              Years in Business
            </label>
            <SelectPicker
              data={yearsInBusinessOptions}
              value={formData.yearsInBusiness}
              onChange={(value) => handleInputChange('yearsInBusiness', value)}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>
              Monthly Revenue (₹)
            </label>
            <InputNumber
              value={formData.monthlyRevenue}
              onChange={(value) => handleInputChange('monthlyRevenue', value)}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>
              GST Number
            </label>
            <Input
              value={formData.gstNumber}
              onChange={(value) => handleInputChange('gstNumber', value)}
              placeholder="Enter GST number"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>
              PAN Number
            </label>
            <Input
              value={formData.panNumber}
              onChange={(value) => handleInputChange('panNumber', value)}
              placeholder="Enter PAN number"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </Panel>

      {/* Loan Details */}
      <Panel
        header={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FaHandHoldingUsd />
            Loan Details
          </div>
        }
        style={{ marginBottom: 24 }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>
              Loan Amount Required (₹)
            </label>
            <InputNumber
              value={formData.loanAmount}
              onChange={(value) => handleInputChange('loanAmount', value)}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>
              Loan Purpose
            </label>
            <SelectPicker
              data={loanPurposeOptions}
              value={formData.loanPurpose}
              onChange={(value) => handleInputChange('loanPurpose', value)}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>
              Preferred Tenure
            </label>
            <SelectPicker
              data={tenureOptions}
              value={formData.preferredTenure}
              onChange={(value) => handleInputChange('preferredTenure', value)}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>
              Monthly Income (₹)
            </label>
            <InputNumber
              value={formData.monthlyIncome}
              onChange={(value) => handleInputChange('monthlyIncome', value)}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </Panel>
    </>
  );

  const renderStep2 = () => (
    <>
      {/* Bank Details */}
      <Panel
        header={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FaBuilding />
            Bank Account Details
          </div>
        }
        style={{ marginBottom: 24 }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>
              Bank Name
            </label>
            <Input
              value={formData.bankName}
              onChange={(value) => handleInputChange('bankName', value)}
              placeholder="Enter bank name"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>
              Account Number
            </label>
            <Input
              value={formData.accountNumber}
              onChange={(value) => handleInputChange('accountNumber', value)}
              placeholder="Enter account number"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>
              IFSC Code
            </label>
            <Input
              value={formData.ifscCode}
              onChange={(value) => handleInputChange('ifscCode', value)}
              placeholder="Enter IFSC code"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </Panel>

      {/* Nominee Details */}
      <Panel
        header={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FaUser />
            Nominee Details
          </div>
        }
        style={{ marginBottom: 24 }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>
              Nominee Name
            </label>
            <Input
              value={formData.nomineeName}
              onChange={(value) => handleInputChange('nomineeName', value)}
              placeholder="Enter nominee name"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>
              Relation
            </label>
            <SelectPicker
              data={relationOptions}
              value={formData.nomineeRelation}
              onChange={(value) => handleInputChange('nomineeRelation', value)}
              placeholder="Select relation"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>
              Nominee Phone
            </label>
            <Input
              value={formData.nomineePhone}
              onChange={(value) => handleInputChange('nomineePhone', value)}
              placeholder="Enter nominee phone"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </Panel>

      {/* Document Upload */}
      <Panel
        header={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FaCloudUploadAlt />
            Document Upload
          </div>
        }
        style={{ marginBottom: 24 }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            'Identity Proof (Aadhar/PAN)',
            'Bank Statements (6 months)',
            'Business Registration',
            'Financial Statements'
          ].map((doc, index) => (
            <div
              key={index}
              style={{
                border: `2px dashed ${borderColor}`,
                borderRadius: 8,
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => handleFileUpload(doc)}
            >
              <FaCloudUploadAlt style={{ fontSize: 24, color: muted, marginBottom: 8 }} />
              <div style={{ fontSize: 12, color: muted, marginBottom: 4 }}>{doc}</div>
              <div style={{ fontSize: 10, color: muted }}>Click to upload</div>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );

  const renderStep3 = () => (
    <>
      {/* Application Summary */}
      <Panel
        header={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FaFileAlt />
            Application Summary
          </div>
        }
        style={{ marginBottom: 24 }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 600, color: cardText, marginBottom: 12 }}>Personal Information</h4>
            <div style={{ fontSize: 14, color: muted, marginBottom: 8 }}>Name: {formData.fullName || 'Not provided'}</div>
            <div style={{ fontSize: 14, color: muted, marginBottom: 8 }}>Email: {formData.email || 'Not provided'}</div>
            <div style={{ fontSize: 14, color: muted, marginBottom: 8 }}>Phone: {formData.phone}</div>
          </div>
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 600, color: cardText, marginBottom: 12 }}>Business Information</h4>
            <div style={{ fontSize: 14, color: muted, marginBottom: 8 }}>Business: {formData.businessName || 'Not provided'}</div>
            <div style={{ fontSize: 14, color: muted, marginBottom: 8 }}>Type: {formData.businessType || 'Not selected'}</div>
            <div style={{ fontSize: 14, color: muted, marginBottom: 8 }}>Revenue: ₹{formData.monthlyRevenue?.toLocaleString()}</div>
          </div>
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 600, color: cardText, marginBottom: 12 }}>Loan Details</h4>
            <div style={{ fontSize: 14, color: muted, marginBottom: 8 }}>Amount: ₹{formData.loanAmount?.toLocaleString()}</div>
            <div style={{ fontSize: 14, color: muted, marginBottom: 8 }}>Purpose: {formData.loanPurpose}</div>
            <div style={{ fontSize: 14, color: muted, marginBottom: 8 }}>Tenure: {formData.preferredTenure} months</div>
          </div>
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 600, color: cardText, marginBottom: 12 }}>Bank Details</h4>
            <div style={{ fontSize: 14, color: muted, marginBottom: 8 }}>Bank: {formData.bankName || 'Not provided'}</div>
            <div style={{ fontSize: 14, color: muted, marginBottom: 8 }}>Account: {formData.accountNumber || 'Not provided'}</div>
            <div style={{ fontSize: 14, color: muted, marginBottom: 8 }}>IFSC: {formData.ifscCode || 'Not provided'}</div>
          </div>
        </div>
      </Panel>

      {/* Terms and Conditions */}
      <div style={{ marginBottom: 24 }}>
        <Checkbox
          checked={formData.agreeToTerms}
          onChange={(checked) => handleInputChange('agreeToTerms', checked)}
        >
          <span style={{ fontSize: 14, color: cardText }}>
            I agree to the Terms and Conditions and Privacy Policy. I authorize MicroFin to verify the information provided and perform credit checks.
          </span>
        </Checkbox>
      </div>

      <div style={{ marginBottom: 24 }}>
        <Checkbox
          checked={formData.agreeToMarketing}
          onChange={(checked) => handleInputChange('agreeToMarketing', checked)}
        >
          <span style={{ fontSize: 14, color: cardText }}>
            I agree to receive marketing communications and updates from MicroFin.
          </span>
        </Checkbox>
      </div>
    </>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return renderStep1();
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Personal & Business Information';
      case 2:
        return 'Bank Details & Documents';
      case 3:
        return 'Review & Submit';
      default:
        return 'Loan Application Form';
    }
  };

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
      {/* Progress Header */}
      <div style={{
        marginBottom: 24,
        paddingBottom: 16,
        borderBottom: `1px solid ${borderColor}`
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12
        }}>
          <h3 style={{
            fontSize: 20,
            fontWeight: 600,
            margin: 0,
            color: cardText
          }}>
            {getStepTitle()}
          </h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <span style={{ fontSize: 14, color: muted }}>Step {currentStep} of {totalSteps}</span>
            <FaCheckCircle style={{ color: '#4CAF50', fontSize: 16 }} />
          </div>
        </div>
        
        {/* Progress Bar */}
        <Progress.Line
          percent={(currentStep / totalSteps) * 100}
          strokeColor="#4CAF50"
          showInfo={false}
          style={{ height: 8 }}
        />
      </div>

      {/* Step Content */}
      {renderCurrentStep()}

      {/* Navigation Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 16
      }}>
        <Button
          appearance="ghost"
          size="md"
          style={{
            border: `1px solid ${borderColor}`,
            borderRadius: 8,
            padding: '12px 24px',
            fontWeight: 600
          }}
          onClick={onSaveDraft}
        >
          Save as Draft
        </Button>
        <div style={{ display: 'flex', gap: 12 }}>
          {currentStep > 1 && (
            <Button
              appearance="ghost"
              size="md"
              style={{
                border: `1px solid ${borderColor}`,
                borderRadius: 8,
                padding: '12px 24px',
                fontWeight: 600
              }}
              onClick={handlePrevious}
            >
              Previous
            </Button>
          )}
          <Button
            appearance="primary"
            size="md"
            style={{
              backgroundColor: ctaBg,
              border: 'none',
              borderRadius: 8,
              padding: '12px 24px',
              fontWeight: 600
            }}
            onClick={handleNext}
          >
            {currentStep === totalSteps ? 'Submit Application' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationForm; 