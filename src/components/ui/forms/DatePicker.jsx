import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Calendar } from 'lucide-react';

/**
 * DatePicker component - UI-only input wrapper styling native date selectors.
 */
const DatePicker = React.memo(forwardRef(({
  label = '',
  helperText = '',
  error = '',
  disabled = false,
  required = false,
  className = '',
  id,
  ...props
}, ref) => {
  const dateId = id || `date-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;

  const borderClass = hasError
    ? 'border-danger-500 focus:border-danger-500 focus:shadow-[0_0_0_3px_rgba(244,63,94,0.15)]'
    : 'border-neutral-200 focus:border-primary-400 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]';

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {/* Label block */}
      {label && (
        <label
          htmlFor={dateId}
          className="text-xs font-semibold text-neutral-600 flex items-center gap-0.5 select-none"
        >
          {label}
          {required && <span className="text-danger-500" aria-hidden="true">*</span>}
        </label>
      )}

      {/* Input container */}
      <div className="relative w-full">
        {/* Calendar Icon on Left */}
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-400 pointer-events-none">
          <Calendar className="w-4 h-4" />
        </span>

        <input
          ref={ref}
          id={dateId}
          type="date"
          disabled={disabled}
          required={required}
          className={`crm-input w-full pl-9 pr-3 transition-all cursor-pointer ${borderClass} ${
            disabled ? 'bg-neutral-50 text-neutral-400 cursor-not-allowed' : 'text-neutral-800'
          }`}
          {...props}
        />
      </div>

      {/* Error or helper message block */}
      {hasError ? (
        <span className="text-xs text-danger-600 font-semibold" id={`${dateId}-error`}>
          {error}
        </span>
      ) : helperText ? (
        <span className="text-xs text-neutral-400" id={`${dateId}-helper`}>
          {helperText}
        </span>
      ) : null}
    </div>
  );
}));

DatePicker.displayName = 'DatePicker';

DatePicker.propTypes = {
  /** Date input label header */
  label: PropTypes.string,
  /** Help descriptors text */
  helperText: PropTypes.string,
  /** Error details (toggles danger style border) */
  error: PropTypes.string,
  /** Disabled attribute */
  disabled: PropTypes.bool,
  /** Required validation attribute */
  required: PropTypes.bool,
  /** Unique element ID */
  id: PropTypes.string,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default DatePicker;
