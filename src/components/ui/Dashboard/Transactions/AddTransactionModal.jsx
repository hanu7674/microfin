import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  Form, 
  Input, 
  InputNumber, 
  SelectPicker, 
  DatePicker, 
  Button, 
  Stack,
  Message
} from 'rsuite';
import { FaPlus } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { useTransactions } from '../../../../hooks/useDataService';

const AddTransactionModal = ({ show, onClose, onSuccess }) => {
  const { theme } = useTheme();
  const { cardText } = getThemeVars(theme);
  const { createTransaction } = useTransactions();

  // Handle ResizeObserver errors
  useEffect(() => {
    const originalError = console.error;
    const originalWarn = console.warn;
    
    console.error = (...args) => {
      const message = args[0];
      if (typeof message === 'string' && 
          (message.includes('ResizeObserver') || 
           message.includes('ResizeObserver loop') ||
           message.includes('ResizeObserver loop completed'))) {
        return; // Suppress ResizeObserver errors
      }
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      const message = args[0];
      if (typeof message === 'string' && 
          (message.includes('ResizeObserver') || 
           message.includes('ResizeObserver loop') ||
           message.includes('ResizeObserver loop completed'))) {
        return; // Suppress ResizeObserver warnings
      }
      originalWarn.apply(console, args);
    };

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);
  
  const [formData, setFormData] = useState({
    type: 'income',
    amount: '',
    category: '',
    description: '',
    date: new Date(),
    reference: '',
    account: 'Main Account' // Add default account
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Options for dropdowns
  const typeOptions = [
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' }
  ];

  const accountOptions = [
    { label: 'Main Account', value: 'Main Account' },
    { label: 'Savings Account', value: 'Savings Account' },
    { label: 'Business Account', value: 'Business Account' },
    { label: 'Cash', value: 'Cash' },
    { label: 'Credit Card', value: 'Credit Card' },
    { label: 'Investment Account', value: 'Investment Account' }
  ];

  const categoryOptions = {
    income: [
      { label: 'Loan Repayment', value: 'loan_repayment' },
      { label: 'Interest Income', value: 'interest_income' },
      { label: 'Service Fees', value: 'service_fees' },
      { label: 'Commission', value: 'commission' },
      { label: 'Other Income', value: 'other_income' }
    ],
    expense: [
      { label: 'Office Rent', value: 'office_rent' },
      { label: 'Utilities', value: 'utilities' },
      { label: 'Salaries', value: 'salaries' },
      { label: 'Marketing', value: 'marketing' },
      { label: 'Travel', value: 'travel' },
      { label: 'Equipment', value: 'equipment' },
      { label: 'Insurance', value: 'insurance' },
      { label: 'Other Expenses', value: 'other_expenses' }
    ]
  };

  const handleFormChange = (field, value) => {
    console.log(`Form field changed: ${field} = ${value}`);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Reset category when type changes
    if (field === 'type') {
      setFormData(prev => ({
        ...prev,
        type: value,
        category: ''
      }));
    }
  };

  const handleSubmit = async () => {
    console.log('Submit button clicked');
    console.log('Form data:', formData);
    
    // Validate required fields
    const requiredFields = {
      amount: 'Amount',
      category: 'Category', 
      description: 'Description',
      account: 'Account'
    };
    
    const missingFields = [];
    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!formData[field] || formData[field].toString().trim() === '') {
        missingFields.push(label);
      }
    });
    
    if (missingFields.length > 0) {
      setError(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Convert date to proper format for Firestore
      const transactionDate = formData.date instanceof Date ? formData.date : new Date(formData.date);
      
      const transactionData = {
        type: formData.type,
        amount: parseFloat(formData.amount),
        category: formData.category,
        description: formData.description,
        date: transactionDate,
        reference: formData.reference || '',
        account: formData.account,
        status: 'completed'
      };

      console.log('Creating transaction with data:', transactionData);
      console.log('createTransaction function:', createTransaction);
      
      await createTransaction(transactionData);
      
      console.log('Transaction created successfully!');
      
      // Reset form
      setFormData({
        type: 'income',
        amount: '',
        category: '',
        description: '',
        date: new Date(),
        reference: '',
        account: 'Main Account'
      });

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Transaction creation error:', error);
      setError(error.message || 'Failed to create transaction');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        type: 'income',
        amount: '',
        category: '',
        description: '',
        date: new Date(),
        reference: '',
        account: 'Main Account'
      });
      setError('');
      onClose();
    }
  };

  return (
    <Modal
      open={show}
      onClose={handleClose}
      size="md"
      style={{
         color: cardText
      }}
    >
      <Modal.Header>
        <Modal.Title style={{ color: cardText }}>
          <Stack spacing={8} alignItems="center">
            <FaPlus style={{ color: '#10b981' }} />
            Add New Transaction
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div style={{padding: '5%'}}>
        {error && (
          <Message type="error" style={{ marginBottom: 16 }}>
            {error}
          </Message>
        )}

        <Form fluid>
          <Stack direction="column" spacing={16} alignItems='stretch'>
            {/* Transaction Type */}
            <div>
              <label style={{
                fontSize: 14,
                fontWeight: 500,
                color: cardText,
                marginBottom: 8,
                display: 'block'
              }}>
                Transaction Type *
              </label>
              <SelectPicker
                placement='auto'
                data={typeOptions}
                value={formData.type}
                onChange={(value) => handleFormChange('type', value)}
                style={{ width: '100%' }}
                appearance="default"
              />
            </div>

            {/* Amount */}
            <div>
              <label style={{
                fontSize: 14,
                fontWeight: 500,
                color: cardText,
                marginBottom: 8,
                display: 'block'
              }}>
                Amount (₹) *
              </label>
              <InputNumber
                value={formData.amount}
                onChange={(value) => handleFormChange('amount', value)}
                style={{ width: '100%' }}
                placeholder="0.00"
                min={0}
                step={0.01}
              />
            </div>

            {/* Category */}
            <div>
              <label style={{
                fontSize: 14,
                fontWeight: 500,
                color: cardText,
                marginBottom: 8,
                display: 'block'
              }}>
                Category *
              </label>
              <SelectPicker
                placement='auto'
                data={categoryOptions[formData.type] || []}
                value={formData.category}
                onChange={(value) => handleFormChange('category', value)}
                style={{ width: '100%' }}
                appearance="default"
                placeholder="Select category"
              />
            </div>

            {/* Description */}
            <div>
              <label style={{
                fontSize: 14,
                fontWeight: 500,
                color: cardText,
                marginBottom: 8,
                display: 'block'
              }}>
                Description *
              </label>
              <Input
                value={formData.description}
                onChange={(value) => handleFormChange('description', value)}
                style={{ width: '100%' }}
                placeholder="Enter transaction description"
              />
            </div>

            {/* Date */}
            <div>
              <label style={{
                fontSize: 14,
                fontWeight: 500,
                color: cardText,
                marginBottom: 8,
                display: 'block'
              }}>
                Date
              </label>
              <DatePicker
                placement='auto'

                value={formData.date}
                onChange={(value) => handleFormChange('date', value)}
                style={{ width: '100%' }}
                format="yyyy-MM-dd"
              />
            </div>

            {/* Reference */}
            <div>
              <label style={{
                fontSize: 14,
                fontWeight: 500,
                color: cardText,
                marginBottom: 8,
                display: 'block'
              }}>
                Reference (Optional)
              </label>
              <Input
                value={formData.reference}
                onChange={(value) => handleFormChange('reference', value)}
                style={{ width: '100%' }}
                placeholder="Transaction reference number"
              />
            </div>

            {/* Account */}
            <div>
              <label style={{
                fontSize: 14,
                fontWeight: 500,
                color: cardText,
                marginBottom: 8,
                display: 'block'
              }}>
                Account *
              </label>
              <SelectPicker 
                placement='auto'
                data={accountOptions}
                value={formData.account}
                onChange={(value) => handleFormChange('account', value)}
                style={{ width: '100%' }}
                appearance="default"
                placeholder="Select account"
              />
            </div>
          </Stack>
        </Form>

       
      </div>
</Modal.Body>
        <Modal.Footer> <div style={{height: '10px',padding: '5%'}}>
        <Stack spacing={8} justifyContent="flex-end">
          <Button
            appearance="ghost"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            appearance="primary"
            onClick={handleSubmit}
            loading={loading}
            style={{
              backgroundColor: '#000',
              color: '#fff',
              border: 'none'
            }}
          >
            Add Transaction
          </Button>
        </Stack>
        </div>
        </Modal.Footer>
    </Modal>
  );
};

export default AddTransactionModal; 