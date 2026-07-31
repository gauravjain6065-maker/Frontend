import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { Button } from './Button';

export function Table({
  columns = [],
  data = [],
  searchPlaceholder = 'Search...',
  onSearch,
  filters,
  sortOptions,
  actions,
  totalItems,
  onViewRow,
  onEditRow,
  onDeleteRow,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  let filteredData = data.filter((row) =>
    Object.values(row).some(
      (val) =>
        val &&
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Table Controls Header */}
      <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder={searchPlaceholder}
            className="h-10 w-full pl-9 pr-3 rounded-lg border border-gray-300 text-sm text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {filters && (
            <Button
              variant="secondary"
              size="sm"
              icon={Filter}
              onClick={() => alert('Filter options: Click any column header or search to narrow down records.')}
            >
              Filter
            </Button>
          )}
          {sortOptions && (
            <Button
              variant="secondary"
              size="sm"
              icon={ArrowUpDown}
              onClick={() => setSortAsc(!sortAsc)}
            >
              Sort {sortAsc ? 'A-Z' : 'Z-A'}
            </Button>
          )}
          {actions}
        </div>
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto max-h-[550px] overflow-y-auto">
        <table className="w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-50 text-gray-700 font-semibold sticky top-0 border-b border-gray-200 z-10 shadow-xs">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-3.5 whitespace-nowrap">
                  {col.header}
                </th>
              ))}
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.length > 0 ? (
              filteredData.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-gray-50/80 transition-colors">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-6 py-4 whitespace-nowrap">
                      {col.render ? col.render(row) : row[col.accessorKey]}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right whitespace-nowrap relative">
                    <button
                      onClick={() =>
                        setActiveDropdown(activeDropdown === rowIdx ? null : rowIdx)
                      }
                      className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {activeDropdown === rowIdx && (
                      <div className="absolute right-6 top-10 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 text-left">
                        <button
                          onClick={() => {
                            setActiveDropdown(null);
                            if (onViewRow) onViewRow(row);
                          }}
                          className="w-full px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer text-left font-medium"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            setActiveDropdown(null);
                            if (onEditRow) onEditRow(row);
                          }}
                          className="w-full px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer text-left font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setActiveDropdown(null);
                            if (onDeleteRow) onDeleteRow(row);
                          }}
                          className="w-full px-4 py-2 text-xs text-red-600 hover:bg-red-50 cursor-pointer text-left font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-8 text-center text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 bg-gray-50/50">
        <div>
          Showing <span className="font-semibold text-gray-700">1</span> to{' '}
          <span className="font-semibold text-gray-700">{filteredData.length}</span> of{' '}
          <span className="font-semibold text-gray-700">{totalItems || filteredData.length}</span> results
        </div>
        <div className="flex items-center gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="p-1.5 rounded-lg border border-gray-300 hover:bg-white disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-3 py-1 font-medium text-gray-700">Page {currentPage}</span>
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-1.5 rounded-lg border border-gray-300 hover:bg-white cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
