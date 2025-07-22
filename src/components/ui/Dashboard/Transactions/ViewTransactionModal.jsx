import React, { useEffect } from 'react';
import { 
  Modal, 
  Stack, 
  Panel,
  Tag,
  Divider,
  Button
} from 'rsuite';
import { FaEye, FaArrowUp, FaArrowDown, FaCalendar, FaFileAlt, FaUser, FaTag } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const ViewTransactionModal = ({ show, onClose, transaction }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, cardBorderBottomColor } = getThemeVars(theme);

   
  if (!transaction) return null;

  const formatAmount = (amount, type) => {
    const formattedAmount = `₹${Math.abs(amount || 0).toLocaleString()}`;
    return type === 'income' ? `+${formattedAmount}` : `-${formattedAmount}`;
  };

  const formatDate = (date) => {
    if (!date) return 'Not specified';
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const getStatusColor = (type) => {
    return type === 'income' ? 'green' : 'red';
  };

  const getStatusIcon = (type) => {
    return type === 'income' ? <FaArrowUp /> : <FaArrowDown />;
  };

  return (
    <Modal
      open={show}
      onClose={onClose}
      size="md"
      style={{ color: cardText }}
    >
      <Modal.Header>
        <Modal.Title style={{ color: cardText }}>
          <Stack spacing={8} alignItems="center" style={{borderBottom: `1px solid ${cardBorderBottomColor}`}}>
            
            
               Transaction Details
             
          </Stack>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div style={{ padding: '5%' }}>
          <Stack direction="column" spacing={24} alignItems='stretch'>
            {/* Transaction Header */}
            <Panel
              style={{
                background: cardBg,
                border: `1px solid ${borderColor}`,
                borderRadius: 8,
                boxShadow: shadow
              }}
            >
              <Stack justifyContent="space-between" alignItems="center">
                <div>
                  <h3 style={{ 
                    fontSize: 20, 
                    fontWeight: 700, 
                    margin: 0, 
                    color: cardText 
                  }}>
                    {transaction.description}
                  </h3>
                  <p style={{ 
                    fontSize: 14, 
                    color: muted, 
                    margin: '8px 0 0 0' 
                  }}>
                    {transaction.reference ? `Ref: ${transaction.reference}` : 'No reference'}
                  </p>
                </div>
                <div style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: transaction.type === 'income' ? '#10b981' : '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  {getStatusIcon(transaction.type)}
                  {formatAmount(transaction.amount, transaction.type)}
                </div>
              </Stack>
            </Panel>

            {/* Transaction Details */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16
            }}>
              {/* Type & Category */}
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
                      Type
                    </label>
                    <div style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: cardText,
                      marginTop: 4
                    }}>
                      <Tag color={getStatusColor(transaction.type)}>
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </Tag>
                    </div>
                  </div>
                  
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
                      fontSize: 16,
                      fontWeight: 600,
                      color: cardText,
                      marginTop: 4
                    }}>
                      {transaction.category}
                    </div>
                  </div>
                </Stack>
              </Panel>

              {/* Account & Status */}
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
                      Account
                    </label>
                    <div style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: cardText,
                      marginTop: 4
                    }}>
                      {transaction.account || 'Main Account'}
                    </div>
                  </div>
                  
                  <div>
                    <label style={{
                      fontSize: 12,
                      color: muted,
                      textTransform: 'uppercase',
                      fontWeight: 500
                    }}>
                      Status
                    </label>
                    <div style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: cardText,
                      marginTop: 4
                    }}>
                      <Tag color="blue">
                        {transaction.status || 'Completed'}
                      </Tag>
                    </div>
                  </div>
                </Stack>
              </Panel>
            </div>

            {/* Date Information */}
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
                    Transaction Date
                  </label>
                  <div style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: cardText,
                    marginTop: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    <FaCalendar style={{ color: muted }} />
                    {formatDate(transaction.date)}
                  </div>
                </div>
                
                {transaction.createdAt && (
                  <div>
                    <label style={{
                      fontSize: 12,
                      color: muted,
                      textTransform: 'uppercase',
                      fontWeight: 500
                    }}>
                      Created On
                    </label>
                    <div style={{
                      fontSize: 14,
                      color: muted,
                      marginTop: 4
                    }}>
                      {formatDate(transaction.createdAt)}
                    </div>
                  </div>
                )}
              </Stack>
            </Panel>

            {/* Description */}
            {transaction.description && (
              <Panel
                style={{
                  background: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: 8,
                  padding: '16px'
                }}
              >
                <Stack direction="column" spacing={8} alignItems='stretch'>
                  <label style={{
                    fontSize: 12,
                    color: muted,
                    textTransform: 'uppercase',
                    fontWeight: 500
                  }}>
                    Description
                  </label>
                  <div style={{
                    fontSize: 16,
                    color: cardText,
                    lineHeight: 1.5
                  }}>
                    {transaction.description}
                  </div>
                </Stack>
              </Panel>
            )}
          </Stack>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <div style={{ height: '10px', padding: '5%' }}>
          <Stack spacing={8} justifyContent="flex-end">
            <Button
              onClick={onClose}
              appearance="ghost"
            >
              Close
            </Button>
          </Stack>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewTransactionModal; 