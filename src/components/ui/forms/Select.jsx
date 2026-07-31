import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from 'lucide-react';

/**
 * Select component - Custom dropdown choice selection element.
 */
const Select = React.memo(forwardRef(({
  label = '',
  helperText = '',
  error = '',
  disabled = false,
  required = false,
  options = [],
  placeholder = 'Select an option',
  className = '',
  id,
  ...props
}, ref) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;

  const borderClass = hasError
    ? 'border-danger-500 focus:border-danger-500 focus:shadow-[0_0_0_3px_rgba(244,63,94,0.15)]'
    : 'border-neutral-200 focus:border-primary-400 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]';

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {/* Label block */}
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-semibold text-neutral-600 flex items-center gap-0.5 select-none"
        >
          {label}
          {required && <span className="text-danger-500" aria-hidden="true">*</span>}
        </label>
      )}

      {/* Select input wrapper */}
      <div className="relative w-full">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          required={required}
          className={`crm-input w-full pr-10 appearance-none transition-all ${borderClass} ${
            disabled ? 'bg-neutral-50 text-neutral-400 cursor-not-allowed' : 'text-neutral-800'
          }`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt, idx) => {
            const isObject = typeof opt === 'object' && opt !== null;
            const optVal = isObject ? opt.value : opt;
            const optLabel = isObject ? opt.label : opt;
            return (
              <option key={idx} value={optVal}>
                {optLabel}
              </option>
            );
          })}
        </select>

        {/* Custom Chevron Indicator */}
        <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 pointer-events-none">
          <ChevronDown className="w-4 h-4" />
        </span>
      </div>

      {/* Error or helper message block */}
      {hasError ? (
        <span className="text-xs text-danger-600 font-semibold" id={`${selectId}-error`}>
          {error}
        </span>
      ) : helperText ? (
        <span className="text-xs text-neutral-400" id={`${selectId}-helper`}>
          {helperText}
        </span>
      ) : null}
    </div>
  );
}));

Select.displayName = 'Select';

Select.propTypes = {
  /** Dropdown select label header */
  label: PropTypes.string,
  /** Help descriptors text */
  helperText: PropTypes.string,
  /** Error details (toggles danger style) */
  error: PropTypes.string,
  /** Disabled attribute */
  disabled: PropTypes.bool,
  /** Required attribute */
  required: PropTypes.bool,
  /** List of choices to display. Supports strings or objects of { label, value } */
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
      }),
    ])
  ).isRequired,
  /** Default fallback option text label */
  placeholder: PropTypes.string,
  /** Unique element ID */
  id: PropTypes.string,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default Select;
