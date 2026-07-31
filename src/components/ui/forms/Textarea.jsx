import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Textarea component - Multi-line text field wrapper.
 */
const Textarea = React.memo(forwardRef(({
  label = '',
  helperText = '',
  error = '',
  disabled = false,
  required = false,
  rows = 4,
  className = '',
  id,
  ...props
}, ref) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;

  const borderClass = hasError
    ? 'border-danger-500 focus:border-danger-500 focus:shadow-[0_0_0_3px_rgba(244,63,94,0.15)]'
    : 'border-neutral-200 focus:border-primary-400 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]';

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {/* Label block */}
      {label && (
        <label
          htmlFor={textareaId}
          className="text-xs font-semibold text-neutral-600 flex items-center gap-0.5 select-none"
        >
          {label}
          {required && <span className="text-danger-500" aria-hidden="true">*</span>}
        </label>
      )}

      {/* Textarea field */}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        disabled={disabled}
        required={required}
        className={`crm-scrollbar w-full min-h-[80px] p-3 text-sm rounded-md border text-neutral-800 bg-white outline-none transition-all resize-y ${borderClass}`}
        {...props}
      />

      {/* Error or helper message block */}
      {hasError ? (
        <span className="text-xs text-danger-600 font-semibold" id={`${textareaId}-error`}>
          {error}
        </span>
      ) : helperText ? (
        <span className="text-xs text-neutral-400" id={`${textareaId}-helper`}>
          {helperText}
        </span>
      ) : null}
    </div>
  );
}));

Textarea.displayName = 'Textarea';

Textarea.propTypes = {
  /** Form text field label header */
  label: PropTypes.string,
  /** Help descriptors text */
  helperText: PropTypes.string,
  /** Error details (toggles danger styles) */
  error: PropTypes.string,
  /** Disabled attribute */
  disabled: PropTypes.bool,
  /** Required attribute */
  required: PropTypes.bool,
  /** Default rows count height */
  rows: PropTypes.number,
  /** Unique element ID */
  id: PropTypes.string,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default Textarea;
