import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  Stack, 
  Button,
  Message,
  Panel
} from 'rsuite';
import { FaTrash, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { useTransactions } from '../../../../hooks/useDataService';

const DeleteTransactionModal = ({ show, onClose, transaction, onSuccess }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted } = getThemeVars(theme);
  const { deleteTransaction } = useTransactions();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
  const formatAmount = (amount, type) => {
    const formattedAmount = `₹${Math.abs(amount || 0).toLocaleString()}`;
    return type === 'income' ? `+${formattedAmount}` : `-${formattedAmount}`;
  };

  const formatDate = (date) => {
    if (!date) return 'Not specified';
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDelete = async () => {
    if (!transaction) return;

    setLoading(true);
    setError('');

    try {
      console.log('Deleting transaction:', transaction.id);
      
      await deleteTransaction(transaction.id);
      
      console.log('Transaction deleted successfully!');
      
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Transaction deletion error:', error);
      setError(error.message || 'Failed to delete transaction');
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
      size="sm"
      style={{ color: cardText }}
    >
      <Modal.Header>
        <Modal.Title style={{ color: cardText }}>
          <Stack spacing={8} alignItems="center">
            <FaTrash style={{ color: '#ef4444' }} />
            Delete Transaction
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

          <Stack direction="column" spacing={16} alignItems='stretch'>
            {/* Warning Message */}
            <div style={{
              background: '#fef3c7',
              border: '1px solid #f59e0b',
              borderRadius: 8,
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}>
              <FaExclamationTriangle style={{ color: '#f59e0b', fontSize: 20 }} />
              <div>
                <div style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#92400e',
                  marginBottom: 4
                }}>
                  Are you sure?
                </div>
                <div style={{
                  fontSize: 14,
                  color: '#92400e'
                }}>
                  This action cannot be undone. The transaction will be permanently deleted.
                </div>
              </div>
            </div>

            {/* Transaction Details */}
            <Panel
              style={{
                background: cardBg,
                border: `1px solid ${borderColor}`,
                borderRadius: 8,
                padding: '16px'
              }}
            >
              <Stack direction="column" spacing={12} alignItems='stretch'>
                <div>
                  <label style={{
                    fontSize: 12,
                    color: muted,
                    textTransform: 'uppercase',
                    fontWeight: 500
                  }}>
                    Transaction Details
                  </label>
                  <div style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: cardText,
                    marginTop: 4
                  }}>
                    {transaction.description}
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 16
                }}>
                  <div>
                    <label style={{
                      fontSize: 12,
                      color: muted,
                      textTransform: 'uppercase',
                      fontWeight: 500
                    }}>
                      Amount
                    </label>
                    <div style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: transaction.type === 'income' ? '#10b981' : '#ef4444',
                      marginTop: 4
                    }}>
                      {formatAmount(transaction.amount, transaction.type)}
                    </div>
                  </div>

                  <div>
                    <label style={{
                      fontSize: 12,
                      color: muted,
                      textTransform: 'uppercase',
                      fontWeight: 500
                    }}>
                      Date
                    </label>
                    <div style={{
                      fontSize: 14,
                      color: cardText,
                      marginTop: 4
                    }}>
                      {formatDate(transaction.date)}
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 16
                }}>
                  <div>
                    <label style={{
                      fontSize: 12,
                      color: muted,
                      textTransform: 'uppercase',
                      fontWeight: 500
                    }}>
                      Category
                    </label>
                    <div style={{
                      fontSize: 14,
                      color: cardText,
                      marginTop: 4
                    }}>
                      {transaction.category}
                    </div>
                  </div>

                  <div>
                    <label style={{
                      fontSize: 12,
                      color: muted,
                      textTransform: 'uppercase',
                      fontWeight: 500
                    }}>
                      Account
                    </label>
                    <div style={{
                      fontSize: 14,
                      color: cardText,
                      marginTop: 4
                    }}>
                      {transaction.account || 'Main Account'}
                    </div>
                  </div>
                </div>
              </Stack>
            </Panel>
          </Stack>
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
              onClick={handleDelete}
              loading={loading}
              style={{
                backgroundColor: '#ef4444',
                color: '#fff',
                border: 'none'
              }}
            >
              Delete Transaction
            </Button>
          </Stack>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteTransactionModal; 