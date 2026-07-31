import React from 'react';
import { Search, Filter, Plus, Building2, Users, ChevronRight, Eye, Edit, Trash } from 'lucide-react';

const OrganizationsPage = () => {
  const orgs = [
    { id: 1, name: 'Acme Corp', industry: 'Technology', employees: '250-500', leads: 4, contact: 'Sarah Jenkins' },
    { id: 2, name: 'TechStart Inc', industry: 'Software', employees: '50-100', leads: 2, contact: 'Mike Ross' },
    { id: 3, name: 'Nexus Software', industry: 'Fintech', employees: '100-250', leads: 6, contact: 'David Miller' },
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans flex flex-col gap-6">
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <span>CRM</span> <ChevronRight className="w-3 h-3 text-gray-400" /> <span className="font-medium text-gray-800">Organizations</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Organizations</h1>
          <p className="text-sm text-gray-700 mt-1">Manage client companies and account profiles.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition text-sm font-medium flex items-center gap-2 self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Add Organization
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input type="text" placeholder="Search organization..." className="h-10 w-full rounded-lg border border-gray-300 px-3 pl-9 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-gray-500 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="p-4">Company Name</th>
                <th className="p-4">Industry</th>
                <th className="p-4">Employees</th>
                <th className="p-4">Leads Count</th>
                <th className="p-4">Primary Contact</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {orgs.map((org) => (
                <tr key={org.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-semibold text-gray-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" /> {org.name}
                  </td>
                  <td className="p-4 text-gray-700">{org.industry}</td>
                  <td className="p-4 text-gray-700">{org.employees}</td>
                  <td className="p-4 font-medium text-blue-600">{org.leads} leads</td>
                  <td className="p-4 text-gray-700">{org.contact}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-500 hover:text-blue-600 rounded hover:bg-slate-100"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-500 hover:text-amber-600 rounded hover:bg-slate-100"><Edit className="w-4 h-4" /></button>
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

export default OrganizationsPage;
