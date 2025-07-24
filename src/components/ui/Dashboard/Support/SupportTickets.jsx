import React, { useState } from 'react';
import { Stack, Panel, Button, Table, Tag, Avatar, Whisper, Tooltip, IconButton, Loader, Message, Modal, Form, Schema, SelectPicker } from 'rsuite';
import { FaTicketAlt, FaUser, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { useSelector } from 'react-redux';
import { useSupport } from '../../../../hooks/useDataService';

const { StringType } = Schema.Types;
const ticketModel = Schema.Model({
  title: StringType().isRequired('Title is required'),
  customer: StringType().isRequired('Customer name is required'),
  email: StringType().isEmail('Enter a valid email').isRequired('Email is required'),
  category: StringType().isRequired('Category is required'),
  priority: StringType().isRequired('Priority is required'),
});

const SupportTickets = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);
  const tickets = useSelector(state => state.support.tickets);
  const loading = useSelector(state => state.support.ticketsLoading);
  const error = useSelector(state => state.support.ticketsError);
  const addLoading = useSelector(state => state.support.addTicketLoading);

  const { createSupportTicket,  } = useSupport();
  const [showModal, setShowModal] = useState(false);
  const [formValue, setFormValue] = useState({
    title: '',
    customer: '',
    email: '',
    category: '',
    priority: '',
  });
  const [formError, setFormError] = useState({});

  const handleAddTicket = () => {
    if (!ticketModel.check(formValue)) {
      setFormError(ticketModel.check(formValue));
      return;
    }
    createSupportTicket(formValue);
    setShowModal(false);
    setFormValue({
      title: '',
      customer: '',
      email: '',
      category: '',
      priority: '',
    });
  };

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
        <div style={{ fontSize: 14, fontWeight: 500, color: cardText }}>{ticket.customer}</div>
        <div style={{ fontSize: 12, color: cardText, opacity: 0.7 }}>{ticket.email}</div>
      </div>
    </Stack>
  );

  const renderStatus = (status) => (
    <Tag color={getStatusColor(status)} style={{ 
      backgroundColor: getStatusColor(status) === 'green' ? '#e6f4ea' : 
                     getStatusColor(status) === 'orange' ? '#fff3e0' : '#ffebee',
      color: getStatusColor(status) === 'green' ? '#1e7e34' : 
             getStatusColor(status) === 'orange' ? '#f57c00' : '#d32f2f'
    }}>{status}</Tag>
  );

  const renderPriority = (priority) => (
    <Tag color={getPriorityColor(priority)} style={{ 
      backgroundColor: getPriorityColor(priority) === 'red' ? '#ffebee' : 
                     getPriorityColor(priority) === 'orange' ? '#fff3e0' : '#e6f4ea',
      color: getPriorityColor(priority) === 'red' ? '#d32f2f' : 
             getPriorityColor(priority) === 'orange' ? '#f57c00' : '#1e7e34'
    }}>{priority}</Tag>
  );

  const renderActions = (ticket) => (
    <Stack spacing={8}>
      <Whisper placement="top" trigger="hover" speaker={<Tooltip>View Details</Tooltip>}>
        <IconButton icon={<FaEye />} appearance="subtle" circle />
      </Whisper>
      <Whisper placement="top" trigger="hover" speaker={<Tooltip>Edit Ticket</Tooltip>}>
        <IconButton icon={<FaEdit />} appearance="subtle" circle />
      </Whisper>
      <Whisper placement="top" trigger="hover" speaker={<Tooltip>Delete Ticket</Tooltip>}>
        <IconButton icon={<FaTrash />} appearance="subtle" circle color="red" />
      </Whisper>
    </Stack>
  );

  const renderUpdated = (updated) => {
    return <div>
      {
        updated ? new Date(updated.toDate()).toLocaleString() : 'N/A'
      }
      </div>;
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <Panel style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 8, boxShadow: shadow }}>
        <Stack justifyContent="space-between" alignItems="center" style={{ marginBottom: 24, padding: '10px 16px', borderBottom: `3px solid ${cardBorderBottomColor}`, borderBottomWidth: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: cardText }}>Support Tickets</div>
          <Button appearance="primary" size="sm" onClick={() => setShowModal(true)}>
            <FaTicketAlt style={{ marginRight: 8 }} />
            New Ticket
          </Button>
        </Stack>
        <div style={{ padding: '0 16px 16px' }}>
          {loading && <Loader center content="Loading tickets..." />}
          {error && <Message type="error" description={error} />}
          <Table data={tickets} autoHeight style={{ background: 'transparent' }} rowHeight={60}>
            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Ticket</Table.HeaderCell>
              <Table.Cell>
                {(rowData) => (
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: cardText, marginBottom: 2 }}>{rowData.title}</div>
                    <div style={{ fontSize: 12, color: cardText, opacity: 0.7 }}>{rowData.id} • {rowData.category}</div>
                  </div>
                )}
              </Table.Cell>
            </Table.Column>
            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Customer</Table.HeaderCell>
              <Table.Cell>{(rowData) => renderCustomer(rowData)}</Table.Cell>
            </Table.Column>
            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.Cell>{(rowData) => renderStatus(rowData.status)}</Table.Cell>
            </Table.Column>
            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Priority</Table.HeaderCell>
              <Table.Cell>{(rowData) => renderPriority(rowData.priority)}</Table.Cell>
            </Table.Column>
            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Updated</Table.HeaderCell>
              <Table.Cell dataKey="lastUpdated" >{(rowData) => renderUpdated(rowData.lastUpdated)}</Table.Cell>
            </Table.Column>
            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.Cell>{(rowData) => renderActions(rowData)}</Table.Cell>
            </Table.Column>
          </Table>
        </div>
      </Panel>
      <Modal open={showModal} onClose={() => setShowModal(false)} size="xs">
        <Modal.Header>
          <Modal.Title>New Support Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            model={ticketModel}
            formValue={formValue}
            onChange={setFormValue}
            onCheck={setFormError}
            checkTrigger="change"
            error={formError}
          >
            <Form.Group controlId="title">
              <Form.ControlLabel>Title</Form.ControlLabel>
              <Form.Control name="title" />
            </Form.Group>
            <Form.Group controlId="customer">
              <Form.ControlLabel>Customer Name</Form.ControlLabel>
              <Form.Control name="customer" />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control name="email" />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.ControlLabel>Category</Form.ControlLabel>
              <Form.Control name="category" block accepter={SelectPicker} data={[{label: 'Technical', value: 'Technical'}, {label: 'Billing', value: 'Billing'}, {label: 'Account', value: 'Account'}, {label: 'Reports', value: 'Reports'}, {label: 'Other', value: 'Other'}]} />
            </Form.Group>
            <Form.Group controlId="priority">
              <Form.ControlLabel>Priority</Form.ControlLabel>
              <Form.Control name="priority" block accepter={SelectPicker} data={[{label: 'High', value: 'High'}, {label: 'Medium', value: 'Medium'}, {label: 'Low', value: 'Low'}]} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddTicket} appearance="primary" loading={addLoading}>Add Ticket</Button>
          <Button onClick={() => setShowModal(false)} appearance="subtle">Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SupportTickets; 