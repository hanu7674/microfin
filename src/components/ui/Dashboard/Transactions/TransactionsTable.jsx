import React from 'react';
import { 
  Panel, 
  Table, 
  Tag, 
  Stack, 
  Pagination,
  IconButton,
  Tooltip,
  Dropdown,
  Button
} from 'rsuite';
import { FaDownload, FaTh, FaEdit, FaTrash, FaEllipsisV } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const TransactionsTable = ({ 
  transactions = [], 
  title = "Recent Transactions",
  onEdit,
  onDelete,
  onDownload,
  onViewChange,
  currentPage = 1,
  totalItems = 0,
  itemsPerPage = 5,
  onPageChange
}) => {
  const { theme } = useTheme();
  const { cardBg, textMain, borderColor, shadow, muted } = getThemeVars(theme);

  const getCategoryColor = (category) => {
    const colors = {
      'Income': '#10b981',
      'Food & Dining': '#f59e0b',
      'Transportation': '#3b82f6',
      'Entertainment': '#8b5cf6',
      'Shopping': '#ec4899',
      'Utilities': '#06b6d4'
    };
    return colors[category] || '#6b7280';
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <Panel
      style={{
        background: cardBg,
        border: `1px solid ${borderColor}`,
        boxShadow: shadow,
        borderRadius: 8,
        margin: '1%'
      }}
    >
      <Stack justifyContent="space-between" alignItems="center" style={{ marginBottom: 24 }}>
        <h3 style={{ 
          fontSize: 20, 
          fontWeight: 600, 
          margin: 0, 
          color: textMain 
        }}>
          {title}
        </h3>
        <Stack spacing={8}>
          <Tooltip title="Download">
            <IconButton 
              icon={<FaDownload />} 
              size="sm" 
              appearance="subtle"
              style={{ color: muted }}
              onClick={onDownload}
            />
          </Tooltip>
          <Tooltip title="Change view">
            <IconButton 
              icon={<FaTh />} 
              size="sm" 
              appearance="subtle"
              style={{ color: muted }}
              onClick={onViewChange}
            />
          </Tooltip>
        </Stack>
      </Stack>

      <div style={{ 
        minHeight: '300px',
        overflowX: 'auto',
        width: '100%'
      }}>
        <Table
          data={transactions}
          autoHeight
          hover
          bordered
          style={{ 
            background: cardBg,
            color: textMain,
            minWidth: '800px'
          }}
          headerHeight={50}
          rowHeight={60}
        >
          <Table.Column flexGrow={1} fixed>
            <Table.HeaderCell style={{ color: textMain, fontWeight: 600 }}>Date</Table.HeaderCell>
            <Table.Cell dataKey="date" style={{ color: textMain }} />
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell style={{ color: textMain, fontWeight: 600 }}>Description</Table.HeaderCell>
            <Table.Cell dataKey="description" style={{ color: textMain, fontWeight: 500 }} />
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell style={{ color: textMain, fontWeight: 600 }}>Category</Table.HeaderCell>
            <Table.Cell>
              {(rowData) => (
                <Tag color="blue" style={{ backgroundColor: getCategoryColor(rowData.category) + '20', color: getCategoryColor(rowData.category) }}>
                  {rowData.category}
                </Tag>
              )}
            </Table.Cell>
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell style={{ color: textMain, fontWeight: 600 }}>Account</Table.HeaderCell>
            <Table.Cell dataKey="account" style={{ color: muted }} />
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell style={{ color: textMain, fontWeight: 600 }}>Amount</Table.HeaderCell>
            <Table.Cell>
              {(rowData) => (
                <span style={{ 
                  color: rowData.type === 'income' ? '#10b981' : '#ef4444',
                  fontWeight: 600 
                }}>
                  {rowData.amount}
                </span>
              )}
            </Table.Cell>
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell style={{ color: textMain, fontWeight: 600 }}>Actions</Table.HeaderCell>
            <Table.Cell>
              {(rowData) => (
                <>
                <IconButton appearance="subtle" circle icon={<FaEdit />} onClick={() => onEdit && onEdit(rowData)} style={{ color: muted }} />
                <IconButton appearance="subtle" circle icon={<FaTrash />} onClick={() => onDelete && onDelete(rowData)} style={{ color: muted }} />
                </>
                
              )}
            </Table.Cell>
          </Table.Column>
        </Table>
      </div>

      {/* Pagination */}
      <Stack justifyContent="space-between" alignItems="center" style={{ marginTop: 24 }}>
        <span style={{ color: muted, fontSize: 14 }}>
          Showing {startItem} to {endItem} of {totalItems} transactions
        </span>
        <Pagination
          total={totalItems}
          limit={itemsPerPage}
          activePage={currentPage}
          size="md"
          onChange={onPageChange}
        />
      </Stack>
    </Panel>
  );
};

export default TransactionsTable; 