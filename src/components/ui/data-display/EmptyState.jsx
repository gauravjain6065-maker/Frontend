import React from 'react';
import PropTypes from 'prop-types';
import { Database } from 'lucide-react';

/**
 * EmptyState component - Display placeholder when tables or lists are blank.
 */
const EmptyState = React.memo(({
  title = 'No records found',
  description = 'There are no active records in this list. Try adding a new entry or updating your filters.',
  icon: Icon = Database,
  action = null,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 md:p-12 text-center bg-white border border-dashed border-neutral-300 rounded-xl max-w-lg mx-auto ${className}`}
      {...props}
    >
      {/* Icon Frame */}
      <div className="p-4 bg-neutral-50 text-neutral-400 rounded-full mb-4">
        <Icon className="w-10 h-10" />
      </div>

      {/* Text Stack */}
      <h3 className="text-base font-semibold text-neutral-800">
        {title}
      </h3>
      <p className="text-xs text-neutral-500 mt-2 max-w-sm leading-relaxed">
        {description}
      </p>

      {/* Optional action slot */}
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
});

EmptyState.displayName = 'EmptyState';

EmptyState.propTypes = {
  /** Main message text */
  title: PropTypes.string,
  /** Help instructions subtext */
  description: PropTypes.string,
  /** Lucide icon component to show as banner graphic */
  icon: PropTypes.elementType,
  /** Optional button trigger or custom React node */
  action: PropTypes.node,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default EmptyState;
