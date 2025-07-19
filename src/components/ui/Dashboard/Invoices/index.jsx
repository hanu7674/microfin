import React, { useState } from 'react';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import InvoiceDashboardHeader from './InvoiceDashboardHeader';
import InvoiceSummaryCards from './InvoiceSummaryCards';
import InvoiceSearchFilter from './InvoiceSearchFilter';
import InvoiceTable from './InvoiceTable';
import InvoicePagination from './InvoicePagination';
import { useNavigate } from 'react-router-dom';

const InvoiceDashboardPage = () => {
  const { theme } = useTheme();
  const { bgMain } = getThemeVars(theme);
  const navigate = useNavigate();
  // State for pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('30');
  
  // Event handlers
  const handleExport = () => {
    console.log('Export invoices');
    // Export logic here
  };

  const handleCreateInvoice = () => {
    console.log('Create new invoice');
    navigate('/dashboard/invoices/create');
    // Navigate to create invoice form
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    console.log('Search term:', term);
    // Filter invoices based on search term
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'status') {
      setStatusFilter(value);
    } else if (filterType === 'date') {
      setDateFilter(value);
    }
    console.log('Filter changed:', filterType, value);
    // Apply filters to invoices
  };

  const handleViewInvoice = (invoice) => {
    console.log('View invoice:', invoice);
    // Open invoice details modal
  };

  const handleEditInvoice = (invoice) => {
    console.log('Edit invoice:', invoice);
    // Navigate to edit invoice form
  };

  const handleDownloadInvoice = (invoice) => {
    console.log('Download invoice:', invoice);
    // Download invoice PDF
  };

  const handleSendInvoice = (invoice) => {
    console.log('Send invoice:', invoice);
    // Send invoice via email
  };

  const handleRemindInvoice = (invoice) => {
    console.log('Remind invoice:', invoice);
    // Send reminder for overdue invoice
  };

 

  return (
    <div style={{ marginTop: '5%', backgroundColor: bgMain, padding: "2%" }}>
      <InvoiceDashboardHeader 
        onExport={handleExport}
        onCreateInvoice={handleCreateInvoice}
      />

      <InvoiceSummaryCards />

      <InvoiceSearchFilter 
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
      />

      <InvoiceTable 
        onView={handleViewInvoice}
        onEdit={handleEditInvoice}
        onDownload={handleDownloadInvoice}
        onSend={handleSendInvoice}
        onRemind={handleRemindInvoice}
      />
    </div>
  );
};

export default InvoiceDashboardPage; 