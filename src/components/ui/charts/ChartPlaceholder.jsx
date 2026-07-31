import React from 'react';
import PropTypes from 'prop-types';

/**
 * ChartPlaceholder component - Renders premium SVG graphics modeling line, bar, donut, and area charts.
 */
const ChartPlaceholder = React.memo(({
  type = 'area', // 'line' | 'bar' | 'donut' | 'area'
  height = 240,
  title = '',
  className = '',
  ...props
}) => {
  const containerStyle = { height: typeof height === 'number' ? `${height}px` : height };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#4F46E5" />
              </linearGradient>
            </defs>
            {/* Gridlines */}
            <line x1="40" y1="30" x2="480" y2="30" stroke="#F1F5F9" strokeWidth="1" />
            <line x1="40" y1="80" x2="480" y2="80" stroke="#F1F5F9" strokeWidth="1" />
            <line x1="40" y1="130" x2="480" y2="130" stroke="#F1F5F9" strokeWidth="1" />
            <line x1="40" y1="170" x2="480" y2="170" stroke="#E2E8F0" strokeWidth="1.5" />
            {/* Axes */}
            <line x1="40" y1="30" x2="40" y2="170" stroke="#E2E8F0" strokeWidth="1.5" />
            {/* Line Path */}
            <path
              d="M 40 140 C 100 110, 130 160, 200 90 C 270 20, 320 120, 400 60 C 440 30, 460 50, 480 40"
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Dots */}
            <circle cx="200" cy="90" r="4.5" fill="#6366F1" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="400" cy="60" r="4.5" fill="#4F46E5" stroke="#FFFFFF" strokeWidth="1.5" />
          </svg>
        );
      case 'bar':
        return (
          <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#818CF8" />
              </linearGradient>
            </defs>
            {/* Gridlines */}
            <line x1="40" y1="30" x2="480" y2="30" stroke="#F1F5F9" strokeWidth="1" />
            <line x1="40" y1="80" x2="480" y2="80" stroke="#F1F5F9" strokeWidth="1" />
            <line x1="40" y1="130" x2="480" y2="130" stroke="#F1F5F9" strokeWidth="1" />
            <line x1="40" y1="170" x2="480" y2="170" stroke="#E2E8F0" strokeWidth="1.5" />
            {/* Bars */}
            <rect x="70" y="90" width="30" height="80" rx="3" fill="url(#barGrad)" />
            <rect x="140" y="50" width="30" height="120" rx="3" fill="url(#barGrad)" />
            <rect x="210" y="110" width="30" height="60" rx="3" fill="#E2E8F0" />
            <rect x="280" y="40" width="30" height="130" rx="3" fill="url(#barGrad)" />
            <rect x="350" y="80" width="30" height="90" rx="3" fill="url(#barGrad)" />
            <rect x="420" y="60" width="30" height="110" rx="3" fill="#10B981" />
          </svg>
        );
      case 'donut':
        return (
          <div className="flex items-center justify-center h-full gap-8">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              {/* Background circle */}
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#F1F5F9" strokeWidth="3" />
              {/* Segments */}
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                stroke="#6366F1"
                strokeWidth="3"
                strokeDasharray="60 40"
                strokeDashoffset="100"
                strokeLinecap="round"
              />
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                stroke="#10B981"
                strokeWidth="3"
                strokeDasharray="25 75"
                strokeDashoffset="40"
                strokeLinecap="round"
              />
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                stroke="#F59E0B"
                strokeWidth="3"
                strokeDasharray="15 85"
                strokeDashoffset="15"
                strokeLinecap="round"
              />
            </svg>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-500" />
                <span className="font-semibold text-neutral-700">Conversion (60%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-success-500" />
                <span className="font-semibold text-neutral-700">Referrals (25%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-warning-500" />
                <span className="font-semibold text-neutral-700">Organic (15%)</span>
              </div>
            </div>
          </div>
        );
      case 'area':
      default:
        return (
          <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Gridlines */}
            <line x1="40" y1="30" x2="480" y2="30" stroke="#F1F5F9" strokeWidth="1" />
            <line x1="40" y1="80" x2="480" y2="80" stroke="#F1F5F9" strokeWidth="1" />
            <line x1="40" y1="130" x2="480" y2="130" stroke="#F1F5F9" strokeWidth="1" />
            <line x1="40" y1="170" x2="480" y2="170" stroke="#E2E8F0" strokeWidth="1.5" />
            {/* Area Path */}
            <path
              d="M 40 170 Q 100 130, 160 140 T 280 80 T 400 90 T 480 50 L 480 170 Z"
              fill="url(#areaGrad)"
            />
            {/* Area Top Line */}
            <path
              d="M 40 170 Q 100 130, 160 140 T 280 80 T 400 90 T 480 50"
              fill="none"
              stroke="#6366F1"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        );
    }
  };

  return (
    <div className={`flex flex-col w-full bg-white rounded-lg p-3 ${className}`} {...props}>
      {title && (
        <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
          {title}
        </span>
      )}
      
      {/* SVG Container */}
      <div style={containerStyle} className="w-full relative">
        {renderChart()}
      </div>
    </div>
  );
});

ChartPlaceholder.displayName = 'ChartPlaceholder';

ChartPlaceholder.propTypes = {
  /** Visual presentation type */
  type: PropTypes.oneOf(['line', 'bar', 'donut', 'area']),
  /** Height dimension in pixels */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Title header displayed above visual chart shapes */
  title: PropTypes.string,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default ChartPlaceholder;
