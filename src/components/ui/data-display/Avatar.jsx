import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Helper to generate initials from a name.
 */
const getInitials = (name) => {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

/**
 * Avatar component - User profile circular image with initials fallback.
 */
const Avatar = React.memo(({
  src = '',
  alt = '',
  name = '',
  size = 'md',
  status = '',
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  };

  const statusClasses = {
    online: 'bg-success-500 ring-white',
    offline: 'bg-neutral-400 ring-white',
    busy: 'bg-danger-500 ring-white',
    away: 'bg-warning-500 ring-white',
  };

  const dotSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
  };

  const isImageValid = src && !hasError;

  return (
    <div className="relative inline-flex flex-shrink-0" {...props}>
      <div
        className={`rounded-full overflow-hidden flex items-center justify-center font-semibold bg-primary-100 text-primary-700 border border-primary-200 select-none ${
          sizeClasses[size] || sizeClasses.md
        } ${className}`}
      >
        {isImageValid ? (
          <img
            src={src}
            alt={alt || name}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>

      {status && statusClasses[status] && (
        <span
          className={`absolute bottom-0 right-0 rounded-full ring-2 ${
            statusClasses[status]
          } ${dotSizes[size] || dotSizes.md}`}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
});

Avatar.displayName = 'Avatar';

Avatar.propTypes = {
  /** Source URL of profile image */
  src: PropTypes.string,
  /** Alt tag text for screen readers */
  alt: PropTypes.string,
  /** User name for backup initials compilation */
  name: PropTypes.string,
  /** Dimension variant */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /** Online status indicator tag */
  status: PropTypes.oneOf(['', 'online', 'offline', 'busy', 'away']),
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default Avatar;
