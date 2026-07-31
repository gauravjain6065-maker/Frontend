import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card component - Standard container for panels and items.
 * Integrates directly with index.css .crm-card and .crm-card-interactive classes.
 */
const Card = React.memo(({
  title = '',
  headerActions = null,
  header = null,
  footer = null,
  loading = false,
  interactive = false,
  hoverable = false,
  children,
  className = '',
  ...props
}) => {
  // Determine standard card styling
  let cardClass = interactive ? 'crm-card-interactive' : 'crm-card';

  if (hoverable && !interactive) {
    cardClass += ' hover:shadow-card hover:border-neutral-300 transition-all duration-200';
  }

  return (
    <div className={`relative overflow-hidden ${cardClass} ${className}`} {...props}>
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex flex-col items-center justify-center z-10 transition-all duration-200">
          <div className="flex flex-col items-center gap-3">
            {/* Spinning Loader Ring */}
            <div className="w-8 h-8 rounded-full border-[3px] border-primary-100 border-t-primary-600 animate-spin" />
            <span className="text-xs font-medium text-neutral-500">Loading data...</span>
          </div>
        </div>
      )}

      {/* Card Header */}
      {(header || title) && (
        <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-3 mb-4">
          {header ? (
            header
          ) : (
            <div>
              <h3 className="crm-title-card">{title}</h3>
            </div>
          )}
          {headerActions && (
            <div className="flex items-center gap-2">
              {headerActions}
            </div>
          )}
        </div>
      )}

      {/* Card Body */}
      <div className="crm-card-body flex-1">
        {children}
      </div>

      {/* Card Footer */}
      {footer && (
        <div className="border-t border-neutral-100 pt-3 mt-4 flex items-center justify-between">
          {footer}
        </div>
      )}
    </div>
  );
});

Card.displayName = 'Card';

Card.propTypes = {
  /** Text for standard title. Ignored if custom 'header' prop is used */
  title: PropTypes.string,
  /** Quick action nodes aligned on the right of the header */
  headerActions: PropTypes.node,
  /** Custom header element to replace default title structure */
  header: PropTypes.node,
  /** Custom footer block */
  footer: PropTypes.node,
  /** Toggles a styled loading state overlay */
  loading: PropTypes.bool,
  /** If true, acts as a clickable/interactive button container */
  interactive: PropTypes.bool,
  /** If true, adds a subtle hover transition effect */
  hoverable: PropTypes.bool,
  /** Card body content */
  children: PropTypes.node.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default Card;
