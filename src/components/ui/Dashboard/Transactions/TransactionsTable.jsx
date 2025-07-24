import React, { useState } from 'react';
import { Table, Tag, Tooltip, Whisper, IconButton, Loader, Stack } from 'rsuite';
import { 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import ViewTransactionModal from './ViewTransactionModal';
import EditTransactionModal from './EditTransactionModal';
import DeleteTransactionModal from './DeleteTransactionModal';

const { Column, HeaderCell, Cell } = Table;

const TransactionsTable = ({ 
  data = [], 
  loading = false, 
  error = null,
  currentPage = 1,
  onPageChange,
  onView, 
  onEdit, 
  onDelete 
}) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow,  cardBorderBottomColor } = getThemeVars(theme);

  // Modal states
  const [viewModal, setViewModal] = useState({ show: false, transaction: null });
  const [editModal, setEditModal] = useState({ show: false, transaction: null });
  const [deleteModal, setDeleteModal] = useState({ show: false, transaction: null });

   
  const getStatusColor = (type) => {
    return type === 'income' ? 'green' : 'red';
  };

  const formatAmount = (amount, type) => {
    const formattedAmount = `₹${Math.abs(amount || 0).toLocaleString()}`;
    return type === 'income' ? `+${formattedAmount}` : `-${formattedAmount}`;
  };

  const formatDate = (date) => {
    if (!date) return '';
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Modal handlers
  const handleView = (transaction) => {
    setViewModal({ show: true, transaction });
  };

  const handleEdit = (transaction) => {
    setEditModal({ show: true, transaction });
  };

  const handleDelete = (transaction) => {
    setDeleteModal({ show: true, transaction });
  };

  const handleViewClose = () => {
    setViewModal({ show: false, transaction: null });
  };

  const handleEditClose = () => {
    setEditModal({ show: false, transaction: null });
  };

  const handleDeleteClose = () => {
    setDeleteModal({ show: false, transaction: null });
  };

  const handleEditSuccess = () => {
    console.log('Transaction updated successfully!');
    // Refresh data if callback provided
    if (onEdit) onEdit();
  };

  const handleDeleteSuccess = () => {
    console.log('Transaction deleted successfully!');
    // Refresh data if callback provided
    if (onDelete) onDelete();
  };

  const renderActions = (transaction) => (
    <Stack spacing={8}>
      <Whisper
        placement="auto"
        trigger="hover"
        speaker={<Tooltip>View Details</Tooltip>}
      >
        <IconButton 
          icon={<FaEye />} 
          appearance="subtle" 
          circle 
          onClick={() => handleView(transaction)}
        />
      </Whisper>
      <Whisper
        placement="top"
        trigger="hover"
        speaker={<Tooltip>Edit Transaction</Tooltip>}
      >
        <IconButton 
          icon={<FaEdit />} 
          appearance="subtle" 
          circle 
          onClick={() => handleEdit(transaction)}
        />
      </Whisper>
      <Whisper
        placement="auto"
        trigger="hover"
        speaker={<Tooltip>Delete Transaction</Tooltip>}
      >
        <IconButton 
          icon={<FaTrash />} 
          appearance="subtle" 
          circle 
          color="red"
          onClick={() => handleDelete(transaction)}
        />
      </Whisper>
    </Stack>
  );

  if (loading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px 20px',
        background: cardBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 8,
        boxShadow: shadow
      }}>
        <Loader size="md" content="Loading transactions..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px 20px',
        background: cardBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 8,
        boxShadow: shadow,
        color: '#ef4444'
      }}>
        <h4>Error loading transactions</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{
        background: cardBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 8,
        boxShadow: shadow
      }}>
        <div style={{
          fontSize: 18,
          fontWeight: 600,
          margin: 0,
          marginBottom: 24,
          color: cardText,
          padding: '10px 16px',
          borderBottom: `3px solid ${cardBorderBottomColor}`,
          borderBottomWidth: 1
        }}>
          Transaction History
        </div>

        <div style={{ padding: '0 16px 16px' }}>
          {data && data.length > 0 ? (
            <Table
              data={data}
              
              style={{ background: 'transparent' }}
              rowHeight={60}
            >
              <Column flexGrow={1}>
                <HeaderCell>Date</HeaderCell>
                <Cell>
                  {(rowData) => formatDate(rowData.date)}
                </Cell>
              </Column>

              <Column flexGrow={2}>
                <HeaderCell>Description</HeaderCell>
                <Cell dataKey="description" />
              </Column>

              <Column flexGrow={1}>
                <HeaderCell>Category</HeaderCell>
                <Cell>
                  {(rowData) => (
                    <Tag color={getStatusColor(rowData.type)}>
                      {rowData.category}
                    </Tag>
                  )}
                </Cell>
              </Column>

              <Column flexGrow={1}>
                <HeaderCell>Account</HeaderCell>
                <Cell>
                  {(rowData) => (
                    <span style={{ color: cardText }}>
                      {rowData.account || 'Main Account'}
                    </span>
                  )}
                </Cell>
              </Column>

              <Column flexGrow={1}>
                <HeaderCell>Amount</HeaderCell>
                <Cell>
                  {(rowData) => (
                    <span style={{
                      color: rowData.type === 'income' ? '#10b981' : '#ef4444',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}>
                      {rowData.type === 'income' ? <FaArrowUp size={12} /> : <FaArrowDown size={12} />}
                      {formatAmount(rowData.amount, rowData.type)}
                    </span>
                  )}
                </Cell>
              </Column>

              <Column flexGrow={1}>
                <HeaderCell>Actions</HeaderCell>
                <Cell>
                  {(rowData) => renderActions(rowData)}
                </Cell>
              </Column>
            </Table>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px 20px',
              color: cardText,
              opacity: 0.7
            }}>
              No transactions found
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ViewTransactionModal
        show={viewModal.show}
        onClose={handleViewClose}
        transaction={viewModal.transaction}
      />
      <EditTransactionModal
        show={editModal.show}
        onClose={handleEditClose}
        transaction={editModal.transaction}
        onSuccess={handleEditSuccess}
      />
      <DeleteTransactionModal
        show={deleteModal.show}
        onClose={handleDeleteClose}
        transaction={deleteModal.transaction}
        onSuccess={handleDeleteSuccess}
      />
    </div>
  );
};

export default TransactionsTable; 