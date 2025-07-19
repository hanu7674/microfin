import React from 'react';
import { Pagination, Button } from 'rsuite';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';

const InvoicePagination = ({ 
  currentPage = 1, 
  totalPages = 3, 
  totalResults = 247, 
  pageSize = 10,
  onPageChange 
}) => {
  const { theme } = useTheme();
  const { cardBg, cardText, borderColor, shadow, muted, ctaBg } = getThemeVars(theme);

  const startResult = (currentPage - 1) * pageSize + 1;
  const endResult = Math.min(currentPage * pageSize, totalResults);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 0',
      borderTop: `1px solid ${borderColor}`,
      marginTop: 16
    }}>
      {/* Results Info */}
      <div style={{
        fontSize: 14,
        color: muted
      }}>
        Showing {startResult} to {endResult} of {totalResults} results
      </div>

      {/* Pagination Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}>
        <Button
          appearance="ghost"
          size="sm"
          disabled={currentPage === 1}
          style={{
            border: `1px solid ${borderColor}`,
            borderRadius: 6,
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <FaChevronLeft />
          Previous
        </Button>

        {/* Page Numbers */}
        <div style={{ display: 'flex', gap: 4 }}>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <Button
              key={page}
              appearance={page === currentPage ? "primary" : "ghost"}
              size="sm"
              style={{
                minWidth: '32px',
                height: '32px',
                padding: '0',
                borderRadius: '4px',
                backgroundColor: page === currentPage ? ctaBg : 'transparent',
                border: page === currentPage ? 'none' : `1px solid ${borderColor}`,
                color: page === currentPage ? 'white' : cardText,
                fontWeight: page === currentPage ? 600 : 400
              }}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          appearance="ghost"
          size="sm"
          disabled={currentPage === totalPages}
          style={{
            border: `1px solid ${borderColor}`,
            borderRadius: 6,
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
          <FaChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default InvoicePagination; 