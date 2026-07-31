import React from 'react';
import PropTypes from 'prop-types';

/**
 * Tabs component - Reusable horizontal tab layout selectors.
 */
const Tabs = React.memo(({
  tabs = [],
  activeTab,
  onChange = () => {},
  variant = 'line', // 'line' | 'pills'
  className = '',
  ...props
}) => {
  const isLine = variant === 'line';

  const containerClasses = isLine
    ? 'border-b border-neutral-200 flex gap-6 overflow-x-auto crm-scrollbar'
    : 'bg-neutral-100 p-1 rounded-lg inline-flex gap-1 overflow-x-auto crm-scrollbar';

  return (
    <div className={`${containerClasses} ${className}`} role="tablist" {...props}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        const Icon = tab.icon || null;

        let tabClasses = 'inline-flex items-center gap-2 py-2.5 px-1.5 text-xs font-semibold whitespace-nowrap cursor-pointer transition-all focus:outline-none';

        if (isLine) {
          tabClasses += isActive
            ? ' text-primary-600 border-b-2 border-primary-500'
            : ' text-neutral-500 hover:text-neutral-800 border-b-2 border-transparent';
        } else {
          tabClasses += ' px-3 py-1.5 rounded-md';
          tabClasses += isActive
            ? ' bg-white text-neutral-800 shadow-sm'
            : ' text-neutral-500 hover:text-neutral-800';
        }

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={tab.panelId}
            onClick={() => onChange(tab.id)}
            className={tabClasses}
          >
            {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
});

Tabs.displayName = 'Tabs';

Tabs.propTypes = {
  /** Array of tab configuration objects */
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.elementType,
      panelId: PropTypes.string,
    })
  ).isRequired,
  /** Active selected tab ID */
  activeTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** Callback triggered when tab is clicked */
  onChange: PropTypes.func.isRequired,
  /** Visual display format */
  variant: PropTypes.oneOf(['line', 'pills']),
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default Tabs;
