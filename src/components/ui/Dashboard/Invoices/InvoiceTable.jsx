import React, { useState } from 'react';
import { Table, Tag, Button, Tooltip, Whisper, IconButton, Loader, Stack } from 'rsuite';
import { 
  FaEye, 
  FaEdit, 
  FaDownload, 
  FaPaperPlane, 
  FaBell,
  FaUser
} from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const { Column, HeaderCell, Cell } = Table;

const InvoiceTable = ({ 
  data = [], 
  loading = false, 
  error = null,
  selectedInvoices = [],
  onSelectInvoice,
  onSelectAll,
  onView, 
  onEdit, 
  onDownload, 
  onSend, 
  onRemind 
}) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, cardBorderBottomColor } = getThemeVars(theme);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'green';
      case 'Pending': return 'orange';
      case 'Overdue': return 'red';
      case 'Draft': return 'default';
      default: return 'default';
    }
  };

  const formatAmount = (amount) => {
    return `₹${(amount || 0).toLocaleString()}`;
  };

  const formatDate = (date) => {
    if (!date) return '';
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderActions = (invoice) => (
    <Stack spacing={8}>
      <Whisper
        placement="top"
        trigger="hover"
        speaker={<Tooltip>View Invoice</Tooltip>}
      >
        <IconButton 
          icon={<FaEye />} 
          appearance="subtle" 
          circle 
          onClick={() => onView(invoice)}
        />
      </Whisper>
      <Whisper
        placement="top"
        trigger="hover"
        speaker={<Tooltip>Edit Invoice</Tooltip>}
      >
        <IconButton 
          icon={<FaEdit />} 
          appearance="subtle" 
          circle 
          onClick={() => onEdit(invoice)}
        />
      </Whisper>
      <Whisper
        placement="top"
        trigger="hover"
        speaker={<Tooltip>Download PDF</Tooltip>}
      >
        <IconButton 
          icon={<FaDownload />} 
          appearance="subtle" 
          circle 
          onClick={() => onDownload(invoice)}
        />
      </Whisper>
      <Whisper
        placement="top"
        trigger="hover"
        speaker={<Tooltip>Send Invoice</Tooltip>}
      >
        <IconButton 
          icon={<FaPaperPlane />} 
          appearance="subtle" 
          circle 
          onClick={() => onSend(invoice)}
        />
      </Whisper>
      <Whisper
        placement="top"
        trigger="hover"
        speaker={<Tooltip>Send Reminder</Tooltip>}
      >
        <IconButton 
          icon={<FaBell />} 
          appearance="subtle" 
          circle 
          onClick={() => onRemind(invoice)}
        />
      </Whisper>
    </Stack>
  );

  if (loading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px 20px',
        background: cardBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 8,
        boxShadow: shadow
      }}>
        <Loader size="md" content="Loading invoices..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px 20px',
        background: cardBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 8,
        boxShadow: shadow,
        color: '#ef4444'
      }}>
        <h4>Error loading invoices</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{
        background: cardBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 8,
        boxShadow: shadow
      }}>
        <div style={{
          fontSize: 18,
          fontWeight: 600,
          margin: 0,
          marginBottom: 24,
          color: cardText,
          padding: '10px 16px',
          borderBottom: `3px solid ${cardBorderBottomColor}`,
          borderBottomWidth: 1
        }}>
          Invoice List
        </div>

        <div style={{ padding: '0 16px 16px' }}>
          {data && data.length > 0 ? (
            <Table
              data={data}
              autoHeight
              style={{ background: 'transparent' }}
              rowHeight={60}
            >
              <Column flexGrow={1}>
                <HeaderCell>Invoice ID</HeaderCell>
                <Cell dataKey="id" />
              </Column>

              <Column flexGrow={1}>
                <HeaderCell>Date</HeaderCell>
                <Cell>
                  {(rowData) => formatDate(rowData.date)}
                </Cell>
              </Column>

              <Column flexGrow={1}>
                <HeaderCell>Client</HeaderCell>
                <Cell>
                  {(rowData) => (
                    <div>
                      <div style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: cardText
                      }}>
                        {rowData.client}
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

              <Column flexGrow={1}>
                <HeaderCell>Amount</HeaderCell>
                <Cell>
                  {(rowData) => formatAmount(rowData.amount)}
                </Cell>
              </Column>

              <Column flexGrow={1}>
                <HeaderCell>Status</HeaderCell>
                <Cell>
                  {(rowData) => (
                    <Tag color={getStatusColor(rowData.status)}>
                      {rowData.status}
                    </Tag>
                  )}
                </Cell>
              </Column>

              <Column flexGrow={1}>
                <HeaderCell>Due Date</HeaderCell>
                <Cell>
                  {(rowData) => formatDate(rowData.dueDate)}
                </Cell>
              </Column>

              <Column flexGrow={1}>
                <HeaderCell>Actions</HeaderCell>
                <Cell>
                  {(rowData) => renderActions(rowData)}
                </Cell>
              </Column>
            </Table>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px 20px',
              color: cardText,
              opacity: 0.7
            }}>
              No invoices found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable; 