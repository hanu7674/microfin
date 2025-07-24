import React, { useState, useRef, useEffect } from 'react';
import { 
  Input, 
  InputNumber, 
  SelectPicker,  
  DatePicker,
  Button,
  Checkbox,
  Panel,
  Progress,
  Message,
  IconButton,
  Grid,
  Row,
  Col
} from 'rsuite';
import { FaUser, FaBuilding, FaHandHoldingUsd, FaCloudUploadAlt, FaCheckCircle, FaFileAlt, FaTimes, FaFile, FaDownload } from 'react-icons/fa';
import { useTheme } from '../../../../Theme/theme';
import { getThemeVars } from '../../../../Theme/themeVars';
import { storage, auth } from '../../../../../Firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';

const LoanApplicationForm = ({ onSaveDraft, onPrevious, onSubmit }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, ctaBg, muted } = getThemeVars(theme);
 
  // Current step state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Authentication state
  const [authUser, setAuthUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setAuthLoading(false);
      console.log('Auth state changed:', user ? user.uid : 'No user');
    });

    return () => unsubscribe();
  }, []);

  // Helper function to get current user
  const getCurrentUser = () => {
    if (authLoading) {
      throw new Error('Authentication state is loading. Please wait.');
    }
    if (!authUser) {
      throw new Error('User not authenticated. Please log in again.');
    }
    return authUser;
  };

  // Initial form state
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: null,
    address: '',

    // Business Information
    businessName: '',
    businessType: '',
    yearsInBusiness: '',
    monthlyRevenue: '',
    gstNumber: '',
    panNumber: '',

    // Loan Details
    loanAmount: 50000,
    loanPurpose: '',
    preferredTenure: 6,
    emiDate: 15, // Default EMI date (15th of each month)

    // Financial Information
    monthlyIncome: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    
    // Nominee Information
    nomineeName: '',
    nomineeRelation: '',
    nomineePhone: '',

    // Terms
    agreeToTerms: false,
    agreeToMarketing: false
  });

  // File upload state
  const [uploadedFiles, setUploadedFiles] = useState({
    'Identity Proof (Aadhar/PAN)': null,
    'Bank Statements (6 months)': null,
    'Business Registration': null,
    'Financial Statements': null
  });

  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadErrors, setUploadErrors] = useState({});

  // File validation constants
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

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

  // File validation
  const validateFile = (file) => {
    if (!file) return { valid: false, error: 'No file selected' };
    
    if (file.size > MAX_FILE_SIZE) {
      return { valid: false, error: 'File size must be less than 10MB' };
    }
    
    if (!ALLOWED_TYPES.includes(file.type)) {
      return { valid: false, error: 'Only PDF, DOC, DOCX, JPG, PNG files are allowed' };
    }
    
    return { valid: true, error: null };
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle file selection
  const handleFileSelect = (event, documentType) => {
    const file = event.target.files[0];
    if (!file) return;

    const validation = validateFile(file);
    
    if (!validation.valid) {
      setUploadErrors(prev => ({
        ...prev,
        [documentType]: validation.error
      }));
      return;
    }

    // Clear any previous errors
    setUploadErrors(prev => ({
      ...prev,
      [documentType]: null
    }));

    // Start upload progress
    setUploadProgress(prev => ({
      ...prev,
      [documentType]: 0
    }));

    // Get current user with better error handling
    let currentUser;
    try {
      currentUser = getCurrentUser();
    } catch (error) {
      console.error('Authentication error:', error);
      setUploadErrors(prev => ({
        ...prev,
        [documentType]: error.message
      }));
      setUploadProgress(prev => ({
        ...prev,
        [documentType]: 0
      }));
      return;
    }
    
    console.log('Current user:', currentUser); // Debug log
    
    if (!currentUser.uid) {
      setUploadErrors(prev => ({
        ...prev,
        [documentType]: 'User ID not available. Please refresh the page.'
      }));
      setUploadProgress(prev => ({
        ...prev,
        [documentType]: 0
      }));
      return;
    }

    // Create unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${documentType.replace(/[^a-zA-Z0-9]/g, '_')}_${timestamp}.${fileExtension}`;
    const storagePath = `loan-applications/${currentUser.uid}/${fileName}`;
    
    console.log('Storage path:', storagePath); // Debug log
    
    // Create storage reference
    const storageRef = ref(storage, storagePath);
    
    // Small delay to ensure progress state is visible
    setTimeout(() => {
      // Upload file
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          // Progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload progress for ${documentType}:`, progress); // Debug log
          setUploadProgress(prev => ({
            ...prev,
            [documentType]: progress
          }));
        },
        (error) => {
          // Error
          console.error('Upload error:', error);
          console.error('Error code:', error.code);
          console.error('Error message:', error.message);
          
          let errorMessage = 'Upload failed';
          if (error.code === 'storage/unauthorized') {
            errorMessage = 'Permission denied. Please check your authentication.';
          } else if (error.code === 'storage/quota-exceeded') {
            errorMessage = 'Storage quota exceeded.';
          } else if (error.code === 'storage/retry-limit-exceeded') {
            errorMessage = 'Upload failed due to network issues. Please try again.';
          } else {
            errorMessage = `Upload failed: ${error.message}`;
          }
          
          setUploadErrors(prev => ({
            ...prev,
            [documentType]: errorMessage
          }));
          setUploadProgress(prev => ({
            ...prev,
            [documentType]: 0
          }));
        },
        () => {
          // Success
          console.log('Upload completed, getting download URL...'); // Debug log
          
          // Keep progress at 95% while getting download URL
          setUploadProgress(prev => ({
            ...prev,
            [documentType]: 95
          }));
          
          // Add a small delay to ensure the file is fully processed
          setTimeout(() => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                console.log('Download URL obtained:', downloadURL); // Debug log
                setUploadedFiles(prev => ({
                  ...prev,
                  [documentType]: {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    lastModified: file.lastModified,
                    storagePath: storagePath,
                    downloadURL: downloadURL,
                    uploadedAt: new Date().toISOString()
                  }
                }));
                // Set progress to 100 only after everything is complete
                setUploadProgress(prev => ({
                  ...prev,
                  [documentType]: 100
                }));
              })
              .catch((error) => {
                console.error('Error getting download URL:', error);
                console.error('Error code:', error.code);
                console.error('Error message:', error.message);
                
                // Even if download URL fails, we can still save the file info
                // The file is uploaded successfully, we just can't get the download URL
                setUploadedFiles(prev => ({
                  ...prev,
                  [documentType]: {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    lastModified: file.lastModified,
                    storagePath: storagePath,
                    downloadURL: null, // Will be null but file is uploaded
                    uploadedAt: new Date().toISOString()
                  }
                }));
                // Set progress to 100 even if download URL fails
                setUploadProgress(prev => ({
                  ...prev,
                  [documentType]: 100
                }));
                
                // Show a warning but don't treat it as a complete failure
                setUploadErrors(prev => ({
                  ...prev,
                  [documentType]: 'File uploaded successfully but download link unavailable. File is still accessible.'
                }));
              });
          }, 1000); // 1 second delay
        }
      );
    }, 100); // Small delay to ensure progress state is visible

    // Clear the input
    event.target.value = '';
  };

  // Remove uploaded file
  const removeFile = async (documentType) => {
    const fileData = uploadedFiles[documentType];
    
    if (fileData && fileData.storagePath) {
      try {
        // Delete from Firebase Storage
        const storageRef = ref(storage, fileData.storagePath);
        await deleteObject(storageRef);
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }

    setUploadedFiles(prev => ({
      ...prev,
      [documentType]: null
    }));
    setUploadProgress(prev => ({
      ...prev,
      [documentType]: 0
    }));
    setUploadErrors(prev => ({
      ...prev,
      [documentType]: null
    }));
  };

  // Download file from Firebase Storage
  const downloadFile = async (fileData) => {
    if (fileData.downloadURL) {
      // Open in new tab for download
      window.open(fileData.downloadURL, '_blank');
    } else if (fileData.storagePath) {
      // Try to get download URL again if it was null
      try {
        console.log('Attempting to get download URL for:', fileData.storagePath);
        const storageRef = ref(storage, fileData.storagePath);
        const downloadURL = await getDownloadURL(storageRef);
        console.log('Download URL obtained:', downloadURL);
        window.open(downloadURL, '_blank');
      } catch (error) {
        console.error('Failed to get download URL:', error);
        // Show user-friendly message
        alert('Unable to download file. The file is uploaded but download link is not available. Please contact support if you need to access this file.');
      }
    } else if (fileData.file) {
      // Fallback for local files (for demo purposes)
      const url = URL.createObjectURL(fileData.file);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileData.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      alert('No download method available for this file.');
    }
  };

  // Clean form data for Firestore submission
  const cleanFormDataForSubmission = (data) => {
    const cleaned = { ...data };
    
    // Ensure boolean fields are properly set
    cleaned.agreeToTerms = Boolean(data.agreeToTerms);
    cleaned.agreeToMarketing = Boolean(data.agreeToMarketing);
    
    // Remove any undefined values
    Object.keys(cleaned).forEach(key => {
      if (cleaned[key] === undefined) {
        cleaned[key] = null;
      }
    });
    
    // Add uploaded files info with Firebase Storage data
    cleaned.uploadedDocuments = Object.entries(uploadedFiles).map(([docType, fileData]) => ({
      documentType: docType,
      fileName: fileData?.name || null,
      fileSize: fileData?.size || null,
      fileType: fileData?.type || null,
      storagePath: fileData?.storagePath || null,
      downloadURL: fileData?.downloadURL || null,
      uploadedAt: fileData?.uploadedAt || null,
      uploaded: !!fileData
    }));
    
    // Loan calculation parameters
    const loanAmount = Number(data.loanAmount) || 0;
    const interestRate = 12; // Annual interest rate in percentage
    const tenure = Number(data.preferredTenure) || 6; // Loan term in months
    
    // Calculate EMI using the standard formula
    const monthlyInterestRate = interestRate / (12 * 100);
    let emi = 0;
    let totalInterest = 0;
    let totalAmount = 0;
    
    if (loanAmount > 0 && tenure > 0) {
      const principal = Number(loanAmount);
      const rate = Number(interestRate) / 12 / 100;
      const time = Number(tenure);
      
      console.log('EMI calculation parameters:', {
        principal,
        rate,
        time,
        monthlyInterestRate
      });
      
      if (rate === 0) {
        emi = principal / time;
      } else {
        emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
      }
      emi = Math.max(0, Math.round(emi));
      
      // Calculate total amount and interest
      totalAmount = Math.max(0, emi * time);
      totalInterest = Math.max(0, totalAmount - principal);
      
      console.log('EMI calculation results:', {
        emi,
        totalAmount,
        totalInterest
      });
    }
    
    // Generate EMI schedule
    const emiSchedule = [];
    const startDate = new Date();
    const emiDay = Number(data.emiDate) || 15; // Use selected EMI date or default to 15th
    let remainingPrincipal = loanAmount;
    
    for (let month = 1; month <= tenure; month++) {
      const dueDate = new Date(startDate);
      dueDate.setMonth(dueDate.getMonth() + month);
      dueDate.setDate(emiDay); // Set to selected EMI date
      
      const interestComponent = (remainingPrincipal * monthlyInterestRate);
      const principalComponent = emi - interestComponent;
      remainingPrincipal = Math.max(0, remainingPrincipal - principalComponent);
      
      emiSchedule.push({
        month: month,
        dueDate: dueDate.toISOString(),
        emi: emi,
        principalComponent: Math.round(principalComponent),
        interestComponent: Math.round(interestComponent),
        remainingPrincipal: Math.round(remainingPrincipal),
        status: 'pending',
        paidAmount: 0,
        paidDate: null,
        installmentNumber: month,
        totalInstallments: tenure
      });
    }
    
    // Add application metadata
    cleaned.applicationDate = new Date().toISOString();
    cleaned.status = 'pending';
    cleaned.userId = auth.currentUser?.uid || null;
    
    // Add loan calculation fields
    cleaned.amount = Number(loanAmount);
    cleaned.principalAmount = Number(loanAmount);
    cleaned.outstandingBalance = Number(loanAmount);
    cleaned.interestRate = Number(interestRate);
    cleaned.term = Number(tenure);
    cleaned.emi = Number(emi);
    cleaned.totalInterest = Number(totalInterest);
    cleaned.totalAmount = Number(totalAmount);
    cleaned.loanPurpose = data.loanPurpose || 'Working Capital';
    
    // Store original form fields
    cleaned.loanAmount = Number(loanAmount);
    cleaned.fullName = data.fullName || '';
    cleaned.businessName = data.businessName || '';
    
    // Add EMI schedule
    cleaned.emiSchedule = emiSchedule;
    cleaned.nextPaymentDate = emiSchedule.length > 0 ? emiSchedule[0].dueDate : null;
    cleaned.paymentsCompleted = 0;
    cleaned.totalPayments = Number(tenure);
    
    // Add loan metadata
    cleaned.loanStartDate = startDate.toISOString();
    cleaned.loanEndDate = new Date(startDate.getTime() + (tenure * 30 * 24 * 60 * 60 * 1000)).toISOString();
    cleaned.createdAt = new Date().toISOString();
    cleaned.updatedAt = new Date().toISOString();
    
    // Add additional fields for better tracking
    cleaned.loanId = `LOAN_${Date.now()}`;
    cleaned.applicationStatus = 'submitted';
    cleaned.approvalStatus = 'pending';
    cleaned.disbursementStatus = 'pending';
    cleaned.loanType = 'business';
    cleaned.riskCategory = 'medium';
    
    console.log('Final loan data being submitted:', cleaned);
    console.log('EMI calculation:', {
      loanAmount: Number(loanAmount),
      interestRate: Number(interestRate),
      tenure: Number(tenure),
      emi: Number(emi),
      totalInterest: Number(totalInterest),
      totalAmount: Number(totalAmount)
    });
    console.log('EMI Schedule generated:', emiSchedule.length, 'payments');
    
    return cleaned;
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      const cleanedData = cleanFormDataForSubmission(formData);
      onSubmit(cleanedData);
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
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 8, display: 'block' }}>
              EMI Date (Day of Month)
            </label>
            <SelectPicker
              data={Array.from({ length: 28 }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }))}
              value={formData.emiDate}
              onChange={(value) => handleInputChange('emiDate', value)}
              placeholder="Select EMI date"
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
        <Grid fluid>
          <Row gutter={16}>
            
          {[
            'Identity Proof (Aadhar/PAN)',
            'Bank Statements (6 months)',
            'Business Registration',
            'Financial Statements'
          ].map((doc, index) => {
            const fileData = uploadedFiles[doc];
            const progress = uploadProgress[doc];
            const error = uploadErrors[doc];
            
            return (
            <Col sm={18} md={24} lg={24} xl={12} xxl={12} style={{ marginBottom: 16 }}>

              <div key={index}>
                {fileData ? (
                  // File uploaded state
                  <div style={{
                    border: `1px solid ${borderColor}`,
                    borderRadius: 8,
                    padding: '16px',
                    background: cardBg
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 8,
                      gap: 8
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        flex: 1,
                        minWidth: 0 // Allow flex item to shrink
                      }}>
                        <FaFile style={{ color: '#4CAF50', fontSize: 16, flexShrink: 0 }} />
                        <span style={{ 
                          fontSize: 12, 
                          fontWeight: 500, 
                          color: cardText, 
                          textOverflow: 'ellipsis', 
                          overflow: 'hidden', 
                          whiteSpace: 'nowrap',
                          flex: 1,
                          minWidth: 0
                        }}>
                          {fileData.name}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                        <IconButton
                          icon={<FaDownload />}
                          size="xs"
                          onClick={() => downloadFile(fileData)}
                          style={{ color: muted }}
                        />
                        <IconButton
                          icon={<FaTimes />}
                          size="xs"
                          onClick={() => removeFile(doc)}
                          style={{ color: '#f44336' }}
                        />
                      </div>
                    </div>
                    <div style={{ fontSize: 10, color: muted }}>
                      {formatFileSize(fileData.size)}
                    </div>
                  </div>
                ) : (
                  // Upload state
                  <div
              style={{
                border: `2px dashed ${borderColor}`,
                borderRadius: 8,
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      background: cardBg,
                      minHeight: '120px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                    onClick={() => {
                      // Create a new file input for each document type
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
                      input.onchange = (e) => handleFileSelect(e, doc);
                      input.click();
                    }}
                  >
                    {progress > 0 ? (
                      // Upload progress
                      <div style={{ width: '100%' }}>
                        {console.log(`Rendering progress for ${doc}:`, progress)} {/* Debug log */}
                        <Progress.Line
                          percent={progress}
                          strokeColor="#4CAF50"
                          showInfo={false}
                          style={{ height: 6, marginBottom: 12 }}
                        />
                        <div style={{ fontSize: 12, color: muted, fontWeight: 500 }}>
                          {progress < 100 ? `Uploading... ${Math.round(progress)}%` : 'Processing...'}
                        </div>
                        <div style={{ fontSize: 10, color: muted, marginTop: 4 }}>
                          {progress < 100 ? 'Please wait...' : 'Getting download link...'}
                        </div>
                      </div>
                    ) : (
                      // Upload prompt
                      <div>
              <FaCloudUploadAlt style={{ fontSize: 24, color: muted, marginBottom: 8 }} />
                        <div style={{ fontSize: 12, color: muted, marginBottom: 4, fontWeight: 500 }}>{doc}</div>
              <div style={{ fontSize: 10, color: muted }}>Click to upload</div>
                        <div style={{ fontSize: 9, color: muted, marginTop: 4 }}>
                          PDF, DOC, JPG, PNG (max 10MB)
            </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Error message */}
                {error && (
                  <Message type="error" style={{ marginTop: 8, fontSize: 11 }}>
                    {error}
                  </Message>
                )}
              </div>
          </Col>
            );
          })}
          </Row>
        </Grid>
        
        {/* Upload instructions */}
        <div style={{
          marginTop: 16,
          padding: '12px',
          background: `${cardBg}80`,
          borderRadius: 6,
          border: `1px solid ${borderColor}`
        }}>
          <div style={{ fontSize: 12, color: muted, marginBottom: 4 }}>
            <strong>Upload Requirements:</strong>
          </div>
          <div style={{ fontSize: 11, color: muted }}>
            • Identity Proof: Aadhar Card, PAN Card, or Passport<br/>
            • Bank Statements: Last 6 months statements<br/>
            • Business Registration: GST Certificate, Business License<br/>
            • Financial Statements: Income Tax Returns, Balance Sheet
          </div>
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

        {/* Uploaded Documents Summary */}
        <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${borderColor}` }}>
          <h4 style={{ fontSize: 16, fontWeight: 600, color: cardText, marginBottom: 12 }}>Uploaded Documents</h4>
          <Grid fluid>
            <Row gutter={16}>
            {Object.entries(uploadedFiles).map(([docType, fileData]) => (
              <Col sm={18} md={12} lg={12} key={docType} style={{ marginBottom: 16 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 12px',
                background: fileData ? `${cardBg}80` : `${cardBg}40`,
                borderRadius: 6,
                border: `1px solid ${borderColor}`
              }}>
                <FaFile style={{ 
                  color: fileData ? '#4CAF50' : muted, 
                  fontSize: 14 
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontSize: 12, 
                    fontWeight: 500, 
                    color: cardText 
                  }}>
                    {docType}
                  </div>
                  <div style={{ 
                    fontSize: 10, 
                    color: muted 
                  }}>
                    {fileData ? fileData.name : 'Not uploaded'}
                  </div>
                </div>
                {fileData && (
                  <div style={{ fontSize: 10, color: '#4CAF50' }}>
                    ✓ Uploaded
                  </div>
                )}
              </div> </Col>
            ))}
            </Row>
          </Grid>
        </div>
      </Panel>

      {/* Terms and Conditions */}
      <div style={{ marginBottom: 24 }}>
        <Checkbox
          checked={formData.agreeToTerms}
          onChange={(v, checked) => handleInputChange('agreeToTerms', checked)}
        >
          <span style={{ fontSize: 14, color: cardText }}>
            I agree to the Terms and Conditions and Privacy Policy. I authorize MicroFin to verify the information provided and perform credit checks.
          </span>
        </Checkbox>
      </div>

      <div style={{ marginBottom: 24 }}>
        <Checkbox
          checked={formData.agreeToMarketing}
          onChange={(v, checked) => handleInputChange('agreeToMarketing', checked)}
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