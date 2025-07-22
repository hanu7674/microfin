import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import TransactionsHeader from './TransactionsHeader';
import TransactionsFilter from './TransactionsFilter';
import FinancialOverview from './FinancialOverview';
import TransactionsTable from './TransactionsTable';
import { useTransactions } from '../../../../hooks/useDataService';

const TransactionsPage = () => {
  const { theme } = useTheme();
  const { bgMain } = getThemeVars(theme);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { 
    transactions, 
    loading, 
    error, 
    fetchTransactions 
  } = useTransactions();

  // Handle ResizeObserver errors
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args) => {
      if (args[0] && typeof args[0] === 'string' && args[0].includes('ResizeObserver')) {
        return; // Suppress ResizeObserver errors
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Monitor transactions state changes
  useEffect(() => {
    console.log('Transactions state changed:', transactions);
    console.log('Transactions count:', transactions?.length || 0);
  }, [transactions]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    console.log('Searching for:', value);
    fetchTransactions({ search: value });
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
    console.log('Type filter:', value);
    const filters = {};
    if (value !== 'All Types') {
      filters.type = value.toLowerCase();
    }
    fetchTransactions(filters);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    console.log('Category filter:', value);
    const filters = {};
    if (value !== 'All Categories') {
      filters.category = value;
    }
    fetchTransactions(filters);
  };

  const handleDateChange = (value) => {
    setSelectedDate(value);
    console.log('Date filter:', value);
    const filters = {};
    if (value) {
      filters.date = value;
    }
    fetchTransactions(filters);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log('Page changed to:', page);
    fetchTransactions({ page, limit: 10 });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedType('All Types');
    setSelectedCategory('All Categories');
    setSelectedDate(null);
    setCurrentPage(1);
    fetchTransactions();
  };

  const handleTransactionSuccess = () => {
    console.log('Transaction added successfully! Refreshing data...');
    setTimeout(() => {
      fetchTransactions();
    }, 100);
  };

  const handleEditSuccess = () => {
    console.log('Transaction edited successfully! Refreshing data...');
    setTimeout(() => {
      fetchTransactions();
    }, 100);
  };

  const handleDeleteSuccess = () => {
    console.log('Transaction deleted successfully! Refreshing data...');
    setTimeout(() => {
      fetchTransactions();
    }, 100);
  };

   const calculateFinancialData = () => {
    console.log('Calculating financial data with transactions:', transactions);
    
    const totalIncome = transactions?.filter(t => t.type === 'income')?.reduce((sum, t) => sum + (t.amount || 0), 0) || 0;
    const totalExpenses = transactions?.filter(t => t.type === 'expense')?.reduce((sum, t) => sum + (t.amount || 0), 0) || 0;
    const netBalance = totalIncome - totalExpenses;
    
    console.log('Financial data calculated:', { totalIncome, totalExpenses, netBalance });
    
    return {
      totalIncome,
      totalExpenses,
      netBalance
    };
  };

  const financialData = calculateFinancialData();

  const filteredTransactions = transactions ? transactions.filter(transaction => {
    const matchesSearch = !searchTerm || 
      transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'All Types' || 
      transaction.type === selectedType.toLowerCase();
    
    const matchesCategory = selectedCategory === 'All Categories' || 
      transaction.category === selectedCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  }) : [];

  console.log('Current transactions state:', transactions);
  console.log('Filtered transactions:', filteredTransactions);
  console.log('Financial data being passed to overview:', financialData);

  return (
    <div style={{ marginTop: '5%', backgroundColor: bgMain, padding: "2%" }}>
      <TransactionsHeader 
        title="Transactions"
        subtitle="View and manage all your financial transactions"
        onExport={() => console.log('Export transactions')}
        exportText="Export"
        onTransactionSuccess={handleTransactionSuccess}
      />

       

      <TransactionsFilter
        searchValue={searchTerm}
        selectedType={selectedType}
        selectedCategory={selectedCategory}
        selectedDate={selectedDate}
        onSearchChange={handleSearchChange}
        onTypeChange={handleTypeChange}
        onCategoryChange={handleCategoryChange}
        onDateChange={handleDateChange}
        onClearFilters={handleClearFilters}
      />

      <FinancialOverview data={financialData} />

      <TransactionsTable 
        data={filteredTransactions}
        loading={loading}
        error={error}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onView={(transaction) => console.log('View transaction:', transaction)}
        onEdit={handleEditSuccess}
        onDelete={handleDeleteSuccess}
      />
    </div>
  );
};

export default TransactionsPage;
