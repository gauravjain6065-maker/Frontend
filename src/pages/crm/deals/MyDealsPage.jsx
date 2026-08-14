import React, { useState } from 'react';
import { DollarSign, TrendingUp, Calendar, ChevronRight, Plus, CheckCircle, XCircle, Search, Filter } from 'lucide-react';
import { getDeals, saveDeals } from '../../../mock/deals/mockDeals';

export default function MyDealsPage() {
  const [deals, setDeals] = useState(getDeals());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.deal_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          deal.lead.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || deal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalWonRevenue = deals.filter(d => d.status === 'Won').reduce((acc, d) => acc + d.value, 0);
  const totalOpenValue = deals.filter(d => d.status === 'Open').reduce((acc, d) => acc + d.value, 0);

  const handleStatusChange = (dealId, newStatus) => {
    const updated = deals.map(d => d.id === dealId ? { ...d, status: newStatus } : d);
    setDeals(updated);
    saveDeals(updated);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <span>CRM</span> <ChevronRight className="w-3 h-3 text-gray-400" /> <span className="font-medium text-gray-800">My Deals & Revenue Pipeline</span>
      </nav>

      {/* Header & KPI Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Deals & Revenue Forecasting</h1>
          <p className="text-sm text-gray-600 mt-1">Track high-value converted sales opportunities and closed revenue deals.</p>
        </div>
      </div>

      {/* Revenue KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Total Closed Won</span>
            <h3 className="text-2xl font-black text-green-600 mt-1">${totalWonRevenue.toLocaleString()}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center font-bold">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Open Pipeline Value</span>
            <h3 className="text-2xl font-black text-blue-600 mt-1">${totalOpenValue.toLocaleString()}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Active Deals Count</span>
            <h3 className="text-2xl font-black text-gray-900 mt-1">{deals.length}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Calendar className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search deals by name or lead..." 
            className="h-10 w-full rounded-lg border border-gray-300 px-3 pl-9 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
          <Filter className="w-4 h-4 text-blue-600" /> Filter:
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="Won">Won 🎉</option>
            <option value="Lost">Lost</option>
          </select>
        </div>
      </div>

      {/* Deals Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 overflow-hidden">
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-slate-50 text-xs font-bold uppercase text-gray-500 border-b border-gray-200">
              <tr>
                <th className="p-4">Deal Name</th>
                <th className="p-4">Lead Organization</th>
                <th className="p-4">Deal Value</th>
                <th className="p-4">Win Probability</th>
                <th className="p-4">Expected Close Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredDeals.length > 0 ? (
                filteredDeals.map(deal => (
                  <tr key={deal.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 font-bold text-gray-900">{deal.deal_name}</td>
                    <td className="p-4 text-gray-700 font-semibold">{deal.lead}</td>
                    <td className="p-4 font-black text-gray-900">${deal.value.toLocaleString()}</td>
                    <td className="p-4">
                      <span className="bg-purple-50 text-purple-700 font-bold px-2 py-1 rounded text-xs">
                        {deal.probability}%
                      </span>
                    </td>
                    <td className="p-4 font-mono text-xs text-gray-600">{deal.expected_close_date}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
                        deal.status === 'Won' ? 'bg-green-100 text-green-800' : deal.status === 'Lost' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {deal.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {deal.status === 'Open' ? (
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleStatusChange(deal.id, 'Won')}
                            className="p-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-600 hover:text-white transition font-bold text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <CheckCircle className="w-3.5 h-3.5" /> Mark Won
                          </button>
                          <button
                            onClick={() => handleStatusChange(deal.id, 'Lost')}
                            className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-600 hover:text-white transition font-bold text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Mark Lost
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 font-medium">Closed</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500 font-medium">
                    No deals found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
