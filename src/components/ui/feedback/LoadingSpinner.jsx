import React from 'react';
import PropTypes from 'prop-types';

/**
 * LoadingSpinner component - Simple spinning loading indicator.
 */
const LoadingSpinner = React.memo(({
  size = 'md',
  colorClass = 'border-primary-100 border-t-primary-600',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div
      className={`rounded-full animate-spin ${
        sizeClasses[size] || sizeClasses.md
      } ${colorClass} ${className}`}
      role="status"
      aria-label="Loading..."
      {...props}
    />
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

LoadingSpinner.propTypes = {
  /** Dimension size */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Custom Tailwind border color configuration */
  colorClass: PropTypes.string,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default LoadingSpinner;
