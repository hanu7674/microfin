import React from 'react';
import { Stack, Panel, Button, Table, Tag, Avatar } from 'rsuite';
import { FaUser, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const UserPermissions = () => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, cardBorderBottomColor } = getThemeVars(theme);

  const users = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh@business.com',
      role: 'Admin',
      permissions: 'Full Access',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya@business.com',
      role: 'Viewer',
      permissions: 'Read Only',
      status: 'Inactive'
    }
  ];

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
      <Button appearance="ghost" size="xs">
        <FaEdit style={{ marginRight: 4 }} />
        Edit
      </Button>
      <Button appearance="ghost" size="xs" color="red">
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
          <Button appearance="primary" size="sm">
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
    </div>
  );
};

export default UserPermissions; 