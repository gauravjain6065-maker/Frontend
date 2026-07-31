import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Building2, ChevronRight, Eye, Edit, Trash, X } from 'lucide-react';

const OrganizationsPage = () => {
  const navigate = useNavigate();

  const [orgs, setOrgs] = useState([
    { id: 1, name: 'Acme Corp', industry: 'Technology', employees: '250-500', leads: 4, contact: 'Sarah Jenkins' },
    { id: 2, name: 'TechStart Inc', industry: 'Software', employees: '50-100', leads: 2, contact: 'Mike Ross' },
    { id: 3, name: 'Nexus Software', industry: 'Fintech', employees: '100-250', leads: 6, contact: 'David Miller' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', industry: 'Technology', employees: '10-50', contact: '' });

  const filteredOrgs = orgs.filter(o => 
    o.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Delete this organization?')) {
      setOrgs(orgs.filter(o => o.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    const newOrg = { id: Date.now(), ...formData, leads: 0 };
    setOrgs([newOrg, ...orgs]);
    setShowModal(false);
    setFormData({ name: '', industry: 'Technology', employees: '10-50', contact: '' });
  };

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
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition text-sm font-medium flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Organization
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-5">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search organization by name or industry..." 
            className="h-10 w-full rounded-lg border border-gray-300 px-3 pl-9 text-sm focus:ring-2 focus:ring-blue-500" 
          />
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
              {filteredOrgs.length > 0 ? (
                filteredOrgs.map((org) => (
                  <tr key={org.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 font-semibold text-gray-900 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-600" /> {org.name}
                    </td>
                    <td className="p-4 text-gray-700">{org.industry}</td>
                    <td className="p-4 text-gray-700">{org.employees}</td>
                    <td className="p-4 font-medium text-blue-600">{org.leads} leads</td>
                    <td className="p-4 text-gray-700">{org.contact}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => navigate('/crm/organizations/details')} className="p-1.5 text-gray-500 hover:text-blue-600 rounded hover:bg-slate-100">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(org.id)} className="p-1.5 text-gray-500 hover:text-red-600 rounded hover:bg-slate-100">
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">No organizations found matching search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-gray-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-md p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Add New Organization</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Company Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Acme Corp" 
                  className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Industry</label>
                  <input 
                    type="text" 
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="e.g. Technology" 
                    className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Primary Contact</label>
                  <input 
                    type="text" 
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="e.g. Sarah Jenkins" 
                    className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
                <button type="button" onClick={() => setShowModal(false)} className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Add Organization</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationsPage;
