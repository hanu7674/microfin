import React, { useState } from 'react';
import { Input, SelectPicker, Button } from 'rsuite';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const InvoiceSearchFilter = ({ onSearch, onFilterChange }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted } = getThemeVars(theme);

  const [searchTerm, setSearchTerm] = useState('');

  // Filter options
  const statusOptions = [
    { label: 'All Status', value: 'all' },
    { label: 'Paid', value: 'paid' },
    { label: 'Pending', value: 'pending' },
    { label: 'Overdue', value: 'overdue' }
  ];

  const dateOptions = [
    { label: 'Last 30 Days', value: '30' },
    { label: 'Last 60 Days', value: '60' },
    { label: 'Last 90 Days', value: '90' },
    { label: 'This Year', value: 'year' }
  ];

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleStatusChange = (value) => {
    onFilterChange('status', value);
  };

  const handleDateChange = (value) => {
    onFilterChange('date', value);
  };

  return (
    <div
      style={{
        background: cardBg,
        color: cardText,
        border: `1px solid ${borderColor}`,
        boxShadow: shadow,
        borderRadius: 8,
        padding: '16px',
        marginBottom: 24
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16
      }}>
        {/* Search Input */}
        <div style={{ flex: 1, maxWidth: '400px' }}>
          <Input
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ width: '100%' }}
            prefix={<FaSearch style={{ color: muted }} />}
          />
        </div>

        {/* Filter Dropdowns */}
        <div style={{ display: 'flex', gap: 12 }}>
          <SelectPicker
            data={statusOptions}
            defaultValue="all"
            onChange={handleStatusChange}
            style={{ width: 140 }}
            placeholder="All Status"
          />
          <SelectPicker
            data={dateOptions}
            defaultValue="30"
            onChange={handleDateChange}
            style={{ width: 140 }}
            placeholder="Last 30 Days"
          />
          <Button
            appearance="ghost"
            size="md"
            style={{
              border: `1px solid ${borderColor}`,
              borderRadius: 6,
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <FaFilter />
            More Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSearchFilter; 