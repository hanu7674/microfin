import React, { useState } from 'react';
import { Stack, Panel, Button, Table, Tag, Avatar, Whisper, Tooltip, IconButton } from 'rsuite';
import { FaTicketAlt, FaUser, FaClock, FaExclamationTriangle, FaCheckCircle, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const SupportTickets = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor, success, warning, danger, info } = getThemeVars(theme);

  const [tickets, setTickets] = useState([
    {
      id: 'TKT-001',
      title: 'Payment Gateway Integration Issue',
      customer: 'Rajesh Kumar',
      email: 'rajesh@business.com',
      status: 'Open',
      priority: 'High',
      category: 'Technical',
      createdAt: '2024-01-15',
      lastUpdated: '2 hours ago'
    },
    {
      id: 'TKT-002',
      title: 'Invoice Generation Problem',
      customer: 'Priya Sharma',
      email: 'priya@business.com',
      status: 'In Progress',
      priority: 'Medium',
      category: 'Billing',
      createdAt: '2024-01-14',
      lastUpdated: '1 day ago'
    },
    {
      id: 'TKT-003',
      title: 'User Access Permission',
      customer: 'Amit Patel',
      email: 'amit@business.com',
      status: 'Resolved',
      priority: 'Low',
      category: 'Account',
      createdAt: '2024-01-13',
      lastUpdated: '3 days ago'
    },
    {
      id: 'TKT-004',
      title: 'Report Export Error',
      customer: 'Neha Singh',
      email: 'neha@business.com',
      status: 'Open',
      priority: 'High',
      category: 'Reports',
      createdAt: '2024-01-12',
      lastUpdated: '4 hours ago'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'red';
      case 'In Progress': return 'orange';
      case 'Resolved': return 'green';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'red';
      case 'Medium': return 'orange';
      case 'Low': return 'green';
      default: return 'default';
    }
  };

  const renderCustomer = (ticket) => (
    <Stack alignItems="center" spacing={12}>
      <Avatar size="sm" style={{ backgroundColor: '#f0f0f0' }}>
        <FaUser style={{ color: '#666' }} />
      </Avatar>
      <div>
        <div style={{
          fontSize: 14,
          fontWeight: 500,
          color: cardText
        }}>
          {ticket.customer}
        </div>
        <div style={{
          fontSize: 12,
          color: cardText,
          opacity: 0.7
        }}>
          {ticket.email}
        </div>
      </div>
    </Stack>
  );

  const renderStatus = (status) => (
    <Tag color={getStatusColor(status)} style={{ 
      backgroundColor: getStatusColor(status) === 'green' ? '#e6f4ea' : 
                     getStatusColor(status) === 'orange' ? '#fff3e0' : '#ffebee',
      color: getStatusColor(status) === 'green' ? '#1e7e34' : 
             getStatusColor(status) === 'orange' ? '#f57c00' : '#d32f2f'
    }}>
      {status}
    </Tag>
  );

  const renderPriority = (priority) => (
    <Tag color={getPriorityColor(priority)} style={{ 
      backgroundColor: getPriorityColor(priority) === 'red' ? '#ffebee' : 
                     getPriorityColor(priority) === 'orange' ? '#fff3e0' : '#e6f4ea',
      color: getPriorityColor(priority) === 'red' ? '#d32f2f' : 
             getPriorityColor(priority) === 'orange' ? '#f57c00' : '#1e7e34'
    }}>
      {priority}
    </Tag>
  );

  const renderActions = (ticket) => (
    <Stack spacing={8}>
      <Whisper
        placement="top"
        trigger="hover"
        speaker={<Tooltip>View Details</Tooltip>}
      >
        <IconButton icon={<FaEye />} appearance="subtle" circle />
      </Whisper>
      <Whisper
        placement="top"
        trigger="hover"
        speaker={<Tooltip>Edit Ticket</Tooltip>}
      >
        <IconButton icon={<FaEdit />} appearance="subtle" circle />
      </Whisper>
      <Whisper
        placement="top"
        trigger="hover"
        speaker={<Tooltip>Delete Ticket</Tooltip>}
      >
        <IconButton icon={<FaTrash />} appearance="subtle" circle color="red" />
      </Whisper>
    </Stack>
  );

  return (
    <div style={{ marginBottom: 32 }}>
      <Panel
        style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: 8,
          boxShadow: shadow
        }}
      >
        <Stack justifyContent="space-between" alignItems="center" style={{
          marginBottom: 24,
          padding: '10px 16px',
          borderBottom: `3px solid ${cardBorderBottomColor}`,
          borderBottomWidth: 1
        }}>
          <div style={{
            fontSize: 18,
            fontWeight: 600,
            color: cardText
          }}>
            Support Tickets
          </div>
          <Button appearance="primary" size="sm">
            <FaTicketAlt style={{ marginRight: 8 }} />
            New Ticket
          </Button>
        </Stack>

        <div style={{ padding: '0 16px 16px' }}>
          <Table
            data={tickets}
            autoHeight
            style={{ background: 'transparent' }}
            rowHeight={60}
          >
            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Ticket</Table.HeaderCell>
              <Table.Cell>
                {(rowData) => (
                  <div>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: cardText,
                      marginBottom: 2
                    }}>
                      {rowData.title}
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: cardText,
                      opacity: 0.7
                    }}>
                      {rowData.id} • {rowData.category}
                    </div>
                  </div>
                )}
              </Table.Cell>
            </Table.Column>

            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Customer</Table.HeaderCell>
              <Table.Cell>
                {(rowData) => renderCustomer(rowData)}
              </Table.Cell>
            </Table.Column>

            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.Cell>
                {(rowData) => renderStatus(rowData.status)}
              </Table.Cell>
            </Table.Column>

            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Priority</Table.HeaderCell>
              <Table.Cell>
                {(rowData) => renderPriority(rowData.priority)}
              </Table.Cell>
            </Table.Column>

            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Updated</Table.HeaderCell>
              <Table.Cell dataKey="lastUpdated" />
            </Table.Column>

            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.Cell>
                {(rowData) => renderActions(rowData)}
              </Table.Cell>
            </Table.Column>
          </Table>
        </div>
      </Panel>
    </div>
  );
};

export default SupportTickets; 