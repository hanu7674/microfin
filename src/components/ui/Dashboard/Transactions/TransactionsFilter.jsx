import React from 'react';
import { Panel, Input, SelectPicker, DatePicker, Button, Stack } from 'rsuite';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const TransactionsFilter = ({ 
  searchTerm, 
  onSearchChange, 
  selectedType, 
  onTypeChange, 
  selectedCategory, 
  onCategoryChange, 
  selectedDate, 
  onDateChange,
  onMoreFilter 
}) => {
  const { theme } = useTheme();
  const { cardBg, textMain, borderColor, shadow, muted } = getThemeVars(theme);

  const typeOptions = [
    { label: 'All Types', value: 'All Types' },
    { label: 'Income', value: 'Income' },
    { label: 'Expense', value: 'Expense' }
  ];

  const categoryOptions = [
    { label: 'All Categories', value: 'All Categories' },
    { label: 'Income', value: 'Income' },
    { label: 'Food & Dining', value: 'Food & Dining' },
    { label: 'Transportation', value: 'Transportation' },
    { label: 'Entertainment', value: 'Entertainment' },
    { label: 'Shopping', value: 'Shopping' },
    { label: 'Utilities', value: 'Utilities' }
  ];

  return (
    <Panel 
      style={{ 
        background: cardBg, 
        border: `1px solid ${borderColor}`,
        boxShadow: shadow,
        borderRadius: 8,
        marginBottom: 24,
        margin: '1%'
      }}
      
    >
      <Stack spacing={16} alignItems="center" wrap>
        <div style={{ flex: 2, minWidth: "100%" }}>
          <Input
            placeholder="Search transactions..."
            prefix={<FaSearch style={{ color: muted }} />}
            value={searchTerm}
            onChange={onSearchChange}
            style={{ background: cardBg, color: textMain }}
          />
        </div>
        <SelectPicker
          data={typeOptions}
          value={selectedType}
          onChange={onTypeChange}
          style={{ minWidth: "25%" }}
          appearance="default"
          placeholder="All Types"
        />
        <SelectPicker
          data={categoryOptions}
          value={selectedCategory}
          onChange={onCategoryChange}
          style={{ minWidth: "25%" }}
          appearance="default"
          placeholder="All Categories"
        />
        <DatePicker
          value={selectedDate}
          onChange={onDateChange}
          format="MM/dd/yyyy"
          placeholder="Select date"
          style={{ minWidth: "25%" }}
          appearance="subtle"
        />
        <Button 
          appearance="ghost"
          icon={<FaFilter />}
          onClick={onMoreFilter}
        >
          More Filters
        </Button>
      </Stack>
    </Panel>
  );
};

export default TransactionsFilter; 