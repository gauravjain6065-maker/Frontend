import React from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash, ChevronRight, Phone, Mail, Building2 } from 'lucide-react';

const MyLeadsPage = () => {
  const leads = [
    { id: 1, name: 'Sarah Jenkins', org: 'Acme Corp', email: 'sarah@acme.com', phone: '+1 (555) 234-5678', status: 'New', priority: 'High', date: '2026-07-28' },
    { id: 2, name: 'Mike Ross', org: 'TechStart Inc', email: 'mike@techstart.io', phone: '+1 (555) 987-6543', status: 'Contacted', priority: 'Medium', date: '2026-07-26' },
    { id: 3, name: 'David Miller', org: 'Nexus Software', email: 'david@nexus.com', phone: '+1 (555) 345-6789', status: 'Qualified', priority: 'High', date: '2026-07-25' },
    { id: 4, name: 'Emily Blunt', org: 'Apex Health', email: 'emily@apexhealth.com', phone: '+1 (555) 876-5432', status: 'Negotiation', priority: 'Low', date: '2026-07-20' },
    { id: 5, name: 'Robert Fox', org: 'Vanguard Retail', email: 'robert@vanguard.com', phone: '+1 (555) 456-7890', status: 'Won', priority: 'High', date: '2026-07-15' },
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans flex flex-col gap-6">
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <span>CRM</span> <ChevronRight className="w-3 h-3 text-gray-400" /> <span className="font-medium text-gray-800">My Leads</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Leads</h1>
          <p className="text-sm text-gray-700 mt-1">Manage and track your assigned lead prospects.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition text-sm font-medium flex items-center gap-2 self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Add Lead
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input type="text" placeholder="Search leads..." className="h-10 w-full rounded-lg border border-gray-300 px-3 pl-9 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="border border-gray-300 bg-white text-gray-700 rounded-lg px-4 py-2 transition text-sm flex items-center gap-2 hover:bg-gray-50">
              <Filter className="w-4 h-4" /> Filter Status
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-gray-500 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="p-4">Contact</th>
                <th className="p-4">Organization</th>
                <th className="p-4">Status</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Assigned Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-medium text-gray-900">
                    <div>{lead.name}</div>
                    <div className="text-xs text-gray-500">{lead.email}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-gray-800">
                      <Building2 className="w-4 h-4 text-gray-400" /> {lead.org}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      lead.status === 'New' ? 'bg-blue-100 text-blue-700' :
                      lead.status === 'Contacted' ? 'bg-amber-100 text-amber-700' :
                      lead.status === 'Qualified' ? 'bg-purple-100 text-purple-700' :
                      lead.status === 'Negotiation' ? 'bg-indigo-100 text-indigo-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-semibold ${
                      lead.priority === 'High' ? 'text-red-500' : lead.priority === 'Medium' ? 'text-amber-500' : 'text-gray-500'
                    }`}>
                      {lead.priority}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-gray-500">{lead.date}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-500 hover:text-blue-600 rounded hover:bg-slate-100"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-500 hover:text-amber-600 rounded hover:bg-slate-100"><Edit className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-500 hover:text-red-600 rounded hover:bg-slate-100"><Trash className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyLeadsPage;
