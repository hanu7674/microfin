import React, { useState } from 'react';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import TransactionsHeader from './TransactionsHeader';
import TransactionsFilter from './TransactionsFilter';
import FinancialOverview from './FinancialOverview';
import TransactionsTable from './TransactionsTable';

const TransactionsPage = () => {
  const { theme } = useTheme();
  const { bgMain } = getThemeVars(theme);
  
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Sample transactions data
  const transactions = [
    {
      id: 1,
      date: 'Jan 15, 2025',
      description: 'Salary Payment',
      category: 'Income',
      account: 'Checking Account',
      amount: '+₹2,500.00',
      type: 'income'
    },
    {
      id: 2,
      date: 'Jan 14, 2025',
      description: 'Grocery Shopping',
      category: 'Food & Dining',
      account: 'Credit Card',
      amount: '-₹85.50',
      type: 'expense'
    },
    {
      id: 3,
      date: 'Jan 13, 2025',
      description: 'Gas Station',
      category: 'Transportation',
      account: 'Debit Card',
      amount: '-₹45.00',
      type: 'expense'
    },
    {
      id: 4,
      date: 'Jan 12, 2025',
      description: 'Freelance Project',
      category: 'Income',
      account: 'Savings Account',
      amount: '+₹800.00',
      type: 'income'
    },
    {
      id: 5,
      date: 'Jan 11, 2025',
      description: 'Movie Tickets',
      category: 'Entertainment',
      account: 'Credit Card',
      amount: '-₹24.00',
      type: 'expense'
    }
  ];

  // Event handlers
  const handleAddTransaction = () => {
    console.log('Add transaction clicked');
    // Add transaction logic here
  };

  const handleMoreFilter = () => {
    console.log('More filter clicked');
    // Additional filter logic here
  };

  const handleEditTransaction = (transaction) => {
    console.log('Edit transaction:', transaction);
    // Edit transaction logic here
  };

  const handleDeleteTransaction = (transaction) => {
    console.log('Delete transaction:', transaction);
    // Delete transaction logic here
  };

  const handleDownload = () => {
    console.log('Download transactions');
    // Download logic here
  };

  const handleViewChange = () => {
    console.log('Change view');
    // View change logic here
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Fetch data for new page
  };

  return (
    <div style={{marginTop: '5%', backgroundColor: bgMain, padding: "2%"}}>
       <TransactionsHeader 
        title="Transactions"
        subtitle="Manage your income and expense transactions"
        actionText="Add Transaction"
        onActionClick={handleAddTransaction}
      />

       <TransactionsFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onMoreFilter={handleMoreFilter}
      />

       <FinancialOverview />

       <TransactionsTable
        transactions={transactions}
        title="Recent Transactions"
        onEdit={handleEditTransaction}
        onDelete={handleDeleteTransaction}
        onDownload={handleDownload}
        onViewChange={handleViewChange}
        currentPage={currentPage}
        totalItems={47}
        itemsPerPage={5}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TransactionsPage;
