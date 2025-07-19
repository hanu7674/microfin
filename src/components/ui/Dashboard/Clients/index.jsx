import React, { useState } from 'react';
import { Container, Message } from 'rsuite';
import ClientDashboardHeader from './ClientDashboardHeader';
import ClientSummaryCards from './ClientSummaryCards';
import ClientSearchFilter from './ClientSearchFilter';
import ClientTable from './ClientTable';
import ClientPagination from './ClientPagination';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const ClientManagement = () => {
  const { theme } = useTheme();
  const { pageBg } = getThemeVars(theme);
  
  // State management
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedClients, setSelectedClients] = useState([]);
  const [message, setMessage] = useState(null);


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
      // Select all clients (you would get this from your data)
      setSelectedClients(['RK001', 'PS002', 'AP003', 'SK004', 'RM005']);
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

  const handleEmail = (client) => {
    setMessage({
      type: 'success',
      content: `Email sent to ${client.name}`
    });
  };

  const handleExport = () => {
    setMessage({
      type: 'success',
      content: 'Client data exported successfully!'
    });
  };

  const handleAddClient = () => {
    setMessage({
      type: 'info',
      content: 'Add client form will open here'
    });
  };

 
  // Clear message after 3 seconds
  React.useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div style={{ 
      background: pageBg,
      minHeight: '100vh',
      padding: '2%',
      marginTop: '5%'
    }}>
      <Container>
        {message && (
          <Message
            type={message.type}
            style={{ marginBottom: 24 }}
            closable
            onClose={() => setMessage(null)}
          >
            {message.content}
          </Message>
        )}

        <ClientDashboardHeader 
          onExport={handleExport}
          onAddClient={handleAddClient}
        />

        <ClientSummaryCards />

        <ClientSearchFilter 
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          statusFilter={statusFilter}
          onStatusChange={handleStatusChange}
          typeFilter={typeFilter}
          onTypeChange={handleTypeChange}
          onMoreFilters={handleMoreFilters}
        />

        <ClientTable 
          selectedClients={selectedClients}
          onSelectClient={handleSelectClient}
          onSelectAll={handleSelectAll}
          onView={handleView}
          onEdit={handleEdit}
          onEmail={handleEmail}
        />
      </Container>
    </div>
  );
};

export default ClientManagement; 