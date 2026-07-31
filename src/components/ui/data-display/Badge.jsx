import React from 'react';
import PropTypes from 'prop-types';

/**
 * Badge component - Standard tag/pill component.
 */
const Badge = React.memo(({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full border';
  
  const variantClasses = {
    default: 'bg-neutral-50 text-neutral-600 border-neutral-200',
    primary: 'bg-primary-50 text-primary-700 border-primary-200',
    secondary: 'bg-neutral-100 text-neutral-700 border-neutral-200',
    success: 'bg-success-50 text-success-700 border-success-200',
    warning: 'bg-warning-50 text-warning-700 border-warning-200',
    danger: 'bg-danger-50 text-danger-700 border-danger-200',
    info: 'bg-info-50 text-info-700 border-info-200',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  };

  const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.default} ${sizeClasses[size] || sizeClasses.md} ${className}`;

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

Badge.propTypes = {
  /** Badge content text/node */
  children: PropTypes.node.isRequired,
  /** Color theme variant */
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info']),
  /** Dimensions size */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default Badge;
