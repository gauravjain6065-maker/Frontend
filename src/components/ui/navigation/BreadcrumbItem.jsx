import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * BreadcrumbItem component - Segment representing a link in a breadcrumb path.
 */
const BreadcrumbItem = React.memo(({
  children,
  href = '',
  active = false,
  className = '',
  ...props
}) => {
  if (active || !href) {
    return (
      <span
        className={`font-semibold text-neutral-700 select-none ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      to={href}
      className={`text-neutral-500 hover:text-primary-600 transition-colors focus:outline-none focus:underline ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
});

BreadcrumbItem.displayName = 'BreadcrumbItem';

BreadcrumbItem.propTypes = {
  /** Text content or link label */
  children: PropTypes.node.isRequired,
  /** Router link destination target */
  href: PropTypes.string,
  /** If true, renders active state (non-clickable text) */
  active: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default BreadcrumbItem;
