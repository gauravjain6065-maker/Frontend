import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, AlertTriangle, XCircle, AlertCircle, X } from 'lucide-react';

/**
 * Toast component - Reusable presentational notification alert card (UI only).
 */
const Toast = React.memo(({
  message,
  description = '',
  variant = 'info', // 'success' | 'warning' | 'error' | 'info'
  onClose = null,
  className = '',
  ...props
}) => {
  const variantStyles = {
    success: {
      bg: 'bg-white border-success-200',
      iconColor: 'text-success-600',
      icon: CheckCircle,
      accent: 'border-l-4 border-l-success-500',
    },
    warning: {
      bg: 'bg-white border-warning-200',
      iconColor: 'text-warning-600',
      icon: AlertTriangle,
      accent: 'border-l-4 border-l-warning-500',
    },
    error: {
      bg: 'bg-white border-danger-200',
      iconColor: 'text-danger-600',
      icon: XCircle,
      accent: 'border-l-4 border-l-danger-500',
    },
    info: {
      bg: 'bg-white border-info-200',
      iconColor: 'text-info-600',
      icon: AlertCircle,
      accent: 'border-l-4 border-l-info-500',
    },
  };

  const current = variantStyles[variant] || variantStyles.info;
  const Icon = current.icon;

  return (
    <div
      role="alert"
      className={`p-4 border rounded-lg shadow-dropdown flex gap-3 min-w-[280px] max-w-sm transition-all duration-200 ${current.bg} ${current.accent} ${className}`}
      {...props}
    >
      {/* Visual Indicator Icon */}
      <span className={`flex-shrink-0 mt-0.5 ${current.iconColor}`}>
        <Icon className="w-5 h-5" />
      </span>

      {/* Message Stack */}
      <div className="flex-1 min-w-0">
        <h5 className="text-sm font-semibold text-neutral-800 leading-snug">
          {message}
        </h5>
        {description && (
          <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Close Action */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors flex-shrink-0 self-start focus:outline-none"
          aria-label="Close notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
});

Toast.displayName = 'Toast';

Toast.propTypes = {
  /** Alert message header title */
  message: PropTypes.string.isRequired,
  /** Optional message details */
  description: PropTypes.string,
  /** Semantic type variant */
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
  /** Callback triggered when close 'X' button is clicked */
  onClose: PropTypes.func,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default Toast;
