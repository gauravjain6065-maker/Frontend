import React from 'react';

// Shell Layout Components
export { default as CrmLayout } from './CrmLayout';
export { ManagerLayout } from './ManagerLayout';
export { CompanyAdminLayout, default as CompanyAdminLayoutDefault } from './CompanyAdminLayout';
export { Sidebar } from './Sidebar';
export { default as SidebarDefault } from './Sidebar';
export { Topbar } from './Topbar';

// Reusable Layout Helper Components
export const PageContainer = ({ children, className = '' }) => (
  <div className={`max-w-7xl mx-auto space-y-6 ${className}`}>
    {children}
  </div>
);

export const PageHeader = ({ title, subtitle, action, actions }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
    {(action || actions) && (
      <div className="flex items-center gap-3 shrink-0">
        {action}
        {actions}
      </div>
    )}
  </div>
);

export const Section = ({ title, description, children, action, className = '' }) => (
  <div className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm ${className}`}>
    {(title || description || action) && (
      <div className="flex items-center justify-between mb-4">
        <div>
          {title && <h2 className="text-lg font-semibold text-gray-800">{title}</h2>}
          {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    )}
    {children}
  </div>
);

export const Card = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    {children}
  </div>
);

export const Grid = ({ children, cols = 3, className = '' }) => {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };
  return (
    <div className={`grid ${colClasses[cols] || 'grid-cols-1 md:grid-cols-3'} gap-6 ${className}`}>
      {children}
    </div>
  );
};

export const Stack = ({ children, direction = 'col', gap = 4, className = '' }) => (
  <div className={`flex ${direction === 'row' ? 'flex-row items-center' : 'flex-col'} gap-${gap} ${className}`}>
    {children}
  </div>
);

export const Divider = ({ className = '' }) => (
  <div className={`h-[1px] bg-gray-200 w-full my-4 ${className}`} />
);

export const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
);
