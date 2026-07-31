import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../layout/Card';
import Grid from '../../layout/Grid';

/**
 * InfoCard component - Renders structured key-value arrays in an organized layout.
 */
const InfoCard = React.memo(({
  title = '',
  items = [],
  cols = { default: 1, sm: 2 },
  headerActions = null,
  className = '',
  ...props
}) => {
  return (
    <Card title={title} headerActions={headerActions} className={className} {...props}>
      <Grid cols={cols} gap={4}>
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col pb-2 border-b border-neutral-100 last:border-0 sm:border-0">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
              {item.label}
            </span>
            <span className="text-sm font-medium text-neutral-800 mt-1">
              {item.render ? item.render(item.value) : item.value || '—'}
            </span>
          </div>
        ))}
      </Grid>
    </Card>
  );
});

InfoCard.displayName = 'InfoCard';

InfoCard.propTypes = {
  /** Optional title for the details card */
  title: PropTypes.string,
  /** List of details elements */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any,
      render: PropTypes.func,
    })
  ).isRequired,
  /** Grid responsive column widths */
  cols: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object
  ]),
  /** Custom header actions button slots */
  headerActions: PropTypes.node,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default InfoCard;
