import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import InvoiceDashboardHeader from './InvoiceDashboardHeader';
import InvoiceSummaryCards from './InvoiceSummaryCards';
import InvoiceFilter from './InvoiceSearchFilter';
import InvoiceTable from './InvoiceTable';
import InvoicePagination from './InvoicePagination';
import { useInvoices } from '../../../../hooks/useDataService';

const InvoiceDashboardPage = () => {
  const { theme } = useTheme();
  const { bgMain } = getThemeVars(theme);
  const navigate = useNavigate();
  
  // State management
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState(null);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { 
    invoices,
    loading, 
    error, 
    fetchInvoices,
    updateInvoice,
  } = useInvoices();

  // Fetch invoices on component mount
  useEffect(() => {
    const loadInvoices = async () => {
      try {
        console.log('Fetching invoices...');
        await fetchInvoices();
        console.log('Invoices fetched successfully');
      } catch (error) {
        console.error('Failed to load invoices:', error);
      }
    };
    
    loadInvoices();
  }, [fetchInvoices]);

  // Event handlers
  const handleSearchChange = (value) => {
    setSearchValue(value);
    console.log('Searching for:', value);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    console.log('Status filter:', value);
  };

  const handleDateChange = (value) => {
    setDateFilter(value);
    console.log('Date filter:', value);
  };

  const handleMoreFilters = () => {
    console.log('More filters clicked');
  };

  const handleSelectInvoice = (invoiceId) => {
    setSelectedInvoices(prev => 
      prev.includes(invoiceId) 
        ? prev.filter(id => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedInvoices((invoices || []).map(invoice => invoice.id));
    } else {
      setSelectedInvoices([]);
    }
  };

  const handleView = (invoice) => {
    console.log('View invoice:', invoice);
    // Navigate to invoice view page
    navigate(`/dashboard/invoices/view/${invoice.id}`);
  };

  const handleEdit = (invoice) => {
    console.log('Edit invoice:', invoice);
    // Navigate to invoice edit page
    navigate(`/dashboard/invoices/edit/${invoice.id}`);
  };

  const handleDownload = async (invoice) => {
    console.log('Download invoice:', invoice);
    try {
      // Generate PDF and download
      // This will be implemented with PDF generation library
      console.log('PDF download functionality will be implemented');
    } catch (error) {
      console.error('Failed to download invoice:', error);
    }
  };

  const handleSend = async (invoice) => {
    console.log('Send invoice:', invoice);
    try {
      // Update invoice status to 'Sent'
      await updateInvoice(invoice.id, { status: 'Sent', sentAt: new Date().toISOString() });
      console.log('Invoice sent successfully');
    } catch (error) {
      console.error('Failed to send invoice:', error);
    }
  };

  const handleRemind = async (invoice) => {
    console.log('Send reminder for invoice:', invoice);
    try {
      // Send reminder email
      // This will be implemented with email service
      console.log('Reminder functionality will be implemented');
    } catch (error) {
      console.error('Failed to send reminder:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log('Page changed to:', page);
  };

  const handleCreateInvoice = () => {
    navigate('/dashboard/invoices/new');
  };

  // Calculate invoice summary data (memoized)
  const invoiceSummaryData = useMemo(() => ({
    totalInvoices: invoices?.length || 0,
    paidInvoices: invoices?.filter(invoice => invoice.status === 'Paid').length || 0,
    pendingInvoices: invoices?.filter(invoice => invoice.status === 'Pending').length || 0,
    overdueInvoices: invoices?.filter(invoice => invoice.status === 'Overdue').length || 0,
    totalAmount: invoices?.reduce((sum, invoice) => sum + (invoice.total || 0), 0) || 0,
    paidAmount: invoices?.filter(invoice => invoice.status === 'Paid').reduce((sum, invoice) => sum + (invoice.total || 0), 0) || 0,
    pendingAmount: invoices?.filter(invoice => invoice.status === 'Pending').reduce((sum, invoice) => sum + (invoice.total || 0), 0) || 0
  }), [invoices]);

  // Filter invoices based on search and filters
  const filteredInvoices = (invoices || []).filter(invoice => {
    const matchesSearch = !searchValue || 
      invoice.clientName?.toLowerCase().includes(searchValue.toLowerCase()) ||
      invoice.invoiceNumber?.toLowerCase().includes(searchValue.toLowerCase());
    
    const matchesStatus = !statusFilter || invoice.status === statusFilter;
    
    const matchesDate = !dateFilter || 
      (invoice.issueDate && new Date(invoice.issueDate).toDateString() === dateFilter.toDateString());
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Debug logging
  useEffect(() => {
    console.log('Invoices data:', invoices);
    console.log('Filtered invoices:', filteredInvoices);
    console.log('Summary data:', invoiceSummaryData);
  }, [invoices, filteredInvoices, invoiceSummaryData]);

  return (
    <div style={{ marginTop: '5%', backgroundColor: bgMain, padding: "2%" }}>
      <InvoiceDashboardHeader 
        title="Invoices"
        subtitle="Create, manage, and track all your invoices"
        onCreateInvoice={handleCreateInvoice}
        createText="Create Invoice"
      />

      {/* Temporary button for adding sample data */}
        {/* <div style={{ marginBottom: 20 }}>
          <AddSampleDataButton />
        </div> */}

      <InvoiceSummaryCards data={invoiceSummaryData} />

      <InvoiceFilter
        searchValue={searchValue}
        statusFilter={statusFilter}
        dateFilter={dateFilter}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onDateChange={handleDateChange}
        onMoreFilters={handleMoreFilters}
      />

      <InvoiceTable 
        data={filteredInvoices}
        loading={loading}
        error={error}
        selectedInvoices={selectedInvoices}
        onSelectInvoice={handleSelectInvoice}
        onSelectAll={handleSelectAll}
        onView={handleView}
        onEdit={handleEdit}
        onDownload={handleDownload}
        onSend={handleSend}
        onRemind={handleRemind}
      />

      <InvoicePagination 
        currentPage={currentPage}
        totalPages={Math.ceil(filteredInvoices.length / 10)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default InvoiceDashboardPage; 