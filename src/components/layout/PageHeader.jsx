import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * PageHeader component - Standardized top heading bar for CRM pages.
 */
const PageHeader = React.memo(({
  title,
  description = '',
  breadcrumbs = [],
  actions = null,
  leftSection = null,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-3 pb-6 border-b border-neutral-200 ${className}`} {...props}>
      {/* Breadcrumbs Navigation */}
      {breadcrumbs.length > 0 && (
        <nav className="flex items-center flex-wrap gap-1 text-xs text-neutral-500" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight className="w-3 h-3 text-neutral-300 flex-shrink-0" />}
                {isLast ? (
                  <span className="font-medium text-neutral-700 select-none">
                    {crumb.label}
                  </span>
                ) : crumb.href ? (
                  <Link
                    to={crumb.href}
                    className="hover:text-primary-600 transition-colors focus:outline-none focus:underline"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="cursor-default select-none">{crumb.label}</span>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      )}

      {/* Main Title & Action Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left: Optional Section Icon/Addon + Title Stack */}
        <div className="flex items-center gap-3">
          {leftSection}
          <div>
            <h1 className="crm-title-page">{title}</h1>
            {description && (
              <p className="crm-text-normal mt-1">{description}</p>
            )}
          </div>
        </div>

        {/* Right: Actions Slot */}
        {actions && (
          <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
});

PageHeader.displayName = 'PageHeader';

PageHeader.propTypes = {
  /** Page header main title */
  title: PropTypes.string.isRequired,
  /** Optional subtitle or description text */
  description: PropTypes.string,
  /** List of breadcrumb links */
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ),
  /** Slots for buttons / actions on the right side */
  actions: PropTypes.node,
  /** Optional icon or decoration element next to the title */
  leftSection: PropTypes.node,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default PageHeader;
