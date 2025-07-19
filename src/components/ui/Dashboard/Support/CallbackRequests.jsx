import React, { useState } from 'react';
import { Stack, Panel, Button, Table, Tag, Avatar, Whisper, Tooltip , IconButton} from 'rsuite';
import { FaPhone, FaUser, FaClock, FaCheckCircle, FaTimes, FaEye, FaPhoneAlt } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const CallbackRequests = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor, success, warning, danger, info } = getThemeVars(theme);

  const [callbackRequests, setCallbackRequests] = useState([
    {
      id: 'CB-001',
      customer: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh@business.com',
      reason: 'Payment Gateway Issue',
      preferredTime: '10:00 AM - 12:00 PM',
      status: 'Pending',
      requestTime: '2 hours ago',
      priority: 'High'
    },
    {
      id: 'CB-002',
      customer: 'Priya Sharma',
      phone: '+91 87654 32109',
      email: 'priya@business.com',
      reason: 'Invoice Generation Help',
      preferredTime: '2:00 PM - 4:00 PM',
      status: 'Scheduled',
      requestTime: '1 day ago',
      priority: 'Medium'
    },
    {
      id: 'CB-003',
      customer: 'Amit Patel',
      phone: '+91 76543 21098',
      email: 'amit@business.com',
      reason: 'Account Setup Assistance',
      preferredTime: '11:00 AM - 1:00 PM',
      status: 'Completed',
      requestTime: '3 days ago',
      priority: 'Low'
    },
    {
      id: 'CB-004',
      customer: 'Neha Singh',
      phone: '+91 65432 10987',
      email: 'neha@business.com',
      reason: 'Report Configuration',
      preferredTime: '3:00 PM - 5:00 PM',
      status: 'Pending',
      requestTime: '4 hours ago',
      priority: 'High'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'orange';
      case 'Scheduled': return 'blue';
      case 'Completed': return 'green';
      case 'Cancelled': return 'red';
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

  const renderCustomer = (request) => (
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
          {request.customer}
        </div>
        <div style={{
          fontSize: 12,
          color: cardText,
          opacity: 0.7
        }}>
          {request.phone}
        </div>
      </div>
    </Stack>
  );

  const renderStatus = (status) => (
    <Tag color={getStatusColor(status)} style={{ 
      backgroundColor: getStatusColor(status) === 'green' ? '#e6f4ea' : 
                     getStatusColor(status) === 'blue' ? '#e3f2fd' : 
                     getStatusColor(status) === 'orange' ? '#fff3e0' : '#ffebee',
      color: getStatusColor(status) === 'green' ? '#1e7e34' : 
             getStatusColor(status) === 'blue' ? '#1976d2' : 
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

  const renderActions = (request) => (
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
        speaker={<Tooltip>Call Customer</Tooltip>}
      >
        <IconButton icon={<FaPhoneAlt />} appearance="subtle" circle color="green" />
      </Whisper>
      <Whisper
        placement="top"
        trigger="hover"
        speaker={<Tooltip>Mark Complete</Tooltip>}
      >
        <IconButton icon={<FaCheckCircle />} appearance="subtle" circle color="green" />
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
            Callback Requests
          </div>
          <Button appearance="primary" size="sm">
            <FaPhone style={{ marginRight: 8 }} />
            New Request
          </Button>
        </Stack>

        <div style={{ padding: '0 16px 16px' }}>
          <Table
            data={callbackRequests}
            autoHeight
            style={{ background: 'transparent' }}
            rowHeight={60}
          >
            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Customer</Table.HeaderCell>
              <Table.Cell>
                {(rowData) => renderCustomer(rowData)}
              </Table.Cell>
            </Table.Column>

            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Reason</Table.HeaderCell>
              <Table.Cell dataKey="reason" />
            </Table.Column>

            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Preferred Time</Table.HeaderCell>
              <Table.Cell dataKey="preferredTime" />
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
              <Table.HeaderCell>Requested</Table.HeaderCell>
              <Table.Cell dataKey="requestTime" />
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

export default CallbackRequests; 