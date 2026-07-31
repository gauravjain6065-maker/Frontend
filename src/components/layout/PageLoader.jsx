import React from 'react';
import PropTypes from 'prop-types';

/**
 * PageLoader component - Handles full-screen spinner indicators and content skeletons.
 */
const PageLoader = React.memo(({
  label = 'Loading CRM Panel...',
  fullscreen = false,
  variant = 'spinner',
  skeletonRows = 3,
  className = '',
  ...props
}) => {
  // Skeleton Loader Variant
  if (variant === 'skeleton') {
    return (
      <div
        className={`animate-pulse space-y-4 w-full p-4 ${className}`}
        role="progressbar"
        aria-label="Loading content placeholder"
        {...props}
      >
        <div className="h-7 bg-neutral-200 rounded-md w-1/4 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: skeletonRows }).map((_, idx) => (
            <div
              key={idx}
              className="h-4 bg-neutral-200 rounded-md"
              style={{ width: idx === skeletonRows - 1 ? '70%' : '100%' }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Spinner Loader Variant
  const loaderContent = (
    <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
      {/* Spinning Ring */}
      <div 
        className="w-10 h-10 rounded-full border-[3.5px] border-primary-100 border-t-primary-600 animate-spin"
        role="status"
      />
      {label && (
        <span className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
          {label}
        </span>
      )}
    </div>
  );

  if (fullscreen) {
    return (
      <div 
        className={`fixed inset-0 bg-neutral-50/80 backdrop-blur-xs flex items-center justify-center z-50 ${className}`}
        {...props}
      >
        {loaderContent}
      </div>
    );
  }

  return (
    <div className={`w-full flex items-center justify-center min-h-[200px] ${className}`} {...props}>
      {loaderContent}
    </div>
  );
});

PageLoader.displayName = 'PageLoader';

PageLoader.propTypes = {
  /** Text label displayed beneath the spinning loading ring */
  label: PropTypes.string,
  /** If true, wraps in a full viewport overlay with backdrop blur */
  fullscreen: PropTypes.bool,
  /** Mode of loading placeholder ('spinner' or 'skeleton') */
  variant: PropTypes.oneOf(['spinner', 'skeleton']),
  /** Number of skeleton line blocks to render in 'skeleton' mode */
  skeletonRows: PropTypes.number,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default PageLoader;
