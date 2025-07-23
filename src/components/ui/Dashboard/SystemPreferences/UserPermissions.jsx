import React, { useEffect, useState } from 'react';
import { Stack, Panel, Button, Table, Tag, Avatar, Modal, Form, Schema, SelectPicker } from 'rsuite';
import { FaUser, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { useSelector, useDispatch } from 'react-redux';
import { addBusinessUser, editBusinessUser, fetchBusinessUsers, removeBusinessUser } from '../../../../redux/businessProfile';
import { auth } from '../../../../Firebase/firebase';

const { StringType } = Schema.Types;

const userModel = Schema.Model({
  name: StringType().isRequired('Name is required'),
  email: StringType().isEmail('Please enter a valid email').isRequired('Email is required'),
  role: StringType().isRequired('Role is required'),
  permissions: StringType().isRequired('Permissions are required'),
  status: StringType().isRequired('Status is required'),
});

const defaultUser = {
  name: '',
  email: '',
  role: 'Viewer',
  permissions: 'Read Only',
  status: 'Active',
};

const UserPermissions = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);
  const dispatch = useDispatch();
  const users = useSelector(state => state.businessProfile.users);
  const userId = auth.currentUser?.uid;

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formValue, setFormValue] = useState(defaultUser);
  const [formError, setFormError] = useState({});


  useEffect(() => {
    dispatch(fetchBusinessUsers());
  }, []);

  const openAddModal = () => {
    setEditingUser(null);
    setFormValue(defaultUser);
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormValue(user);
    setShowModal(true);
  };

  const handleRemove = (user) => {
    dispatch(removeBusinessUser(user.id));
  };

  const handleSubmit = () => {
    if (!userId) return;
    if (!userModel.check(formValue)) {
      setFormError(userModel.check(formValue));
      return;
    }
    if (editingUser) {
      dispatch(editBusinessUser(formValue));
    } else {
      dispatch(addBusinessUser(formValue));
    }
    setShowModal(false);
  };

  const renderUser = (user) => (
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
          {user.name}
        </div>
        <div style={{
          fontSize: 12,
          color: cardText,
          opacity: 0.7
        }}>
          {user.email}
        </div>
      </div>
    </Stack>
  );

  const renderRole = (role) => (
    <Tag color="blue" style={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}>
      {role}
    </Tag>
  );

  const renderStatus = (status) => (
    <Tag 
      color={status === 'Active' ? 'green' : 'default'} 
      style={{ 
        backgroundColor: status === 'Active' ? '#e6f4ea' : '#f5f5f5',
        color: status === 'Active' ? '#1e7e34' : '#666'
      }}
    >
      {status}
    </Tag>
  );

  const renderActions = (user) => (
    <Stack spacing={8}>
      <Button appearance="ghost" size="xs" onClick={() => openEditModal(user)}>
        <FaEdit style={{ marginRight: 4 }} />
        Edit
      </Button>
      <Button appearance="ghost" size="xs" color="red" onClick={() => handleRemove(user)}>
        <FaTrash style={{ marginRight: 4 }} />
        Remove
      </Button>
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
            User Permissions
          </div>
          <Button appearance="primary" size="sm" onClick={openAddModal}>
            <FaPlus style={{ marginRight: 8 }} />
            Add User
          </Button>
        </Stack>

        <div style={{ padding: '0 16px 16px' }}>
          <Table
            data={users}
            autoHeight
            style={{ background: 'transparent' }}
            rowHeight={60}
          >
            <Table.Column flexGrow={1}>
              <Table.HeaderCell>User</Table.HeaderCell>
              <Table.Cell>{renderUser}</Table.Cell>
            </Table.Column>

            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.Cell dataKey="role">
                { (rowData) => {
                  return renderRole(rowData.role)
                }}
              </Table.Cell>
            </Table.Column>

            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Permissions</Table.HeaderCell>
              <Table.Cell dataKey="permissions" />
            </Table.Column>

            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.Cell dataKey="status">
                { (rowData) => {
                  return renderStatus(rowData.status)
                }}
              </Table.Cell>
            </Table.Column>

            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.Cell>
                { (rowData) => {
                  return renderActions(rowData)
                }}
              </Table.Cell>
            </Table.Column>
          </Table>
        </div>
      </Panel>

      <Modal open={showModal} onClose={() => setShowModal(false)} size="xs">
        <Modal.Header>
          <Modal.Title>{editingUser ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            model={userModel}
            formValue={formValue}
            onChange={setFormValue}
            onCheck={setFormError}
            checkTrigger="change"
            error={formError}
          >
            <Form.Group controlId="name">
              <Form.ControlLabel>Name</Form.ControlLabel>
              <Form.Control name="name" />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control name="email" />
            </Form.Group>
            <Form.Group controlId="role">
              <Form.ControlLabel>Role</Form.ControlLabel>
              <Form.Control name="role" accepter={SelectPicker} block data={[{label:'Admin', value:'Admin'},{label:'Viewer', value:'Viewer'}]} />
            </Form.Group>
            <Form.Group controlId="permissions">
              <Form.ControlLabel>Permissions</Form.ControlLabel>
              <Form.Control name="permissions" accepter={SelectPicker} block data={[{label:'Full Access', value:'Full Access'},{label:'Read Only', value:'Read Only'}]} />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.ControlLabel>Status</Form.ControlLabel>
              <Form.Control name="status" accepter={SelectPicker} block data={[{label:'Active', value:'Active'},{label:'Inactive', value:'Inactive'}]} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} appearance="primary">{editingUser ? 'Save' : 'Add'}</Button>
          <Button onClick={() => setShowModal(false)} appearance="subtle">Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserPermissions; 