import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Search, X } from 'lucide-react';

/**
 * SearchBar component - Standard search text field with auto-clear capability.
 */
const SearchBar = React.memo(forwardRef(({
  value = '',
  onChange = () => {},
  onClear = null,
  placeholder = 'Search records...',
  disabled = false,
  className = '',
  id,
  ...props
}, ref) => {
  const searchId = id || `search-${Math.random().toString(36).substr(2, 9)}`;

  const handleClear = (e) => {
    e.preventDefault();
    if (onClear) {
      onClear();
    }
  };

  const showClearButton = value && onClear && !disabled;

  return (
    <div className={`relative w-full ${className}`}>
      {/* Search Icon */}
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-400 pointer-events-none">
        <Search className="w-4 h-4" />
      </span>

      <input
        ref={ref}
        id={searchId}
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        aria-label="Search"
        className="crm-input w-full pl-9 pr-9 text-sm"
        {...props}
      />

      {/* Clear Search Button */}
      {showClearButton && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors focus:outline-none"
          aria-label="Clear search query"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}));

SearchBar.displayName = 'SearchBar';

SearchBar.propTypes = {
  /** Controlled input text value */
  value: PropTypes.string,
  /** Controlled input trigger event */
  onChange: PropTypes.func,
  /** Callback fired when the clear 'X' icon is clicked */
  onClear: PropTypes.func,
  /** Field text placeholder description */
  placeholder: PropTypes.string,
  /** Disabled attribute */
  disabled: PropTypes.bool,
  /** Unique element ID */
  id: PropTypes.string,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default SearchBar;
