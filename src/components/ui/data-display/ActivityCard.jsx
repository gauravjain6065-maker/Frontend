import React from 'react';
import PropTypes from 'prop-types';

/**
 * ActivityCard component - Timeline list item representing logs and audits.
 */
const ActivityCard = React.memo(({
  title,
  description = '',
  time = '',
  icon: Icon = null,
  variant = 'default',
  isLast = false,
  className = '',
  ...props
}) => {
  const variantColors = {
    default: 'bg-neutral-100 text-neutral-600 border-neutral-300',
    primary: 'bg-primary-50 text-primary-600 border-primary-200',
    success: 'bg-success-50 text-success-600 border-success-200',
    warning: 'bg-warning-50 text-warning-600 border-warning-200',
    danger: 'bg-danger-50 text-danger-600 border-danger-200',
    info: 'bg-info-50 text-info-600 border-info-200',
  };

  return (
    <div className={`flex gap-4 relative ${className}`} {...props}>
      {/* Timeline Bullet Column */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={`w-8 h-8 rounded-full border flex items-center justify-center z-10 ${
          variantColors[variant] || variantColors.default
        }`}>
          {Icon ? <Icon className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current" />}
        </div>
        {!isLast && (
          <div className="w-0.5 bg-neutral-200 flex-1 my-1 min-h-[24px]" />
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 pb-6 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <h5 className="text-sm font-semibold text-neutral-800 truncate">
            {title}
          </h5>
          {time && (
            <span className="text-[10px] font-semibold text-neutral-400 sm:flex-shrink-0">
              {time}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
});

ActivityCard.displayName = 'ActivityCard';

ActivityCard.propTypes = {
  /** Log title headline */
  title: PropTypes.string.isRequired,
  /** Sub-body paragraph description */
  description: PropTypes.string,
  /** Timestamp label */
  time: PropTypes.string,
  /** Icon displayed inside the circular marker */
  icon: PropTypes.elementType,
  /** Visual color theme mapping */
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger', 'info']),
  /** If true, hides the vertical connection line extending below the marker */
  isLast: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default ActivityCard;
