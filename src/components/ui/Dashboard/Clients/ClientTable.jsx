import React, { useState } from 'react';
import { Table, Tag, Checkbox, Button, Whisper, Tooltip } from 'rsuite';
import { FaEye, FaEdit, FaEnvelope, FaUser } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import ClientPagination from './ClientPagination';

const { Column, HeaderCell, Cell } = Table;

const ClientTable = ({ data, selectedClients, onSelectClient, onSelectAll, onView, onEdit, onEmail }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow } = getThemeVars(theme);
  const [currentPage, setCurrentPage] = useState(1);

  // Sample client data
  const defaultClients = [
    {
      id: 'RK001',
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh@email.com',
      type: 'Individual',
      transactions: '₹45,000',
      lastActivity: '2 days ago',
      status: 'Active'
    },
    {
      id: 'PS002',
      name: 'Priya Sharma',
      phone: '+91 87654 32109',
      email: 'priya@email.com',
      type: 'Business',
      transactions: '₹78,500',
      lastActivity: '1 week ago',
      status: 'Active'
    },
    {
      id: 'AP003',
      name: 'Amit Patel',
      phone: '+91 76543 21098',
      email: 'amit@email.com',
      type: 'Individual',
      transactions: '₹32,000',
      lastActivity: '3 days ago',
      status: 'Inactive'
    },
    {
      id: 'SK004',
      name: 'Sunita Kumar',
      phone: '+91 65432 10987',
      email: 'sunita@email.com',
      type: 'Business',
      transactions: '₹1,25,000',
      lastActivity: '1 day ago',
      status: 'Active'
    },
    {
      id: 'RM005',
      name: 'Rahul Mehta',
      phone: '+91 54321 09876',
      email: 'rahul@email.com',
      type: 'Individual',
      transactions: '₹28,500',
      lastActivity: '5 days ago',
      status: 'Active'
    }
  ];
    const pageSize=Math.ceil(data.length / 10);

    const totalResults = data.length;
    const totalPages = Math.ceil(totalResults / pageSize);

  const clientData = data || defaultClients;

  const handlePageChange = (page) => {
    setCurrentPage(page);
   };

  const getStatusTag = (status) => (
    <Tag color={status === 'Active' ? 'green' : 'red'} style={{ 
      backgroundColor: status === 'Active' ? '#e6f4ea' : '#ffebee',
      color: status === 'Active' ? '#1e7e34' : '#c62828',
      border: 'none',
      borderRadius: 12,
      padding: '4px 12px',
      fontSize: 12,
      fontWeight: 500
    }}>
      {status}
    </Tag>
  );

  const getTypeTag = (type) => (
    <Tag color="blue" style={{ 
      backgroundColor: '#e3f2fd',
      color: '#1976d2',
      border: 'none',
      borderRadius: 12,
      padding: '4px 12px',
      fontSize: 12,
      fontWeight: 500
    }}>
      {type}
    </Tag>
  );

  const buttonStyle = {
    padding: '6px',
    minWidth: 'auto',
    border: 'none',
    background: 'transparent',
    color: cardText,
    opacity: 0.7,
    cursor: 'pointer'
  };

  // Safe rowClassName function with null checks
  const getRowClassName = (rowData) => {
    if (!rowData || !rowData.id) return '';
    return selectedClients.includes(rowData.id) ? 'selected-row' : '';
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: 8,
          padding: '2%',
          boxShadow: shadow
        }}
      >
        <div style={{ margin: '2%' }}>
          <Table
            data={clientData}
            autoHeight
            rowHeight={70}
            bordered
            hover
            style={{
              background: 'transparent',
              color: cardText
            }}
            headerHeight={50}
            rowClassName={getRowClassName}
          >
            <Column width={50} fixed>
              <HeaderCell>
                <Checkbox
                  checked={selectedClients.length === clientData.length && clientData.length > 0}
                  indeterminate={selectedClients.length > 0 && selectedClients.length < clientData.length}
                  onChange={onSelectAll}
                />
              </HeaderCell>
              <Cell>
                {(rowData) => (
                  <Checkbox
                    checked={selectedClients.includes(rowData.id)}
                    onChange={() => onSelectClient(rowData.id)}
                  />
                )}
              </Cell>
            </Column>

            <Column flexGrow={2} minWidth={300} >
              <HeaderCell style={{ color: cardText, fontWeight: 600 }}>Client</HeaderCell>
              <Cell>
                {(rowData) => (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                  }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: '#e3f2fd',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#1976d2'
                    }}>
                      <FaUser />
                    </div>
                    <div>
                      <div style={{
                        fontWeight: 600,
                        color: cardText,
                        marginBottom: 2
                      }}>
                        {rowData.name}
                      </div>
                      <div style={{
                        fontSize: 12,
                        color: cardText,
                        opacity: 0.7
                      }}>
                        {rowData.id}
                      </div>
                    </div>
                  </div>
                )}
              </Cell>
            </Column>

            <Column flexGrow={2} minWidth={180}>
              <HeaderCell style={{ color: cardText, fontWeight: 600 }}>Contact</HeaderCell>
              <Cell>
                {(rowData) => (
                  <div>
                    <div style={{
                      color: cardText,
                      marginBottom: 2
                    }}>
                      {rowData.phone}
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: cardText,
                      opacity: 0.7
                    }}>
                      {rowData.email}
                    </div>
                  </div>
                )}
              </Cell>
            </Column>

            <Column flexGrow={1} minWidth={150}>
              <HeaderCell style={{ color: cardText, fontWeight: 600 }}>Type</HeaderCell>
              <Cell>
                {(rowData) => getTypeTag(rowData.type)}
              </Cell>
            </Column>

            <Column flexGrow={1} minWidth={120}>
              <HeaderCell style={{ color: cardText, fontWeight: 600 }}>Total Transactions</HeaderCell>
              <Cell>
                {(rowData) => (
                  <span style={{ color: cardText , opacity: 0.8}}>
                    {rowData?.transactions || 'N/A'}
                  </span>
                )}
              </Cell>
            </Column>

            <Column flexGrow={1} minWidth={120}>
              <HeaderCell style={{ color: cardText, fontWeight: 600 }}>Last Activity</HeaderCell>
              <Cell>
                {(rowData) => (
                  <span style={{ color: cardText, opacity: 0.8 }}>
                    {rowData?.lastActivity || 'N/A'}
                  </span>
                )}
              </Cell>
            </Column>

            <Column flexGrow={1} minWidth={100}>
              <HeaderCell style={{ color: cardText, fontWeight: 600 }}>Status</HeaderCell>
              <Cell>
                {(rowData) => getStatusTag(rowData?.status || 'N/A')}
              </Cell>
            </Column>

            <Column flexGrow={1} minWidth={120}>
              <HeaderCell style={{ color: cardText, fontWeight: 600 }}>Actions</HeaderCell>
              <Cell>
                {(rowData) => (
                  <div style={{
                    display: 'flex',
                    gap: 8,
                    alignItems: 'center'
                  }}>
                    <Whisper
                      placement="top"
                      speaker={<Tooltip>View Details</Tooltip>}
                    >
                      <Button
                        size="xs"
                        appearance="ghost"
                        style={buttonStyle}
                        onClick={() => onView(rowData)}
                      >
                        <FaEye />
                      </Button>
                    </Whisper>
                    <Whisper
                      placement="top"
                      speaker={<Tooltip>Edit Client</Tooltip>}
                    >
                      <Button
                        size="xs"
                        appearance="ghost"
                        style={buttonStyle}
                        onClick={() => onEdit(rowData)}
                      >
                        <FaEdit />
                      </Button>
                    </Whisper>
                    <Whisper
                      placement="top"
                      speaker={<Tooltip>Send Email</Tooltip>}
                    >
                      <Button
                        size="xs"
                        appearance="ghost"
                        style={buttonStyle}
                        onClick={() => onEmail(rowData)}
                      >
                        <FaEnvelope />
                      </Button>
                    </Whisper>
                  </div>
                )}
              </Cell>
            </Column>
          </Table>
          <div style={{ marginTop: 20 }}></div>
          <ClientPagination currentPage={currentPage}
          totalPages={totalPages}
          totalResults={totalResults}
          pageSize={pageSize}
          onPageChange={handlePageChange}/>  
        </div>
      </div>
    </div>
  );
};

export default ClientTable; 