import React from 'react';

// Core UI Base Named Exports
export { Badge } from './Badge';
export { Button } from './Button';
export { Card } from './Card';
export { Input } from './Input';
export { PageHeader } from './PageHeader';
export { Table } from './Table';

// Reusable UI Component Exports & Fallbacks
export const StatusBadge = ({ status, children }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
    {status || children || 'Active'}
  </span>
);

export const StatCard = ({ title, value, change, trend = 'up', icon: Icon }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-xs text-gray-500 font-medium">{title}</p>
      <h3 className="text-xl font-bold text-gray-900 mt-1">{value}</h3>
      {change && (
        <span className={`text-[11px] font-semibold mt-1 inline-block ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      )}
    </div>
    {Icon && (
      <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
        <Icon className="w-5 h-5" />
      </div>
    )}
  </div>
);

export const CardStats = StatCard;

export const InfoCard = ({ title, children, className = '' }) => (
  <div className={`bg-white border border-gray-200 rounded-xl p-5 shadow-sm ${className}`}>
    {title && <h3 className="text-sm font-bold text-gray-900 mb-3">{title}</h3>}
    {children}
  </div>
);

export const ActivityCard = ({ title, timestamp, description }) => (
  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-xs">
    <div className="flex justify-between items-center mb-1">
      <span className="font-semibold text-gray-800">{title}</span>
      <span className="text-[10px] text-gray-400">{timestamp}</span>
    </div>
    {description && <p className="text-gray-600">{description}</p>}
  </div>
);

export const NotificationCard = ({ title, message, time }) => (
  <div className="p-3 bg-white border border-gray-200 rounded-lg text-xs shadow-xs">
    <p className="font-bold text-gray-900">{title}</p>
    <p className="text-gray-600 mt-0.5">{message}</p>
    <span className="text-[10px] text-gray-400 mt-1 block">{time}</span>
  </div>
);

export const EmptyState = ({ title = 'No Data Found', description = 'Try adjusting your filters or search terms.' }) => (
  <div className="p-8 text-center bg-gray-50 border border-dashed border-gray-300 rounded-xl">
    <p className="font-bold text-gray-700 text-sm">{title}</p>
    <p className="text-xs text-gray-500 mt-1">{description}</p>
  </div>
);

export const DataTable = ({ 
  columns = [], 
  data = [], 
  loading = false, 
  onRowClick, 
  actions, 
  sortColumn, 
  sortDirection, 
  onSort 
}) => {
  if (loading) {
    return (
      <div className="p-8 text-center bg-white border border-gray-200 rounded-xl">
        <div className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-gray-500 mt-2 font-medium">Loading records...</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white shadow-xs">
      <table className="w-full text-left text-xs text-gray-600">
        <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200 uppercase text-[10px] tracking-wider">
          <tr>
            {columns.map((col, idx) => {
              const label = typeof col === 'string' ? col : col.label || col.header || col.name || col.title || col.key || '';
              const isSortable = col.sortable !== false;
              const isSorted = sortColumn && (sortColumn === col.key || sortColumn === col.accessor || sortColumn === col.accessorKey);
              return (
                <th 
                  key={idx} 
                  onClick={() => onSort && isSortable && onSort(col.key || col.accessor || col.accessorKey)}
                  className={`px-4 py-3 ${onSort && isSortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                >
                  <div className="flex items-center gap-1">
                    <span>{label}</span>
                    {isSorted && (
                      <span className="text-blue-600 font-bold">{sortDirection === 'desc' ? '↓' : '↑'}</span>
                    )}
                  </div>
                </th>
              );
            })}
            {actions && <th className="px-4 py-3 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length > 0 ? (
            data.map((row, rowIdx) => (
              <tr 
                key={row.id || rowIdx} 
                onClick={() => onRowClick && onRowClick(row)} 
                className="hover:bg-gray-50/80 transition cursor-pointer"
              >
                {columns.map((col, colIdx) => {
                  const keyName = typeof col === 'string' ? col : col.key || col.accessor || col.accessorKey;
                  const val = row && keyName ? row[keyName] : undefined;
                  return (
                    <td key={colIdx} className="px-4 py-3">
                      {col.render ? col.render(val, row, rowIdx) : (val !== undefined && val !== null ? String(val) : '')}
                    </td>
                  );
                })}
                {actions && (
                  <td className="px-4 py-3 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    {typeof actions === 'function' ? actions(row) : actions}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className="px-4 py-8 text-center text-gray-500">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export const ChartPlaceholder = ({ title = 'Chart Representation' }) => (
  <div className="h-64 bg-gray-50 border border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 text-xs">
    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2 text-gray-500 font-bold">📊</div>
    <span>{title}</span>
  </div>
);

export const Select = ({ label, options = [], value, onChange, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>}
    <select
      value={value}
      onChange={onChange}
      className={`h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none ${className}`}
      {...props}
    >
      {options.map((opt, idx) => (
        <option key={idx} value={opt.value || opt}>{opt.label || opt}</option>
      ))}
    </select>
  </div>
);

export const Dropdown = Select;

export const Textarea = ({ label, value, onChange, placeholder, rows = 3, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>}
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full rounded-lg border border-gray-200 bg-white p-2.5 text-xs text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none ${className}`}
      {...props}
    />
  </div>
);

export const DatePicker = ({ label, value, onChange }) => (
  <div className="w-full">
    {label && <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>}
    <input
      type="date"
      value={value}
      onChange={onChange}
      className="h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>
);

export const ActionMenu = () => (
  <div className="relative inline-block text-left">
    <button className="p-1 text-gray-400 hover:text-gray-600 rounded font-bold">•••</button>
  </div>
);

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg font-bold">×</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export const ConfirmModal = Modal;
export const ConfirmationModal = Modal;
export const Drawer = Modal;

export const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
    <input type="checkbox" checked={checked} onChange={onChange} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
    {label}
  </label>
);

export const Radio = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
    <input type="radio" checked={checked} onChange={onChange} className="text-blue-600 focus:ring-blue-500" />
    {label}
  </label>
);

export const Switch = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange && onChange(!checked)}
    className={`w-9 h-5 flex items-center rounded-full p-0.5 transition ${checked ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'}`}
  >
    <div className="w-4 h-4 rounded-full bg-white shadow-md" />
  </button>
);

export const ToggleSwitch = Switch;

export const Avatar = ({ name = 'U', src }) => (
  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
    {src ? <img src={src} alt={name} className="w-full h-full rounded-full object-cover" /> : name.slice(0, 2).toUpperCase()}
  </div>
);

export const AvatarGroup = ({ children }) => (
  <div className="flex -space-x-2 overflow-hidden">{children}</div>
);

export const Tabs = ({ tabs = [], activeTab, onChange }) => (
  <div className="flex border-b border-gray-200 gap-4 text-xs font-semibold">
    {tabs.map((tab, idx) => (
      <button
        key={idx}
        onClick={() => onChange(tab.id || tab)}
        className={`pb-2 border-b-2 transition ${activeTab === (tab.id || tab) ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
      >
        {tab.label || tab}
      </button>
    ))}
  </div>
);

export const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="h-9 px-3 border border-gray-200 rounded-lg text-xs w-full bg-white focus:ring-2 focus:ring-blue-500 outline-none"
  />
);

export const FilterBar = ({ children }) => (
  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-3">{children}</div>
);

export const BreadcrumbItem = ({ children }) => (
  <span className="text-xs text-gray-500">{children}</span>
);

export const Toast = ({ message }) => (
  <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg text-xs shadow-lg">
    {message}
  </div>
);

export const Spinner = () => (
  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
);

export const LoadingSpinner = Spinner;

export const Skeleton = ({ className = 'h-4 w-full' }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

export const SkeletonCard = () => <Skeleton className="h-32 w-full rounded-xl" />;
export const SkeletonTable = () => <Skeleton className="h-64 w-full rounded-xl" />;
export const ChartContainer = ({ children }) => <div className="p-4 bg-white rounded-xl border">{children}</div>;
export const Pagination = () => <div className="text-xs text-gray-500">Page 1 of 1</div>;

export * from './forms';
export * from './navigation';
export * from './feedback';
export * from './data';
