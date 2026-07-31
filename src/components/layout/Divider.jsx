import React from 'react';
import PropTypes from 'prop-types';

/**
 * Divider component - Simple line separator.
 */
const Divider = React.memo(({
  vertical = false,
  colorClass = 'border-neutral-200',
  className = '',
  ...props
}) => {
  return (
    <div
      className={
        vertical
          ? `inline-block self-stretch w-px min-h-[1em] border-l ${colorClass} ${className}`
          : `w-full border-t ${colorClass} ${className}`
      }
      role="separator"
      aria-orientation={vertical ? 'vertical' : 'horizontal'}
      {...props}
    />
  );
});

Divider.displayName = 'Divider';

Divider.propTypes = {
  /** If true, makes the separator vertical instead of horizontal */
  vertical: PropTypes.bool,
  /** Tailwind border color class */
  colorClass: PropTypes.string,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default Divider;
