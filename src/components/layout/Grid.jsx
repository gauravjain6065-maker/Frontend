import React from 'react';
import PropTypes from 'prop-types';

/**
 * Helper to compile grid columns dynamically into responsive Tailwind classes.
 */
const getColClasses = (cols) => {
  if (typeof cols === 'number' || typeof cols === 'string') {
    return `grid-cols-${cols}`;
  }

  if (typeof cols === 'object' && cols !== null) {
    const classes = [];
    if (cols.default !== undefined) classes.push(`grid-cols-${cols.default}`);
    if (cols.xs !== undefined) classes.push(`xs:grid-cols-${cols.xs}`);
    if (cols.sm !== undefined) classes.push(`sm:grid-cols-${cols.sm}`);
    if (cols.md !== undefined) classes.push(`md:grid-cols-${cols.md}`);
    if (cols.lg !== undefined) classes.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl !== undefined) classes.push(`xl:grid-cols-${cols.xl}`);
    if (cols.xxl !== undefined) classes.push(`2xl:grid-cols-${cols.xxl}`);
    return classes.join(' ');
  }

  return 'grid-cols-1';
};

/**
 * Helper to compile grid gap dynamically into responsive Tailwind classes.
 */
const getGapClasses = (gap) => {
  if (typeof gap === 'number' || typeof gap === 'string') {
    return String(gap).startsWith('gap-') ? gap : `gap-${gap}`;
  }

  if (typeof gap === 'object' && gap !== null) {
    const classes = [];
    const formatGap = (val) => (String(val).startsWith('gap-') ? val : `gap-${val}`);
    
    if (gap.default !== undefined) classes.push(formatGap(gap.default));
    if (gap.xs !== undefined) classes.push(`xs:${formatGap(gap.xs)}`);
    if (gap.sm !== undefined) classes.push(`sm:${formatGap(gap.sm)}`);
    if (gap.md !== undefined) classes.push(`md:${formatGap(gap.md)}`);
    if (gap.lg !== undefined) classes.push(`lg:${formatGap(gap.lg)}`);
    if (gap.xl !== undefined) classes.push(`xl:${formatGap(gap.xl)}`);
    if (gap.xxl !== undefined) classes.push(`2xl:${formatGap(gap.xxl)}`);
    return classes.join(' ');
  }

  return 'gap-6';
};

/**
 * Grid component - Flexible grid layout wrapper.
 */
const Grid = React.memo(({
  children,
  cols = { default: 1, sm: 2, lg: 3 },
  gap = 6,
  className = '',
  ...props
}) => {
  const colClasses = getColClasses(cols);
  const gapClasses = getGapClasses(gap);

  return (
    <div className={`grid ${colClasses} ${gapClasses} ${className}`} {...props}>
      {children}
    </div>
  );
});

Grid.displayName = 'Grid';

Grid.propTypes = {
  /** The items inside the grid */
  children: PropTypes.node.isRequired,
  /** 
   * Columns count. Can be a number/string or a breakpoint mapping object:
   * e.g., 4 or { default: 1, sm: 2, md: 3, lg: 4 }
   */
  cols: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.shape({
      default: PropTypes.number,
      xs: PropTypes.number,
      sm: PropTypes.number,
      md: PropTypes.number,
      lg: PropTypes.number,
      xl: PropTypes.number,
      xxl: PropTypes.number,
    }),
  ]),
  /**
   * Spacing between grid elements. Can be a number/string (e.g. 4 or "gap-4")
   * or a breakpoint mapping object: { default: 4, md: 6 }
   */
  gap: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.shape({
      default: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      xs: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      sm: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      md: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      lg: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      xl: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      xxl: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  ]),
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default Grid;
