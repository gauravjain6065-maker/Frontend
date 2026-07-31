import React from 'react';
import PropTypes from 'prop-types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Card from '../../layout/Card';

/**
 * StatCard component - Custom KPI card showing core numbers and trends.
 */
const StatCard = React.memo(({
  title,
  value,
  icon: Icon = null,
  change = '',
  trend = 'neutral',
  trendLabel = 'from last period',
  loading = false,
  className = '',
  ...props
}) => {
  const isUp = trend === 'up';
  const isDown = trend === 'down';

  let trendColor = 'text-neutral-500';
  let TrendIcon = Minus;

  if (isUp) {
    trendColor = 'text-success-600';
    TrendIcon = TrendingUp;
  } else if (isDown) {
    trendColor = 'text-danger-600';
    TrendIcon = TrendingDown;
  }

  return (
    <Card loading={loading} className={className} {...props}>
      <div className="flex justify-between items-start">
        <div>
          <p className="crm-text-small font-medium uppercase tracking-wider text-neutral-500">{title}</p>
          <h3 className="text-2xl font-bold text-neutral-900 mt-2">{value}</h3>
        </div>
        {Icon && (
          <div className="p-3 bg-primary-50 text-primary-600 rounded-lg">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(change || trendLabel) && (
        <div className="flex items-center gap-1 text-xs font-semibold mt-4">
          <span className={`inline-flex items-center gap-0.5 ${trendColor}`}>
            <TrendIcon className="w-3.5 h-3.5" />
            {change && <span>{change}</span>}
          </span>
          <span className="text-neutral-500 font-medium">{trendLabel}</span>
        </div>
      )}
    </Card>
  );
});

StatCard.displayName = 'StatCard';

StatCard.propTypes = {
  /** Metric label title */
  title: PropTypes.string.isRequired,
  /** Primary metric value number or text */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** Lucide icon component to show in top-right */
  icon: PropTypes.elementType,
  /** Trend percentage value (e.g. "+12.5%") */
  change: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Trend vector direction */
  trend: PropTypes.oneOf(['up', 'down', 'neutral']),
  /** Sub-text label explaining time context */
  trendLabel: PropTypes.string,
  /** Toggles spinner overlay */
  loading: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default StatCard;
