import React from 'react';
import PropTypes from 'prop-types';
import { ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import EmptyState from '../data-display/EmptyState';
import LoadingSpinner from '../feedback/LoadingSpinner';

/**
 * DataTable component - Structured grids for rendering list items.
 */
const DataTable = React.memo(({
  columns = [],
  data = [],
  loading = false,
  emptyTitle = 'No data available',
  emptyDescription = 'There are no active records matching the query.',
  sortColumn = '',
  sortDirection = 'asc',
  onSort = null,
  renderRowActions = null,
  onRowClick = null,
  className = '',
  ...props
}) => {
  const handleSortClick = (key, sortable) => {
    if (!sortable || !onSort) return;
    onSort(key);
  };

  const hasData = data.length > 0;

  return (
    <div className={`crm-table-container relative ${className}`} {...props}>
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center z-20">
          <div className="flex flex-col items-center gap-3">
            <LoadingSpinner size="md" />
            <span className="text-xs font-semibold text-neutral-500">Loading table contents...</span>
          </div>
        </div>
      )}

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto crm-scrollbar max-h-[500px]">
        <table className="w-full text-left border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 sticky top-0 z-10 select-none">
              {columns.map((col) => {
                const isSorted = sortColumn === col.key;
                
                return (
                  <th
                    key={col.key}
                    onClick={() => handleSortClick(col.key, col.sortable)}
                    className={`px-6 py-3 text-xs font-semibold text-neutral-600 uppercase tracking-wider ${
                      col.sortable && onSort ? 'cursor-pointer hover:bg-neutral-100 hover:text-neutral-900 transition-colors' : ''
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.label}</span>
                      {col.sortable && onSort && (
                        <span className="text-neutral-400">
                          {isSorted ? (
                            sortDirection === 'asc' ? (
                              <ChevronUp className="w-3.5 h-3.5 text-primary-600" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-primary-600" />
                            )
                          ) : (
                            <ArrowUpDown className="w-3.5 h-3.5 hover:text-neutral-600" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
              
              {/* Row Actions Header Header */}
              {renderRowActions && (
                <th className="px-6 py-3 text-xs font-semibold text-neutral-600 uppercase tracking-wider text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-neutral-200 bg-white">
            {hasData ? (
              data.map((row, rowIdx) => {
                const key = row.id || rowIdx;
                
                return (
                  <tr
                    key={key}
                    onClick={() => onRowClick && onRowClick(row)}
                    className={`transition-colors duration-150 ${
                      onRowClick ? 'cursor-pointer hover:bg-neutral-50/70' : 'hover:bg-neutral-50/30'
                    }`}
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="px-6 py-4 whitespace-nowrap text-xs text-neutral-700 font-medium">
                        {col.render ? col.render(row[col.key], row) : row[col.key] || '—'}
                      </td>
                    ))}

                    {/* Actions Cell */}
                    {renderRowActions && (
                      <td
                        className="px-6 py-4 whitespace-nowrap text-right text-xs"
                        onClick={(e) => e.stopPropagation()} // Stop clicking actions cell from triggering row clicks
                      >
                        <div className="flex items-center justify-end gap-1">
                          {renderRowActions(row)}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              // Empty State inside Table Body
              !loading && (
                <tr>
                  <td colSpan={columns.length + (renderRowActions ? 1 : 0)} className="px-6 py-12">
                    <EmptyState
                      title={emptyTitle}
                      description={emptyDescription}
                      className="border-0 bg-transparent py-4"
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

DataTable.displayName = 'DataTable';

DataTable.propTypes = {
  /** Array of column structures */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      render: PropTypes.func,
    })
  ).isRequired,
  /** List of rows data objects */
  data: PropTypes.array.isRequired,
  /** Toggles background opacity and spinner loader overlay */
  loading: PropTypes.bool,
  /** Header text displayed when database rows are empty */
  emptyTitle: PropTypes.string,
  /** Details text displayed when database rows are empty */
  emptyDescription: PropTypes.string,
  /** Key of column currently sorted by */
  sortColumn: PropTypes.string,
  /** Active sort direction vector */
  sortDirection: PropTypes.oneOf(['asc', 'desc']),
  /** Callback triggered when column headers are clicked to sort */
  onSort: PropTypes.func,
  /** Render function representing items displayed in the right action cell */
  renderRowActions: PropTypes.func,
  /** Click trigger for clicking whole rows */
  onRowClick: PropTypes.func,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default DataTable;
