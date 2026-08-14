import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, DollarSign, Flame, Award, ArrowLeft, PhoneCall } from 'lucide-react';
import { managerService } from '../../../services/managerService';
import { getEmployees } from '../../../mock/employees/mockEmployees';

export default function ManagerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manager, setManager] = useState(null);
  const [loading, setLoading] = useState(true);
  const allEmployees = getEmployees();

  useEffect(() => {
    const fetchManager = async () => {
      try {
        setLoading(true);
        const data = await managerService.getById(id || 'm-1');
        setManager(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchManager();
  }, [id]);

  if (loading || !manager) {
    return (
      <div className="p-8 text-center bg-slate-50 min-h-screen flex items-center justify-center font-sans">
        <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Filter telecallers reporting to this manager
  const teamMembers = allEmployees.filter(
    e => e.manager_id === manager.id || e.manager.toLowerCase().includes(manager.name.split(' ')[0].toLowerCase())
  );

  const teamRevenue = teamMembers.reduce((sum, e) => sum + (e.revenue_generated || 0), 0) || 1240000;
  const teamHotLeads = teamMembers.reduce((sum, e) => sum + (e.hot_leads_handled || 0), 0) || 28;
  const teamCalls = teamMembers.reduce((sum, e) => sum + (e.calls_made || 0), 0) || 162;

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans flex flex-col gap-6">
      {/* Back link */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/admin/managers')}
          className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-blue-600 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Managers Directory
        </button>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800">
          Department: {manager.department || 'Sales Ops'}
        </span>
      </div>

      {/* Header Profile Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-purple-600 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-purple-600/30">
            {manager.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{manager.name} (Team Overview)</h1>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Regional Sales Manager • Direct Reports: <strong className="text-gray-900">{teamMembers.length} Telecallers</strong>
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-600 mt-2">
              <span>Email: <strong className="text-gray-900">{manager.email}</strong></span>
              <span>Phone: <strong className="text-gray-900">{manager.phone}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Aggregated Team KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Total Team Revenue</span>
            <h3 className="text-2xl font-black text-green-600 mt-1">${teamRevenue.toLocaleString()}</h3>
            <span className="text-[11px] font-semibold text-green-600 mt-1 inline-block">114% of monthly target</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center font-bold">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Team Hot Leads</span>
            <h3 className="text-2xl font-black text-red-600 mt-1">{teamHotLeads}</h3>
            <span className="text-[11px] font-semibold text-red-600 mt-1 inline-block">High conversion priority</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
            <Flame className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Avg Conversion Rate</span>
            <h3 className="text-2xl font-black text-purple-600 mt-1">34.5%</h3>
            <span className="text-[11px] font-semibold text-purple-600 mt-1 inline-block">Top performing division</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Telecallers under Manager Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" /> Telecallers Under {manager.name}
        </h2>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-slate-50 text-xs font-bold uppercase text-gray-500 border-b border-gray-200">
              <tr>
                <th className="p-4">Telecaller Name</th>
                <th className="p-4">Role Title</th>
                <th className="p-4">Calls Made</th>
                <th className="p-4">Hot Leads</th>
                <th className="p-4">Closed Deals</th>
                <th className="p-4">Revenue Generated</th>
                <th className="p-4 text-right">View Stats</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {teamMembers.length > 0 ? (
                teamMembers.map(emp => (
                  <tr key={emp.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 font-bold text-gray-900">
                      <div>{emp.name}</div>
                      <div className="text-xs text-gray-400 font-normal">{emp.email}</div>
                    </td>
                    <td className="p-4 text-gray-600 font-medium">{emp.role}</td>
                    <td className="p-4 font-bold text-blue-600 flex items-center gap-1">
                      <PhoneCall className="w-3.5 h-3.5" /> {emp.calls_made || 42}
                    </td>
                    <td className="p-4 font-bold text-red-600">{emp.hot_leads_handled || 8}</td>
                    <td className="p-4 font-bold text-purple-700">{emp.closedDeals || 6}</td>
                    <td className="p-4 font-black text-green-600">
                      ${(emp.revenue_generated || 280000).toLocaleString()}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => navigate(`/admin/employees/${emp.id}`)}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 font-bold text-xs transition cursor-pointer"
                      >
                        Performance Dashboard
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500 font-medium">
                    No telecallers assigned under this manager.
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
