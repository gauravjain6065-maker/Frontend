import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button component - Reusable buttons matching index.css styles and active state micro-animations.
 */
const Button = React.memo(({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leadingIcon: LeadingIcon = null,
  trailingIcon: TrailingIcon = null,
  onClick = null,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-md border transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white border-transparent shadow-sm disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed active:scale-[0.98] active:disabled:scale-100',
    secondary: 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-700 shadow-sm hover:border-neutral-300 disabled:bg-white disabled:text-neutral-300 disabled:border-neutral-100 disabled:cursor-not-allowed active:scale-[0.98] active:disabled:scale-100',
    outline: 'bg-transparent border-primary-500 text-primary-600 hover:bg-primary-50 disabled:border-neutral-200 disabled:text-neutral-400 disabled:hover:bg-transparent disabled:cursor-not-allowed active:scale-[0.98] active:disabled:scale-100',
    danger: 'bg-danger-600 hover:bg-danger-700 text-white border-transparent shadow-sm disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed active:scale-[0.98] active:disabled:scale-100',
    text: 'bg-transparent border-transparent text-primary-600 hover:text-primary-700 hover:underline px-0 py-0 shadow-none disabled:text-neutral-400 disabled:no-underline disabled:cursor-not-allowed focus:ring-0 focus:ring-offset-0',
  };

  const sizeClasses = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-12 px-6 text-base gap-2.5',
  };

  const widthClass = fullWidth ? 'w-full flex' : '';
  const opacityClass = loading ? 'opacity-80 cursor-wait pointer-events-none' : '';

  const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${widthClass} ${opacityClass} ${className}`;

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {/* Loading Spinner */}
      {loading && (
        <span
          className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin mr-1 flex-shrink-0"
          aria-hidden="true"
        />
      )}

      {/* Leading Icon */}
      {!loading && LeadingIcon && (
        <LeadingIcon className="w-4 h-4 flex-shrink-0" />
      )}

      {children}

      {/* Trailing Icon */}
      {TrailingIcon && (
        <TrailingIcon className="w-4 h-4 flex-shrink-0" />
      )}
    </button>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  /** Label node content */
  children: PropTypes.node.isRequired,
  /** HTML button element type */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** Custom theme color variant */
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger', 'text']),
  /** Dimension size */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Disabled state */
  disabled: PropTypes.bool,
  /** Loading overlay spinner state */
  loading: PropTypes.bool,
  /** Expands the button width to occupy full parent flex container */
  fullWidth: PropTypes.bool,
  /** Lucide icon element positioned on the left side of text */
  leadingIcon: PropTypes.elementType,
  /** Lucide icon element positioned on the right side of text */
  trailingIcon: PropTypes.elementType,
  /** Event trigger trigger */
  onClick: PropTypes.func,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default Button;
