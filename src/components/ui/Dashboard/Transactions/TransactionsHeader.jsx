import React, { useState } from 'react';
import { Stack, Button } from 'rsuite';
import { FaPlus } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import AddTransactionModal from './AddTransactionModal';

const TransactionsHeader = ({ 
  title = "Transactions", 
  subtitle = "Manage your income and expense transactions", 
  actionText = "Add Transaction", 
  onActionClick,
  onTransactionSuccess
}) => {
  const { theme } = useTheme();
  const { textMain, muted } = getThemeVars(theme);

  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);

  // Modal handlers
  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleTransactionSuccess = () => {
    console.log('Transaction added successfully!');
    onTransactionSuccess?.();
  };

  const handleActionClick = () => {
    if (onActionClick) {
      onActionClick();
    } else {
      handleOpenAddModal();
    }
  };

  return (
    <>
      <Stack justifyContent="space-between" alignItems="flex-start" style={{ marginBottom: 32 }}>
        <div>
          <h1 style={{ 
            fontSize: 32, 
            fontWeight: 700, 
            margin: 0, 
            marginBottom: 8, 
            color: textMain 
          }}>
            {title}
          </h1>
          <p style={{ 
            fontSize: 16, 
            color: muted, 
            margin: 0 
          }}>
            {subtitle}
          </p>
        </div>
        <Button 
          appearance="primary" 
          size="lg"
          style={{ 
            backgroundColor: '#000', 
            color: '#fff',
            border: 'none'
          }}
          onClick={handleActionClick}
        >
          <FaPlus style={{ marginRight: 8 }} />
          {actionText}
        </Button>
      </Stack>

      <AddTransactionModal
        show={showAddModal}
        onClose={handleCloseAddModal}
        onSuccess={handleTransactionSuccess}
      />
    </>
  );
};

export default TransactionsHeader; 