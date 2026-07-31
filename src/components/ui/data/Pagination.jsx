import React from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../forms/Button';

/**
 * Pagination component - Navigation control for paging records.
 */
const Pagination = React.memo(({
  currentPage = 1,
  totalItems = 0,
  pageSize = 10,
  onPageChange = () => {},
  className = '',
  ...props
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  const startRange = (currentPage - 1) * pageSize + 1;
  const endRange = Math.min(currentPage * pageSize, totalItems);

  return (
    <div
      className={`px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 w-full select-none ${className}`}
      {...props}
    >
      {/* Range text */}
      <span className="text-xs text-neutral-500 font-medium">
        Showing <span className="font-semibold text-neutral-800">{startRange}</span> to{' '}
        <span className="font-semibold text-neutral-800">{endRange}</span> of{' '}
        <span className="font-semibold text-neutral-800">{totalItems}</span> entries
      </span>

      {/* Control Buttons */}
      <div className="flex items-center gap-1">
        {/* Previous Button */}
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="h-8 w-8 !p-0"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* Dynamic page numbers */}
        {Array.from({ length: totalPages }).map((_, idx) => {
          const pageNumber = idx + 1;
          const isActive = pageNumber === currentPage;
          
          return (
            <Button
              key={pageNumber}
              variant={isActive ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => onPageChange(pageNumber)}
              className={`h-8 w-8 !p-0 ${
                isActive ? '' : 'text-neutral-600 border-transparent hover:border-neutral-300'
              }`}
            >
              {pageNumber}
            </Button>
          );
        })}

        {/* Next Button */}
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="h-8 w-8 !p-0"
          aria-label="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
});

Pagination.displayName = 'Pagination';

Pagination.propTypes = {
  /** Selected page index */
  currentPage: PropTypes.number.isRequired,
  /** Total count of database items */
  totalItems: PropTypes.number.isRequired,
  /** Number of items displayed per page */
  pageSize: PropTypes.number,
  /** Callback fired when page selections change */
  onPageChange: PropTypes.func.isRequired,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default Pagination;
