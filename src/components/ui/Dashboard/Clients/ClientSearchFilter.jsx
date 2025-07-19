import React from 'react';
import { Input, SelectPicker, Button } from 'rsuite';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const ClientSearchFilter = ({ searchValue, onSearchChange, statusFilter, onStatusChange, typeFilter, onTypeChange, onMoreFilters }) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow } = getThemeVars(theme);

  const statusOptions = [
    { label: 'All Status', value: '' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Pending', value: 'pending' }
  ];

  const typeOptions = [
    { label: 'All Types', value: '' },
    { label: 'Individual', value: 'individual' },
    { label: 'Business', value: 'business' },
    { label: 'Corporate', value: 'corporate' }
  ];

  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: 8,
          padding: '2%',
          boxShadow: shadow
        }}
      >
        <div style={{
          display: 'flex',
          gap: 16,
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <Input
              value={searchValue}
              onChange={onSearchChange}
              placeholder="Search clients..."
              prefix={<FaSearch style={{ color: cardText, opacity: 0.5 }} />}
              style={{ width: '100%' }}
            />
          </div>
          
          <SelectPicker
            data={statusOptions}
            value={statusFilter}
            onChange={onStatusChange}
            placeholder="All Status"
            style={{ width: '150px' }}
          />
          
          <SelectPicker
            data={typeOptions}
            value={typeFilter}
            onChange={onTypeChange}
            placeholder="All Types"
            style={{ width: '150px' }}
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
            onClick={onMoreFilters}
          >
            <FaFilter />
            More Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientSearchFilter; 