import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Check } from 'lucide-react';

/**
 * Checkbox component - Accessible custom check selection box.
 */
const Checkbox = React.memo(forwardRef(({
  label = '',
  helperText = '',
  error = '',
  disabled = false,
  required = false,
  className = '',
  id,
  ...props
}, ref) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;

  const borderClass = hasError
    ? 'border-danger-500 group-hover:border-danger-600'
    : 'border-neutral-200 group-hover:border-neutral-300 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 peer-focus-visible:ring-offset-2';

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {/* Container Label */}
      <label
        htmlFor={checkboxId}
        className={`group flex items-start gap-3 cursor-pointer ${
          disabled ? 'cursor-not-allowed opacity-60' : ''
        }`}
      >
        {/* Hidden Native Input */}
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          disabled={disabled}
          required={required}
          className="sr-only peer"
          {...props}
        />

        {/* Custom Styled Box */}
        <div
          className={`w-5 h-5 rounded border bg-white flex items-center justify-center flex-shrink-0 transition-all duration-150 peer-checked:bg-primary-600 peer-checked:border-primary-600 text-white ${borderClass}`}
        >
          <Check className="w-3.5 h-3.5 transform scale-0 peer-checked:group-[]:scale-100 transition-transform duration-100" />
        </div>

        {/* Text Stack */}
        {(label || helperText) && (
          <div className="flex flex-col select-none pt-0.5">
            {label && (
              <span className="text-sm font-semibold text-neutral-700 flex items-center gap-0.5">
                {label}
                {required && <span className="text-danger-500" aria-hidden="true">*</span>}
              </span>
            )}
            {helperText && (
              <span className="text-xs text-neutral-400 mt-0.5">
                {helperText}
              </span>
            )}
          </div>
        )}
      </label>

      {/* Error state display */}
      {hasError && (
        <span className="text-xs text-danger-600 font-semibold pl-8">
          {error}
        </span>
      )}
    </div>
  );
}));

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  /** Checkbox description text label */
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

export default Checkbox;
