import React, { useState } from 'react';
import { Stack, Panel, Button, Table, Tag, Avatar, Whisper, Tooltip, IconButton, Loader, Message, Modal, Form, Schema, toaster, Notification, SelectPicker, TimePicker } from 'rsuite';
import { FaPhone, FaUser, FaEye, FaPhoneAlt, FaCheckCircle, FaTrash } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { useSelector } from 'react-redux';
import { useSupport } from '../../../../hooks/useDataService';

const { StringType, DateType } = Schema.Types;
const callbackModel = Schema.Model({
  customer: StringType().isRequired('Customer name is required'),
  phone: StringType().isRequired('Phone is required'),
  email: StringType().isEmail('Enter a valid email').isRequired('Email is required'),
  reason: StringType().isRequired('Reason is required'),
  preferredTime: DateType().isRequired('Preferred time is required'),
  priority: StringType().isRequired('Priority is required'),
});

const CallbackRequests = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);
  const callbackRequests = useSelector(state => state.support.callbackRequests);
  const loading = useSelector(state => state.support.callbackLoading);
  const error = useSelector(state => state.support.callbackError);
  const { createCallbackRequest, updateCallbackRequest, deleteCallbackRequest } = useSupport();

   
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [formValue, setFormValue] = useState({
    customer: '',
    phone: '',
    email: '',
    reason: '',
    preferredTime: '',
    priority: '',
  });
  const [formError, setFormError] = useState({});

  const handleAddRequest = () => {
    if (!callbackModel.check(formValue)) {
      setFormError(callbackModel.check(formValue));
      return;
    }
    createCallbackRequest(formValue);
    setShowModal(false);
    setFormValue({
      customer: '',
      phone: '',
      email: '',
      reason: '',
      preferredTime: '',
      priority: '',
    });
    setFormError({});
    toaster.push(<Notification type="success" header="Success">Callback request created!</Notification>, { placement: 'topEnd' });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setViewMode(false);
    setFormValue({
      customer: '',
      phone: '',
      email: '',
      reason: '',
      preferredTime: '',
      priority: '',
    });
    setFormError({});
  };

  const handleViewDetails = (request) => {
    setFormValue(request);
    setViewMode(true);
    setShowModal(true);
  };

  const handleMarkComplete = (request) => {
    updateCallbackRequest(request.id, { ...request, status: 'Completed' });
    toaster.push(<Notification type="success" header="Success">Marked as completed</Notification>, { placement: 'topEnd' });
  };

  const handleDelete = (request) => {
    deleteCallbackRequest(request.id);
    toaster.push(<Notification type="success" header="Success">Request deleted</Notification>, { placement: 'topEnd' });
  };

  const handleCall = (request) => {
    window.open(`tel:${request.phone}`);
  };

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
        <div style={{ fontSize: 14, fontWeight: 500, color: cardText }}>{request.customer}</div>
        <div style={{ fontSize: 12, color: cardText, opacity: 0.7 }}>{request.phone}</div>
      </div>
    </Stack>
  );

  const renderStatus = (status) => (
    <div>
      {status ? (
        
     
    <Tag color={getStatusColor(status)} style={{ 
      backgroundColor: getStatusColor(status) === 'green' ? '#e6f4ea' : 
                     getStatusColor(status) === 'blue' ? '#e3f2fd' : 
                     getStatusColor(status) === 'orange' ? '#fff3e0' : '#ffebee',
      color: getStatusColor(status) === 'green' ? '#1e7e34' : 
             getStatusColor(status) === 'blue' ? '#1976d2' : 
             getStatusColor(status) === 'orange' ? '#f57c00' : '#d32f2f'
    }}>{status}</Tag>): <>
    <Tag color="red" style={{ backgroundColor: '#ffebee', color: '#d32f2f' }}>N/A</Tag>
    </>
  }
  </div>
  );

  const renderPriority = (priority) => (
    <Tag color={getPriorityColor(priority)} style={{ 
      backgroundColor: getPriorityColor(priority) === 'red' ? '#ffebee' : 
                     getPriorityColor(priority) === 'orange' ? '#fff3e0' : '#e6f4ea',
      color: getPriorityColor(priority) === 'red' ? '#d32f2f' : 
             getPriorityColor(priority) === 'orange' ? '#f57c00' : '#1e7e34'
    }}>{priority}</Tag>
  );

  const renderActions = (request) => (
    <Stack spacing={8}>
      <Whisper placement="top" trigger="hover" speaker={<Tooltip>View Details</Tooltip>}>
        <IconButton icon={<FaEye />} appearance="subtle" circle onClick={() => handleViewDetails(request)} />
      </Whisper>
      <Whisper placement="top" trigger="hover" speaker={<Tooltip>Call Customer</Tooltip>}>
        <IconButton icon={<FaPhoneAlt />} appearance="subtle" circle color="green" onClick={() => handleCall(request)} />
      </Whisper>
      <Whisper placement="top" trigger="hover" speaker={<Tooltip>Mark Complete</Tooltip>}>
        <IconButton icon={<FaCheckCircle />} appearance="subtle" circle color="green" onClick={() => handleMarkComplete(request)} />
      </Whisper>
      <Whisper placement="top" trigger="hover" speaker={<Tooltip>Delete Request</Tooltip>}>
        <IconButton icon={<FaTrash />} appearance="subtle" circle color="red" onClick={() => handleDelete(request)} />
      </Whisper>
    </Stack>
  );

  

  return (
    <div style={{ marginBottom: 32 }}>
      <Panel style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 8, boxShadow: shadow }}>
        <Stack justifyContent="space-between" alignItems="center" style={{ marginBottom: 24, padding: '10px 16px', borderBottom: `3px solid ${cardBorderBottomColor}`, borderBottomWidth: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: cardText }}>Callback Requests</div>
          <Button appearance="primary" size="sm" onClick={() => setShowModal(true)}>
            <FaPhone style={{ marginRight: 8 }} />
            New Request
          </Button>
        </Stack>
        <div style={{ padding: '0 16px 16px' }}>
          {loading && <Loader center content="Loading requests..." />}
          {error && <Message type="error" description={error} />}
          <Table data={callbackRequests} autoHeight  rowHeight={60}>
            <Table.Column flexGrow={2}>
              <Table.HeaderCell>Customer</Table.HeaderCell>
              <Table.Cell>{(rowData) => renderCustomer(rowData)}</Table.Cell>
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
              <Table.Cell>{(rowData) => renderStatus(rowData.status)}</Table.Cell>
            </Table.Column>
            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Priority</Table.HeaderCell>
              <Table.Cell>{(rowData) => renderPriority(rowData.priority)}</Table.Cell>
            </Table.Column>
             
            <Table.Column flexGrow={2}>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.Cell>{(rowData) => renderActions(rowData)}</Table.Cell>
            </Table.Column>
          </Table>
        </div>
      </Panel>
      <Modal open={showModal} onClose={() => handleCloseModal()} size="xs">
        <Modal.Header>
          <Modal.Title>{viewMode ? 'Callback Request Details' : 'New Callback Request'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            model={callbackModel}
            formValue={formValue}
            onChange={setFormValue}
            onCheck={setFormError}
            checkTrigger="change"
            error={formError}
            readOnly={viewMode}
          >
            <Form.Group controlId="customer">
              <Form.ControlLabel>Customer Name</Form.ControlLabel>
              <Form.Control name="customer" />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.ControlLabel>Phone</Form.ControlLabel>
              <Form.Control name="phone" />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control name="email" />
            </Form.Group>
            <Form.Group controlId="reason">
              <Form.ControlLabel>Reason</Form.ControlLabel>
              <Form.Control name="reason" />
            </Form.Group>
            <Form.Group controlId="preferredTime">
              <Form.ControlLabel>Preferred Time</Form.ControlLabel>
              <Form.Control block accepter={TimePicker}  hideMinutes={minute => minute % 15 !== 0} hideHours={ hour => hour < 9 || hour > 17 } placement='auto' name="preferredTime" />
            </Form.Group>
            <Form.Group controlId="priority">
              <Form.ControlLabel>Priority</Form.ControlLabel>
              <Form.Control name="priority" block accepter={SelectPicker} data={[{label: 'High', value: 'High'}, {label: 'Medium', value: 'Medium'}, {label: 'Low', value: 'Low'}]} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {viewMode && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={() => handleCloseModal()} appearance="subtle">Close</Button>
              <Button appearance="primary" onClick={() => setViewMode(false)}>Edit Request</Button>
            </div>
          )}
          {!viewMode && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={() => setShowModal(false)} appearance="subtle">Cancel</Button>
              <Button onClick={handleAddRequest} appearance="primary">Add a new Request</Button>
            </div>
          )}
          
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CallbackRequests; 