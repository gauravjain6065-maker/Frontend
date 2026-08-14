import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Eye, Edit, Trash, ChevronRight, Building2, X, LayoutGrid, List, PhoneCall } from 'lucide-react';
import { getLeads, saveLeads } from '../../mock/leads/mockLeads';
import LeadBoard from './pipeline/LeadBoard';
import CallWorkspaceModal from './calling/CallWorkspaceModal';

const MyLeadsPage = () => {
  const navigate = useNavigate();

  const [leads, setLeads] = useState(getLeads());
  const [viewMode, setViewMode] = useState('board'); // 'list' or 'board'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Call Workspace Modal state
  const [activeCallingLead, setActiveCallingLead] = useState(null);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  // Add/Edit Modal State
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    status: 'New',
    priority: 'Medium',
    value: '$50,000'
  });
  const [editingId, setEditingId] = useState(null);

  // Filtered leads list
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (leadId, newStatus) => {
    const updated = leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l);
    setLeads(updated);
    saveLeads(updated);
  };

  const handleOpenCallModal = (lead) => {
    setActiveCallingLead(lead);
    setIsCallModalOpen(true);
  };

  const handleSaveDisposition = (dispositionData) => {
    const updated = leads.map(l => {
      if (l.id === dispositionData.leadId) {
        return {
          ...l,
          status: dispositionData.status,
          follow_up_date: dispositionData.followUpDate || l.follow_up_date,
          lastCallNote: dispositionData.notes
        };
      }
      return l;
    });
    setLeads(updated);
    saveLeads(updated);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      const updated = leads.filter(l => l.id !== id);
      setLeads(updated);
      saveLeads(updated);
    }
  };

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({ name: '', company: '', email: '', phone: '', status: 'New', priority: 'Medium', value: '$50,000' });
    setShowModal(true);
  };

  const handleOpenEditModal = (lead) => {
    setEditingId(lead.id);
    setFormData({
      name: lead.name,
      company: lead.company || lead.org || '',
      email: lead.email || '',
      phone: lead.phone || '',
      status: lead.status,
      priority: lead.priority || 'Medium',
      value: lead.value || '$50,000'
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.company) return;

    let updated;
    if (editingId) {
      updated = leads.map(l => l.id === editingId ? { ...l, ...formData } : l);
    } else {
      const newLead = {
        id: `l-${Date.now()}`,
        ...formData,
        dateCreated: new Date().toISOString().split('T')[0]
      };
      updated = [newLead, ...leads];
    }
    setLeads(updated);
    saveLeads(updated);
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <span>CRM</span> <ChevronRight className="w-3 h-3 text-gray-400" /> <span className="font-medium text-gray-800">My Leads & Pipeline</span>
      </nav>

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lead Pipeline & Sales Execution</h1>
          <p className="text-sm text-gray-600 mt-1">Manage prospects across Kanban pipeline stages or List view.</p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle Button */}
          <div className="bg-white border border-gray-200 rounded-xl p-1 flex items-center shadow-2xs">
            <button
              onClick={() => setViewMode('board')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === 'board' ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Kanban Board
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === 'list' ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="w-3.5 h-3.5" /> Table List
            </button>
          </div>

          <button 
            onClick={handleOpenAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2.5 transition text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add New Lead
          </button>
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
            placeholder="Search leads by name, company, email..." 
            className="h-10 w-full rounded-lg border border-gray-300 px-3 pl-9 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
          />
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal">Proposal</option>
            <option value="Hot">Hot 🔥</option>
            <option value="Call Back Later">Call Back Later 🕒</option>
            <option value="Lost">Lost</option>
          </select>
        </div>
      </div>

      {/* Main View Area (Kanban Board vs Table List) */}
      {viewMode === 'board' ? (
        <LeadBoard
          leads={filteredLeads}
          onStatusChange={handleStatusChange}
          onCallLead={handleOpenCallModal}
          onSelectLead={handleOpenEditModal}
        />
      ) : (
        <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6">
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="bg-slate-50 text-xs font-bold uppercase text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="p-4">Contact Name</th>
                  <th className="p-4">Company</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Value</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50 transition">
                      <td className="p-4 font-bold text-gray-900">
                        <div>{lead.name}</div>
                        <div className="text-xs text-gray-500 font-normal">{lead.email}</div>
                      </td>
                      <td className="p-4 font-semibold text-gray-800">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-blue-600 shrink-0" /> {lead.company}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                          {lead.status}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-xs">
                        <span className={lead.priority === 'High' ? 'text-red-600' : 'text-gray-600'}>
                          {lead.priority}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-gray-900">{lead.value || '$0'}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button 
                            onClick={() => handleOpenCallModal(lead)}
                            className="p-2 text-green-700 hover:bg-green-50 rounded-lg transition cursor-pointer"
                            title="Call Workspace"
                          >
                            <PhoneCall className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleOpenEditModal(lead)}
                            className="p-2 text-gray-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                            title="Edit Lead"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(lead.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
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
                    <td colSpan={6} className="p-8 text-center text-gray-500 font-medium">
                      No leads matching filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Caller Workspace Modal */}
      <CallWorkspaceModal
        lead={activeCallingLead}
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        onSaveDisposition={handleSaveDisposition}
      />

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
                  className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Company Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
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
                    className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Phone</label>
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                    className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm bg-white"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Hot">Hot 🔥</option>
                    <option value="Call Back Later">Call Back Later</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Priority</label>
                  <select 
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm bg-white"
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
