import React from 'react';
import PropTypes from 'prop-types';

/**
 * PageContainer component - Controls the main content width, alignment, and spacing.
 */
const PageContainer = React.memo(({
  children,
  fluid = false,
  padding = 'p-4 md:p-8',
  maxWidth = 'max-w-7xl',
  className = '',
  ...props
}) => {
  return (
    <div
      className={`w-full mx-auto min-h-screen ${
        fluid ? 'max-w-full' : maxWidth
      } ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

PageContainer.displayName = 'PageContainer';

PageContainer.propTypes = {
  /** The children nodes to render within the page container */
  children: PropTypes.node.isRequired,
  /** If true, the container spans full width without max-width constraints */
  fluid: PropTypes.bool,
  /** Configurable spacing classes for padding */
  padding: PropTypes.string,
  /** Maximum width configuration when not in fluid mode */
  maxWidth: PropTypes.string,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default PageContainer;
