import React from 'react';
import PropTypes from 'prop-types';

/**
 * NotificationCard component - Standard display element for message logs and alerts.
 */
const NotificationCard = React.memo(({
  title,
  description = '',
  time = '',
  unread = false,
  icon: Icon = null,
  variant = 'default',
  onClick = null,
  className = '',
  ...props
}) => {
  const variantIcons = {
    default: 'bg-neutral-100 text-neutral-600',
    primary: 'bg-primary-50 text-primary-600',
    success: 'bg-success-50 text-success-600',
    warning: 'bg-warning-50 text-warning-600',
    danger: 'bg-danger-50 text-danger-600',
    info: 'bg-info-50 text-info-600',
  };

  const borderClass = unread ? 'border-l-4 border-l-primary-500' : '';
  const bgClass = unread ? 'bg-primary-50/20' : 'bg-white hover:bg-neutral-50/50';

  return (
    <div
      onClick={onClick}
      className={`p-4 border border-neutral-200 rounded-lg flex gap-3 transition-colors ${
        onClick ? 'cursor-pointer' : ''
      } ${borderClass} ${bgClass} ${className}`}
      {...props}
    >
      {/* Icon Bracket */}
      {Icon && (
        <div className={`p-2 rounded-lg h-9 w-9 flex-shrink-0 flex items-center justify-center ${
          variantIcons[variant] || variantIcons.default
        }`}>
          <Icon className="w-5 h-5" />
        </div>
      )}

      {/* Content Stack */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <h4 className={`text-sm font-semibold truncate ${
            unread ? 'text-neutral-900 font-bold' : 'text-neutral-800'
          }`}>
            {title}
          </h4>
          {unread && (
            <span className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-1.5" aria-hidden="true" />
          )}
        </div>
        
        {description && (
          <p className="text-xs text-neutral-600 mt-0.5 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
        
        {time && (
          <span className="text-[10px] font-semibold text-neutral-400 mt-2 block">
            {time}
          </span>
        )}
      </div>
    </div>
  );
});

NotificationCard.displayName = 'NotificationCard';

NotificationCard.propTypes = {
  /** Alert primary text header */
  title: PropTypes.string.isRequired,
  /** Optional body helper text */
  description: PropTypes.string,
  /** Subtext timestamp or relative date label */
  time: PropTypes.string,
  /** Toggles high-contrast unread background and side indicator bar */
  unread: PropTypes.bool,
  /** Icon element to display */
  icon: PropTypes.elementType,
  /** Visual theme coloring for the icon badge */
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger', 'info']),
  /** Callback click event */
  onClick: PropTypes.func,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default NotificationCard;
