import React from 'react';

export function Card({ children, className = '', title, subtitle, action }) {
  return (
    <div className={`rounded-xl border border-gray-200 shadow-sm bg-white p-6 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
            {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
