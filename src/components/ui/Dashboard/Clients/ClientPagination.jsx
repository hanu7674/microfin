import React from 'react';
import { Pagination } from 'rsuite';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const ClientPagination = ({ currentPage, totalPages, totalResults, pageSize, onPageChange }) => {
  const { theme } = useTheme();
  const { cardText } = getThemeVars(theme);

  const startResult = (currentPage - 1) * pageSize + 1;
  const endResult = Math.min(currentPage * pageSize, totalResults);

  return (
    <div style={{ marginBottom: 32 }}>
      <div
         
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16
        }}>
          <div style={{
            fontSize: 14,
            color: cardText,
            opacity: 0.8
          }}>
            Showing {startResult} to {endResult} of {totalResults} results
          </div>
          
          <Pagination
            activePage={currentPage}
            total={totalPages}
            onChange={onPageChange}
            size="md"
            prev
            next
            first
            last
            style={{
              color: cardText
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientPagination; 