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
import { FaEdit, FaTimes } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { useTransactions } from '../../../../hooks/useDataService';

const EditTransactionModal = ({ show, onClose, transaction, onSuccess }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted } = getThemeVars(theme);
  const { updateTransaction } = useTransactions();

   
  const [formData, setFormData] = useState({
    type: 'income',
    amount: '',
    category: '',
    description: '',
    date: new Date(),
    reference: '',
    account: 'Main Account'
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

  // Initialize form data when transaction changes
  useEffect(() => {
    if (transaction) {
      const date = transaction.date?.toDate ? transaction.date.toDate() : new Date(transaction.date);
      setFormData({
        type: transaction.type || 'income',
        amount: transaction.amount?.toString() || '',
        category: transaction.category || '',
        description: transaction.description || '',
        date: date,
        reference: transaction.reference || '',
        account: transaction.account || 'Main Account'
      });
    }
  }, [transaction]);

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
      
      const updateData = {
        type: formData.type,
        amount: parseFloat(formData.amount),
        category: formData.category,
        description: formData.description,
        date: transactionDate,
        reference: formData.reference || '',
        account: formData.account,
        status: 'completed'
      };

      console.log('Updating transaction with data:', updateData);
      
      await updateTransaction(transaction.id, updateData);
      
      console.log('Transaction updated successfully!');
      
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Transaction update error:', error);
      setError(error.message || 'Failed to update transaction');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setError('');
      onClose();
    }
  };

  if (!transaction) return null;

  return (
    <Modal
      open={show}
      onClose={handleClose}
      size="md"
      style={{ color: cardText }}
    >
      <Modal.Header>
        <Modal.Title style={{ color: cardText }}>
          <Stack spacing={8} alignItems="center">
            <FaEdit style={{ color: '#f59e0b' }} />
            Edit Transaction
          </Stack>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div style={{ padding: '5%' }}>
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
                  data={typeOptions}
                  value={formData.type}
                  onChange={(value) => handleFormChange('type', value)}
                  style={{ width: '100%' }}
                  appearance="default"
                  placement='auto'
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
                  data={categoryOptions[formData.type] || []}
                  value={formData.category}
                  onChange={(value) => handleFormChange('category', value)}
                  style={{ width: '100%' }}
                  appearance="default"
                  placeholder="Select category"
                  placement='auto'
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
                  data={accountOptions}
                  value={formData.account}
                  onChange={(value) => handleFormChange('account', value)}
                  style={{ width: '100%' }}
                  appearance="default"
                  placeholder="Select account"
                  placement='auto'
                />
              </div>
            </Stack>
          </Form>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <div style={{ height: '10px', padding: '5%' }}>
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
              Update Transaction
            </Button>
          </Stack>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTransactionModal; 