import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, Eye, Edit, Trash, ChevronRight, Building2, X } from 'lucide-react';

const MyLeadsPage = () => {
  const navigate = useNavigate();

  const [leads, setLeads] = useState([
    { id: 1, name: 'Sarah Jenkins', org: 'Acme Corp', email: 'sarah@acme.com', phone: '+1 (555) 234-5678', status: 'New', priority: 'High', date: '2026-07-28' },
    { id: 2, name: 'Mike Ross', org: 'TechStart Inc', email: 'mike@techstart.io', phone: '+1 (555) 987-6543', status: 'Contacted', priority: 'Medium', date: '2026-07-26' },
    { id: 3, name: 'David Miller', org: 'Nexus Software', email: 'david@nexus.com', phone: '+1 (555) 345-6789', status: 'Qualified', priority: 'High', date: '2026-07-25' },
    { id: 4, name: 'Emily Blunt', org: 'Apex Health', email: 'emily@apexhealth.com', phone: '+1 (555) 876-5432', status: 'Negotiation', priority: 'Low', date: '2026-07-20' },
    { id: 5, name: 'Robert Fox', org: 'Vanguard Retail', email: 'robert@vanguard.com', phone: '+1 (555) 456-7890', status: 'Won', priority: 'High', date: '2026-07-15' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  
  // Form State for Add/Edit
  const [formData, setFormData] = useState({
    name: '',
    org: '',
    email: '',
    phone: '',
    status: 'New',
    priority: 'Medium'
  });

  const [editingId, setEditingId] = useState(null);

  // Filtered leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.org.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads(leads.filter(l => l.id !== id));
    }
  };

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({ name: '', org: '', email: '', phone: '', status: 'New', priority: 'Medium' });
    setShowModal(true);
  };

  const handleOpenEditModal = (lead) => {
    setEditingId(lead.id);
    setFormData({
      name: lead.name,
      org: lead.org,
      email: lead.email,
      phone: lead.phone,
      status: lead.status,
      priority: lead.priority
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.org) return;

    if (editingId) {
      setLeads(leads.map(l => l.id === editingId ? { ...l, ...formData } : l));
    } else {
      const newLead = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString().split('T')[0]
      };
      setLeads([newLead, ...leads]);
    }
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <span>CRM</span> <ChevronRight className="w-3 h-3 text-gray-400" /> <span className="font-medium text-gray-800">My Leads</span>
      </nav>

      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Leads</h1>
          <p className="text-sm text-gray-700 mt-1">Manage and track your assigned lead prospects.</p>
        </div>
        <button 
          onClick={handleOpenAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition text-sm font-medium flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Lead
        </button>
      </div>

      {/* Main Card */}
      <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-5">
        {/* Search & Filter bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads by name, company, email..." 
              className="h-10 w-full rounded-lg border border-gray-300 px-3 pl-9 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Won">Won</option>
            </select>
          </div>
        </div>

        {/* Leads Table */}
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
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 font-medium text-gray-900">
                      <div>{lead.name}</div>
                      <div className="text-xs text-gray-500">{lead.email}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-gray-800 font-medium">
                        <Building2 className="w-4 h-4 text-blue-600" /> {lead.org}
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
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          onClick={() => navigate('/crm/leads/details')}
                          className="p-1.5 text-gray-500 hover:text-blue-600 rounded hover:bg-slate-100"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleOpenEditModal(lead)}
                          className="p-1.5 text-gray-500 hover:text-amber-600 rounded hover:bg-slate-100"
                          title="Edit Lead"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(lead.id)}
                          className="p-1.5 text-gray-500 hover:text-red-600 rounded hover:bg-slate-100"
                          title="Delete Lead"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No leads found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-gray-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-md p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{editingId ? 'Edit Lead' : 'Add New Lead'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Contact Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins" 
                  className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Organization Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.org}
                  onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                  placeholder="e.g. Acme Corp" 
                  className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Email</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@company.com" 
                    className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Phone</label>
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000" 
                    className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Won">Won</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Priority</label>
                  <select 
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
                <button type="button" onClick={() => setShowModal(false)} className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  {editingId ? 'Save Changes' : 'Create Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLeadsPage;
