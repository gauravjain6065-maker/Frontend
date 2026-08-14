import React, { useState } from 'react';
import { ChevronRight, Phone, Mail, Building2, Calendar, Clock, Edit, Trash, Plus, CheckCircle, FileText, PhoneCall, DollarSign, Award } from 'lucide-react';
import CallWorkspaceModal from './calling/CallWorkspaceModal';

const LeadDetailsPage = () => {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [dealConverted, setDealConverted] = useState(false);

  const sampleLead = {
    id: 'l-1',
    name: 'Sarah Jenkins',
    company: 'Acme Corp',
    phone: '+1 (555) 234-5678',
    email: 'sarah@acme.com',
    status: 'Qualified',
    priority: 'High',
    value: '$240,000',
    score: 92
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans flex flex-col gap-6">
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <span>CRM</span> <ChevronRight className="w-3 h-3 text-gray-400" /> <span>Leads</span> <ChevronRight className="w-3 h-3 text-gray-400" /> <span className="font-medium text-gray-800">Sarah Jenkins</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sarah Jenkins</h1>
          <p className="text-sm text-gray-600 mt-1">VP of Technology at Acme Corp</p>
        </div>
        <div className="flex items-center gap-3">
          {sampleLead.status === 'Qualified' && (
            <button 
              onClick={() => {
                setDealConverted(true);
                alert('Lead converted into a high-value Deal! Added to My Deals pipeline.');
              }}
              disabled={dealConverted}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white rounded-xl px-4 py-2 transition text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <DollarSign className="w-4 h-4" /> {dealConverted ? 'Converted to Deal ✓' : 'Convert to Deal'}
            </button>
          )}

          <button 
            onClick={() => setIsCallModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 py-2 transition text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" /> Start Call Workspace
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-6">
          <h2 className="text-xl font-bold text-gray-800 pb-3 border-b border-gray-100">Lead Summary</h2>
          <div className="flex flex-col gap-4 text-sm">
            <div><span className="text-xs text-gray-500 block">Status</span> <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 mt-1 inline-block">Qualified</span></div>
            <div><span className="text-xs text-gray-500 block">Priority</span> <span className="text-red-600 font-bold">High Priority</span></div>
            <div><span className="text-xs text-gray-500 block">Email</span> <span className="text-gray-900 font-medium flex items-center gap-1.5 mt-0.5"><Mail className="w-4 h-4 text-gray-400" /> sarah@acme.com</span></div>
            <div><span className="text-xs text-gray-500 block">Phone</span> <span className="text-gray-900 font-mono font-medium flex items-center gap-1.5 mt-0.5"><Phone className="w-4 h-4 text-gray-400" /> +1 (555) 234-5678</span></div>
            <div><span className="text-xs text-gray-500 block">Organization</span> <span className="text-gray-900 font-medium flex items-center gap-1.5 mt-0.5"><Building2 className="w-4 h-4 text-gray-400" /> Acme Corp</span></div>
            <div><span className="text-xs text-gray-500 block">Estimated Deal Value</span> <span className="text-green-700 font-black text-base">$240,000</span></div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-800">Activity Timeline</h2>
            <div className="flex flex-col gap-4 border-l-2 border-gray-200 pl-4 py-2">
              <div className="relative">
                <span className="w-3 h-3 bg-blue-600 rounded-full absolute -left-[23px] top-1"></span>
                <p className="text-sm font-semibold text-gray-900">Discovery Call Completed</p>
                <p className="text-xs text-gray-500">Aug 12, 2026 at 10:30 AM</p>
                <p className="text-sm text-gray-700 mt-1">Discussed budget and implementation timeline. Sarah requested a demo next week.</p>
              </div>
              <div className="relative mt-2">
                <span className="w-3 h-3 bg-gray-300 rounded-full absolute -left-[23px] top-1"></span>
                <p className="text-sm font-semibold text-gray-900">Initial Email Sent</p>
                <p className="text-xs text-gray-500">Aug 10, 2026 at 02:15 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call Workspace Modal */}
      <CallWorkspaceModal
        lead={sampleLead}
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        onSaveDisposition={(d) => alert(`Saved disposition: ${d.disposition}`)}
      />
    </div>
  );
};

export default LeadDetailsPage;
