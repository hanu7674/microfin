import React, { useState } from 'react';
import { Table, Tag, Button, Tooltip, Whisper, IconButton } from 'rsuite';
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
import InvoicePagination from './InvoicePagination';

const { Column, HeaderCell, Cell } = Table;

const InvoiceTable = ({ data = null, onView, onEdit, onDownload, onSend, onRemind }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, cardBorderBottomColor } = getThemeVars(theme);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log('Page changed to:', page);
    // Load invoices for the new page
  };
  // Default invoice data
  const defaultData = [
    {
      id: 'INV-2025-001',
      date: 'Jan 15, 2025',
      client: 'ABC Corp',
      email: 'contact@abc.com',
      amount: '₹25,000',
      status: 'Paid',
      dueDate: 'Jan 30, 2025'
    },
    {
      id: 'INV-2025-002',
      date: 'Jan 12, 2025',
      client: 'XYZ Ltd',
      email: 'info@xyz.com',
      amount: '₹15,750',
      status: 'Pending',
      dueDate: 'Jan 27, 2025'
    },
    {
      id: 'INV-2025-003',
      date: 'Jan 10, 2025',
      client: 'Tech Solutions',
      email: 'hello@tech.com',
      amount: '₹8,500',
      status: 'Overdue',
      dueDate: 'Jan 20, 2025'
    },
    {
      id: 'INV-2025-004',
      date: 'Jan 8, 2025',
      client: 'Global Systems',
      email: 'admin@global.com',
      amount: '₹32,000',
      status: 'Paid',
      dueDate: 'Jan 25, 2025'
    },
    {
      id: 'INV-2025-005',
      date: 'Jan 5, 2025',
      client: 'Innovate Inc',
      email: 'support@innovate.com',
      amount: '₹12,300',
      status: 'Pending',
      dueDate: 'Jan 22, 2025'
    }
  ];

  const invoiceData = data || defaultData;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'green';
      case 'Pending':
        return 'orange';
      case 'Overdue':
        return 'red';
      default:
        return 'default';
    }
  };

  const getActionButtons = (invoice) => {
    const buttonStyle = {
      padding: '4px 8px',
      margin: '0 2px',
      fontSize: 12,
      minWidth: '32px',
      height: '32px'
    };

    switch (invoice?.status) {
      case 'Paid':
        return (
          <div style={{ display: 'flex', gap: 4 }}>
            <Whisper
              placement="top"
              trigger="hover"
              speaker={<Tooltip>View</Tooltip>}
            >
              <IconButton
                size="xs"
                appearance="subtle"
                circle
                style={buttonStyle}
                onClick={() => onView(invoice)}
              >
                <FaEye />
              </IconButton>
            </Whisper>
            <Whisper
              placement="top"
              trigger="hover"
              speaker={<Tooltip>Edit</Tooltip>}
            >
              <IconButton 
                size="xs"
                appearance="subtle"
                circle
                style={buttonStyle}
                onClick={() => onEdit(invoice)}
              >
                <FaEdit />
              </IconButton>
            </Whisper>
            <Whisper
              placement="top"
              trigger="hover"
              speaker={<Tooltip>Download</Tooltip>}
            >
              <IconButton
                size="xs"
                appearance="subtle"
                circle
                style={buttonStyle}
                onClick={() => onDownload(invoice)}
              >
                <FaDownload />
              </IconButton>
            </Whisper>
          </div>
        );
      case 'Pending':
        return (
          <div style={{ display: 'flex', gap: 4 }}>
            <Whisper
              placement="top"
              trigger="hover"
              speaker={<Tooltip>View</Tooltip>}
            >
              <IconButton
                size="xs"
                appearance="subtle"
                circle
                style={buttonStyle}
                onClick={() => onView(invoice)}
              >
                <FaEye />
              </IconButton>
            </Whisper>
            <Whisper
              placement="top"
              trigger="hover"
              speaker={<Tooltip>Edit</Tooltip>}
            >
              <IconButton
                size="xs"
                appearance="subtle"
                circle
                style={buttonStyle}
                onClick={() => onEdit(invoice)}
              >
                <FaEdit />
              </IconButton>
            </Whisper>
            <Whisper
              placement="top"
              trigger="hover"
              speaker={<Tooltip>Send</Tooltip>}
            >
              <IconButton
                size="xs"
                appearance="subtle"
                circle
                style={buttonStyle}
                onClick={() => onSend(invoice)}
              >
                <FaPaperPlane />
              </IconButton>
            </Whisper>
          </div>
        );
      case 'Overdue':
        return (
          <div style={{ display: 'flex', gap: 4 }}>
            <Whisper
              placement="top"
              trigger="hover"
              speaker={<Tooltip>View</Tooltip>}
            >
              <IconButton
                size="xs"
                appearance="subtle"
                circle
                style={buttonStyle}
                onClick={() => onView(invoice)}
              >
                <FaEye />
              </IconButton>
            </Whisper>
            <Whisper
              placement="top"
              trigger="hover"
              speaker={<Tooltip>Edit</Tooltip>}
            >
              <IconButton
                size="xs"
                appearance="subtle"
                circle
                style={buttonStyle}
                onClick={() => onEdit(invoice)}
              >
                <FaEdit />
              </IconButton>
            </Whisper>
            <Whisper
              placement="top"
              trigger="hover"
              speaker={<Tooltip>Remind</Tooltip>}
            >
              <Button
                size="xs"
                appearance="subtle"
                circle
                style={buttonStyle}
                onClick={() => onRemind(invoice)}
              >
                <FaBell />
              </Button>
            </Whisper>
          </div>
        );
      default:
        return <div>No actions</div>;
    }
  };

  return (
    <div
      style={{
        background: cardBg,
        color: cardText,
        border: `1px solid ${borderColor}`,
        boxShadow: shadow,
        padding: '1%',
        borderRadius: 8,
         marginBottom: 24
      }}
    >
      <h3 style={{
        fontSize: 18, 
        fontWeight: 600, 
        margin: 0, 
        padding: '10px 16px',
        marginBottom: 20,
        color: cardText,
        borderBottom: `3px solid ${cardBorderBottomColor}`,
        borderBottomWidth: 1
      }}>
        Recent Invoices
      </h3>

      <Table
        data={invoiceData}
        autoHeight
        rowHeight={70}
        bordered
        style={{
          background: 'transparent',
          color: cardText,
        }}
      >
        <Column flexGrow={1}>
          <HeaderCell style={{ color: cardText, fontWeight: 600 }}>Invoice</HeaderCell>
          <Cell>
            {(rowData) => (
              <div>
                <div style={{ fontWeight: 600, color: cardText }}>
                  #{rowData.id}
                </div>
                <div style={{ fontSize: 12, color: muted }}>
                  {rowData.date}
                </div>
              </div>
            )}
          </Cell>
        </Column>

        <Column flexGrow={2}>
          <HeaderCell style={{ color: cardText, fontWeight: 600 }}>Client</HeaderCell>
          <Cell>
            {(rowData) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: '#e0e0e0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  color: muted
                }}>
                  <FaUser />
                </div>
                <div>
                  <div style={{ fontWeight: 500, color: cardText }}>
                    {rowData.client}
                  </div>
                  <div style={{ fontSize: 12, color: muted }}>
                    {rowData.email}
                  </div>
                </div>
              </div>
            )}
          </Cell>
        </Column>

        <Column flexGrow={1}>
          <HeaderCell style={{ color: cardText, fontWeight: 600 }}>Amount</HeaderCell>
          <Cell>
            {(rowData) => (
              <div style={{ fontWeight: 600, color: cardText }}>
                {rowData.amount}
              </div>
            )}
          </Cell>
        </Column>

        <Column flexGrow={1}>
          <HeaderCell style={{ color: cardText, fontWeight: 600 }}>Status</HeaderCell>
          <Cell>
            {(rowData) => (
              <Tag color={getStatusColor(rowData.status)} size="sm">
                {rowData.status}
              </Tag>
            )}
          </Cell>
        </Column>

        <Column flexGrow={1}>
          <HeaderCell style={{ color: cardText, fontWeight: 600 }}>Due Date</HeaderCell>
          <Cell>
            {(rowData) => (
              <div style={{ color: cardText }}>
                {rowData.dueDate}
              </div>
            )}
          </Cell>
        </Column>

        <Column flexGrow={1}>
          <HeaderCell style={{ color: cardText, fontWeight: 600 }}>Actions</HeaderCell>
          <Cell>
            {(rowData) => getActionButtons(rowData)}
          </Cell>
        </Column>
      </Table>
      <InvoicePagination currentPage={currentPage}
        totalPages={3}
        totalResults={247}
        pageSize={10}
        onPageChange={handlePageChange}/>
    </div>
  );
};

export default InvoiceTable; 