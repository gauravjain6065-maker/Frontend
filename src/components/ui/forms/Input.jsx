import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Input component - Text field wrapper with focus styling, error states, and icon placements.
 */
const Input = React.memo(forwardRef(({
  label = '',
  helperText = '',
  error = '',
  disabled = false,
  required = false,
  leadingIcon: LeadingIcon = null,
  trailingIcon: TrailingIcon = null,
  type = 'text',
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;

  const borderClass = hasError
    ? 'border-danger-500 focus:border-danger-500 focus:shadow-[0_0_0_3px_rgba(244,63,94,0.15)]'
    : 'border-neutral-200 focus:border-primary-400 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]';

  const paddingLeft = LeadingIcon ? 'pl-9' : 'pl-3';
  const paddingRight = TrailingIcon ? 'pr-9' : 'pr-3';

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {/* Label block */}
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-neutral-600 flex items-center gap-0.5 select-none"
        >
          {label}
          {required && <span className="text-danger-500" aria-hidden="true">*</span>}
        </label>
      )}

      {/* Input container */}
      <div className="relative w-full">
        {/* Leading Adornment Icon */}
        {LeadingIcon && (
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-400 pointer-events-none">
            <LeadingIcon className="w-4 h-4" />
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          disabled={disabled}
          required={required}
          className={`crm-input w-full ${paddingLeft} ${paddingRight} ${borderClass} transition-all`}
          {...props}
        />

        {/* Trailing Adornment Icon */}
        {TrailingIcon && (
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 pointer-events-none">
            <TrailingIcon className="w-4 h-4" />
          </span>
        )}
      </div>

      {/* Error or helper message block */}
      {hasError ? (
        <span className="text-xs text-danger-600 font-semibold" id={`${inputId}-error`}>
          {error}
        </span>
      ) : helperText ? (
        <span className="text-xs text-neutral-400" id={`${inputId}-helper`}>
          {helperText}
        </span>
      ) : null}
    </div>
  );
}));

Input.displayName = 'Input';

Input.propTypes = {
  /** Form input label header */
  label: PropTypes.string,
  /** Help descriptors text */
  helperText: PropTypes.string,
  /** Error message details (toggles danger style) */
  error: PropTypes.string,
  /** Disabled state */
  disabled: PropTypes.bool,
  /** Required attribute */
  required: PropTypes.bool,
  /** Lucide icon aligned to the left of the input text */
  leadingIcon: PropTypes.elementType,
  /** Lucide icon aligned to the right of the input text */
  trailingIcon: PropTypes.elementType,
  /** HTML input type value */
  type: PropTypes.string,
  /** Unique element ID */
  id: PropTypes.string,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default Input;
