import React from 'react';
import PropTypes from 'prop-types';
import { X, Filter } from 'lucide-react';
import SearchBar from './SearchBar';
import Badge from '../Badge';
const Stack = ({ children, className = '' }) => <div className={`flex items-center gap-2 ${className}`}>{children}</div>;

/**
 * FilterBar component - Standard CRM filter panel managing search inputs and filter tags.
 */
const FilterBar = React.memo(({
  searchQuery = '',
  onSearchChange = () => {},
  onSearchClear = null,
  placeholder = 'Search...',
  activeFilters = [],
  onRemoveFilter = null,
  onClearFilters = null,
  actions = null,
  className = '',
  ...props
}) => {
  const hasActiveFilters = activeFilters.length > 0;

  return (
    <Stack space={3} className={`w-full ${className}`} {...props}>
      {/* Top row: Search input + Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        <div className="flex-1 w-full">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            onClear={onSearchClear}
            placeholder={placeholder}
          />
        </div>
        
        {actions && (
          <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
            {actions}
          </div>
        )}
      </div>

      {/* Bottom row: Active filter pills (only render when there are active filters) */}
      {hasActiveFilters && (
        <div className="flex items-center flex-wrap gap-2 pt-1">
          <span className="text-xs font-semibold text-neutral-500 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Active Filters:
          </span>
          
          {activeFilters.map((filter, idx) => (
            <Badge
              key={filter.id || idx}
              variant="primary"
              size="sm"
              className="pl-2.5 pr-1.5 py-0.5 flex items-center gap-1.5 select-none"
            >
              <span>{filter.label}</span>
              {onRemoveFilter && (
                <button
                  type="button"
                  onClick={() => onRemoveFilter(filter.id)}
                  className="p-0.5 rounded-full hover:bg-primary-100 hover:text-primary-800 transition-colors focus:outline-none"
                  aria-label={`Remove filter: ${filter.label}`}
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </Badge>
          ))}

          {onClearFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="text-xs text-neutral-500 hover:text-primary-600 font-semibold focus:outline-none focus:underline ml-1"
            >
              Clear All
            </button>
          )}
        </div>
      )}
    </Stack>
  );
});

FilterBar.displayName = 'FilterBar';

FilterBar.propTypes = {
  /** Controlled value for search string */
  searchQuery: PropTypes.string,
  /** Callback fired on search query character updates */
  onSearchChange: PropTypes.func,
  /** Callback fired when search field is cleared */
  onSearchClear: PropTypes.func,
  /** Search input placeholder text */
  placeholder: PropTypes.string,
  /** List of active filter pills to render */
  activeFilters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  /** Callback fired to remove a specific filter badge */
  onRemoveFilter: PropTypes.func,
  /** Callback fired to clear all filter pills */
  onClearFilters: PropTypes.func,
  /** Slots for action buttons, e.g. filter dialog toggle buttons */
  actions: PropTypes.node,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default FilterBar;
