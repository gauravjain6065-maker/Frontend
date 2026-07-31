import React from 'react';
import PropTypes from 'prop-types';

/**
 * Helper to get flex direction class names.
 */
const getDirectionClasses = (direction) => {
  if (typeof direction === 'string') {
    return direction === 'row' ? 'flex-row' : 'flex-col';
  }

  if (typeof direction === 'object' && direction !== null) {
    const classes = [];
    const formatDir = (val) => (val === 'row' ? 'flex-row' : 'flex-col');
    
    if (direction.default !== undefined) classes.push(formatDir(direction.default));
    if (direction.xs !== undefined) classes.push(`xs:${formatDir(direction.xs)}`);
    if (direction.sm !== undefined) classes.push(`sm:${formatDir(direction.sm)}`);
    if (direction.md !== undefined) classes.push(`md:${formatDir(direction.md)}`);
    if (direction.lg !== undefined) classes.push(`lg:${formatDir(direction.lg)}`);
    if (direction.xl !== undefined) classes.push(`xl:${formatDir(direction.xl)}`);
    return classes.join(' ');
  }

  return 'flex-col';
};

/**
 * Helper to parse spacing tokens into flex gap class names.
 */
const getGapClasses = (space) => {
  if (typeof space === 'number' || typeof space === 'string') {
    return String(space).startsWith('gap-') ? space : `gap-${space}`;
  }

  if (typeof space === 'object' && space !== null) {
    const classes = [];
    const formatGap = (val) => (String(val).startsWith('gap-') ? val : `gap-${val}`);
    
    if (space.default !== undefined) classes.push(formatGap(space.default));
    if (space.xs !== undefined) classes.push(`xs:${formatGap(space.xs)}`);
    if (space.sm !== undefined) classes.push(`sm:${formatGap(space.sm)}`);
    if (space.md !== undefined) classes.push(`md:${formatGap(space.md)}`);
    if (space.lg !== undefined) classes.push(`lg:${formatGap(space.lg)}`);
    if (space.xl !== undefined) classes.push(`xl:${formatGap(space.xl)}`);
    return classes.join(' ');
  }

  return 'gap-4';
};

/**
 * Stack component - Linear flex-box layout container for ordering elements vertically or horizontally.
 */
const Stack = React.memo(({
  children,
  direction = 'col',
  space = 4,
  align = '',
  justify = '',
  wrap = false,
  className = '',
  ...props
}) => {
  const dirClasses = getDirectionClasses(direction);
  const gapClasses = getGapClasses(space);
  const alignClass = align ? `items-${align}` : '';
  const justifyClass = justify ? `justify-${justify}` : '';
  const wrapClass = wrap ? 'flex-wrap' : 'flex-nowrap';

  return (
    <div
      className={`flex ${dirClasses} ${gapClasses} ${alignClass} ${justifyClass} ${wrapClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Stack.displayName = 'Stack';

Stack.propTypes = {
  /** The child elements inside the stack */
  children: PropTypes.node.isRequired,
  /** 
   * Layout direction. Can be a string ('col' | 'row') or a breakpoint mapping:
   * e.g. 'row' or { default: 'col', md: 'row' }
   */
  direction: PropTypes.oneOfType([
    PropTypes.oneOf(['col', 'row']),
    PropTypes.shape({
      default: PropTypes.oneOf(['col', 'row']),
      xs: PropTypes.oneOf(['col', 'row']),
      sm: PropTypes.oneOf(['col', 'row']),
      md: PropTypes.oneOf(['col', 'row']),
      lg: PropTypes.oneOf(['col', 'row']),
      xl: PropTypes.oneOf(['col', 'row']),
    }),
  ]),
  /** 
   * Gap spacing between children. Can be a number/string or breakpoint mapping:
   * e.g., 4 or { default: 2, md: 4 }
   */
  space: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.shape({
      default: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      xs: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      sm: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      md: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      lg: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      xl: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  ]),
  /** Flex align-items property value (e.g., 'start', 'center', 'end', 'stretch') */
  align: PropTypes.oneOf(['', 'start', 'center', 'end', 'stretch', 'baseline']),
  /** Flex justify-content property value (e.g., 'start', 'center', 'end', 'between', 'around') */
  justify: PropTypes.oneOf(['', 'start', 'center', 'end', 'between', 'around', 'evenly']),
  /** Enable wrapping if content overflows horizontal space */
  wrap: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default Stack;
