import React, { useState, useEffect, useCallback } from 'react';
import { Container, Loader, Message } from 'rsuite';
import { useSelector } from 'react-redux';
import ClientDashboardHeader from './ClientDashboardHeader';
import ClientSummaryCards from './ClientSummaryCards';
import ClientSearchFilter from './ClientSearchFilter';
import ClientTable from './ClientTable';
import ClientPagination from './ClientPagination';
import AddSampleDataButton from './AddSampleDataButton';
import ClientDebug from './ClientDebug';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { useClients } from '../../../../hooks/useDataService';
import { useNavigate } from 'react-router-dom';

const ClientManagement = () => {
  const { theme } = useTheme();
  const { pageBg } = getThemeVars(theme);
  const navigate = useNavigate();
  // State management
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedClients, setSelectedClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState(null);

  const { 
    clients,
    loading, 
    error, 
    fetchClients,
    createClient,
    updateClient,
    deleteClient
  } = useClients();

  // Debug Redux state
  const clientsState = useSelector(state => state.clients);
  console.log('Redux clients state:', clientsState);

  // Fetch clients on component mount
  useEffect(() => {
    const loadClients = async () => {
      try {
        console.log('Fetching clients...');
        await fetchClients();
        console.log('Clients fetched successfully');
      } catch (error) {
        console.error('Failed to load clients:', error);
        setMessage({
          type: 'error',
          content: 'Failed to load clients. Please try again.'
        });
      }
    };
    
    loadClients();
  }, [fetchClients]);

  // Event handlers
  const handleSearchChange = (value) => {
    setSearchValue(value);
    console.log('Searching for:', value);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    console.log('Status filter:', value);
  };

  const handleTypeChange = (value) => {
    setTypeFilter(value);
    console.log('Type filter:', value);
  };

  const handleMoreFilters = () => {
    setMessage({
      type: 'info',
      content: 'Advanced filters will be implemented here'
    });
  };

  const handleSelectClient = (clientId) => {
    setSelectedClients(prev => 
      prev.includes(clientId) 
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedClients((clients || []).map(client => client.id));
    } else {
      setSelectedClients([]);
    }
  };

  const handleView = (client) => {
    setMessage({
      type: 'info',
      content: `Viewing details for ${client.name}`
    });
  };

  const handleEdit = (client) => {
    setMessage({
      type: 'info',
      content: `Editing ${client.name}`
    });
  };

  const handleDelete = async (client) => {
    try {
      await deleteClient(client.id);
      setMessage({
        type: 'success',
        content: `Successfully deleted ${client.name}`
      });
    } catch (error) {
      setMessage({
        type: 'error',
        content: `Failed to delete ${client.name}: ${error.message}`
      });
    }
  };

  const handleExport = () => {
    setMessage({
      type: 'success',
      content: 'Exporting client data...'
    });
  };

  const handleBulkAction = (action) => {
    setMessage({
      type: 'info',
      content: `${action} for ${selectedClients.length} clients`
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log('Page changed to:', page);
  };

  const handleCreateClient = () => {
    console.log('Create new client');
    navigate('/dashboard/clients/new');
  };

  // Calculate client summary data
  const clientSummaryData = {
    totalClients: clients?.length || 0,
    activeClients: clients?.filter(client => client.status === 'active').length || 0,
    newClients: clients?.filter(client => {
      const createdAt = client.createdAt?.toDate ? client.createdAt.toDate() : new Date(client.createdAt);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return createdAt > thirtyDaysAgo;
    }).length || 0,
    inactiveClients: clients?.filter(client => client.status === 'inactive').length || 0
  };

  // Filter clients based on search and filters
  const filteredClients = (clients || []).filter(client => {
    const matchesSearch = !searchValue || 
      client.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchValue.toLowerCase()) ||
      client.phone?.includes(searchValue);
    
    const matchesStatus = !statusFilter || client.status === statusFilter;
    const matchesType = !typeFilter || client.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  
  // Show loading state
  if (loading) {
    return (
      <div style={{ marginTop: '5%', backgroundColor: pageBg, padding: "2%" }}>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Loader>Loading clients...</Loader>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div style={{ marginTop: '5%', backgroundColor: pageBg, padding: "2%" }}>
        <Message type="error" style={{ marginBottom: 20 }}>
          Error loading clients: {error}
        </Message>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '5%', backgroundColor: pageBg, padding: "2%" }}>
      <ClientDashboardHeader 
        title="Client Management"
        subtitle="Manage your client relationships and information"
        onCreateClient={handleCreateClient}
        createText="Add Client"
        onExport={handleExport}
        exportText="Export"
        selectedCount={selectedClients.length}
        onAddClient={handleCreateClient}
        onBulkAction={handleBulkAction}
      />

       

      <ClientSummaryCards data={clientSummaryData} />

      <ClientSearchFilter
        searchValue={searchValue}
        statusFilter={statusFilter}
        typeFilter={typeFilter}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onTypeChange={handleTypeChange}
        onMoreFilters={handleMoreFilters}
      />

      <ClientTable 
        data={filteredClients}
        loading={loading}
        error={error}
        selectedClients={selectedClients}
        onSelectClient={handleSelectClient}
        onSelectAll={handleSelectAll}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ClientPagination 
        currentPage={currentPage}
        totalPages={Math.ceil(filteredClients.length / 10)}
        onPageChange={handlePageChange}
      />

      {message && (
        <Message
          type={message.type}
          style={{ marginTop: 16 }}
          onClose={() => setMessage(null)}
        >
          {message.content}
        </Message>
      )}
    </div>
  );
};

export default ClientManagement; 