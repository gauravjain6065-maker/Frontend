import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * ToggleSwitch component - iOS-style slider switch toggles.
 */
const ToggleSwitch = React.memo(forwardRef(({
  label = '',
  helperText = '',
  error = '',
  disabled = false,
  required = false,
  className = '',
  id,
  ...props
}, ref) => {
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;

  const outlineClass = hasError
    ? 'ring-2 ring-danger-500 ring-offset-2'
    : 'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 peer-focus-visible:ring-offset-2';

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {/* Container Label */}
      <label
        htmlFor={switchId}
        className={`group flex items-start gap-3 cursor-pointer ${
          disabled ? 'cursor-not-allowed opacity-60' : ''
        }`}
      >
        {/* Hidden Native Input */}
        <input
          ref={ref}
          id={switchId}
          type="checkbox"
          disabled={disabled}
          required={required}
          className="sr-only peer"
          {...props}
        />

        {/* Custom Toggle Track */}
        <div
          className={`w-9 h-5 rounded-full bg-neutral-200 peer-checked:bg-primary-600 p-0.5 flex items-center flex-shrink-0 transition-colors duration-200 ease-in-out relative ${outlineClass}`}
        >
          {/* Knob */}
          <div className="w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out peer-checked:group-[]:translate-x-4" />
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

      {/* Error State */}
      {hasError && (
        <span className="text-xs text-danger-600 font-semibold pl-12">
          {error}
        </span>
      )}
    </div>
  );
}));

ToggleSwitch.displayName = 'ToggleSwitch';

ToggleSwitch.propTypes = {
  /** Toggle switch description text */
  label: PropTypes.string,
  /** Help descriptors text */
  helperText: PropTypes.string,
  /** Error details (toggles danger highlight) */
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

export default ToggleSwitch;
