import React from 'react';
import { Input, InputNumber, Button, Table } from 'rsuite';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useTheme } from '../../../../Theme/theme';
import { getThemeVars } from '../../../../Theme/themeVars';

const { Column, HeaderCell, Cell } = Table;

const InvoiceItems = ({ items, onAddItem, onRemoveItem, onUpdateItem }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, ctaBg, cardBorderBottomColor } = getThemeVars(theme);

  const calculateAmount = (qty, rate) => {
    return (qty || 0) * (rate || 0);
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: 8,
          padding: '24px'
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          fontSize: 18, 
        color: cardText,
        borderBottom: `3px solid ${cardBorderBottomColor}`,
        borderBottomWidth: 1
        }}>
          <h3 style={{
            fontSize: 18,
            fontWeight: 600,
            margin: 0,
            color: cardText
          }}>
            Items
          </h3>
          <Button
            appearance="ghost"
            size="sm"
            style={{
              border: `1px solid ${borderColor}`,
              borderRadius: 6,
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
            onClick={onAddItem}
          >
            <FaPlus />
            Add Item
          </Button>
        </div>
            <div style={{margin: '2%'}}></div> 
        <Table
          data={items}
          autoHeight
          rowHeight={70}
          style={{
            background: 'transparent',
            color: cardText
          }}
        >
          <Column flexGrow={2}>
            <HeaderCell style={{ color: cardText, fontWeight: 600 }}>Description</HeaderCell>
            <Cell>
              {(rowData, rowIndex) => (
                <Input
                  value={rowData.description || ''}
                  onChange={(value) => onUpdateItem(rowIndex, 'description', value)}
                  placeholder="Item description"
                  style={{ width: '100%' }}
                />
              )}
            </Cell>
          </Column>

          <Column flexGrow={1}>
            <HeaderCell style={{ color: cardText, fontWeight: 600 }}>Qty</HeaderCell>
            <Cell>
              {(rowData, rowIndex) => (
                <InputNumber
                  value={rowData.qty || 1}
                  onChange={(value) => onUpdateItem(rowIndex, 'qty', value)}
                  min={0}
                  style={{ width: '100%' }}
                />
              )}
            </Cell>
          </Column>

          <Column flexGrow={1}>
            <HeaderCell style={{ color: cardText, fontWeight: 600 }}>Rate</HeaderCell>
            <Cell>
              {(rowData, rowIndex) => (
                <InputNumber
                  value={rowData.rate || 0}
                  onChange={(value) => onUpdateItem(rowIndex, 'rate', value)}
                  min={0}
                  step={0.01}
                  style={{ width: '100%' }}
                />
              )}
            </Cell>
          </Column>

          <Column flexGrow={1}>
            <HeaderCell style={{ color: cardText, fontWeight: 600 }}>Amount</HeaderCell>
            <Cell>
              {(rowData) => (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontWeight: 600, color: cardText }}>
                    ₹{calculateAmount(rowData.qty, rowData.rate).toFixed(2)}
                  </span>
                </div>
              )}
            </Cell>
          </Column>

          <Column flexGrow={0.5}>
            <HeaderCell style={{ color: cardText, fontWeight: 600 }}></HeaderCell>
            <Cell>
              {(rowData, rowIndex) => (
                <Button
                  appearance="ghost"
                  size="xs"
                  style={{
                    color: '#f44336',
                    padding: '4px 8px',
                    minWidth: 'auto'
                  }}
                  onClick={() => onRemoveItem(rowIndex)}
                >
                  <FaTrash />
                </Button>
              )}
            </Cell>
          </Column>
        </Table>
      </div>
    </div>
  );
};

export default InvoiceItems; 