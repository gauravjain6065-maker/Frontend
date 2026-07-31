import React from 'react';
import PropTypes from 'prop-types';

/**
 * StatusBadge component - Standardized badge for status tags with colored indicator dots.
 */
const StatusBadge = React.memo(({
  status,
  customLabel = '',
  showDot = true,
  className = '',
  ...props
}) => {
  const normStatus = String(status).toLowerCase();
  
  let colorClass = 'bg-neutral-50 text-neutral-600 border-neutral-200';
  let dotClass = 'bg-neutral-400';

  if (['active', 'completed', 'won', 'success', 'approved'].includes(normStatus)) {
    colorClass = 'bg-success-50 text-success-700 border-success-200';
    dotClass = 'bg-success-500';
  } else if (['inactive', 'pending', 'draft', 'warn', 'warning', 'hold'].includes(normStatus)) {
    colorClass = 'bg-warning-50 text-warning-700 border-warning-200';
    dotClass = 'bg-warning-500';
  } else if (['suspended', 'deleted', 'lost', 'danger', 'cancelled', 'rejected', 'failed'].includes(normStatus)) {
    colorClass = 'bg-danger-50 text-danger-700 border-danger-200';
    dotClass = 'bg-danger-500';
  } else if (['info', 'new', 'lead', 'contact', 'customer', 'in_progress'].includes(normStatus)) {
    colorClass = 'bg-info-50 text-info-700 border-info-200';
    dotClass = 'bg-info-500';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorClass} ${className}`}
      {...props}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotClass} flex-shrink-0 animate-pulse`} />
      )}
      {customLabel || status}
    </span>
  );
});

StatusBadge.displayName = 'StatusBadge';

StatusBadge.propTypes = {
  /** The status string value */
  status: PropTypes.string.isRequired,
  /** Optional custom text override for the display label */
  customLabel: PropTypes.string,
  /** If true, displays a small indicator dot in front of the label */
  showDot: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default StatusBadge;
