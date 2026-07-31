import React from 'react';
import { ChevronRight, Phone, Mail, Building2, Calendar, Clock, Edit, Trash, Plus, CheckCircle, FileText } from 'lucide-react';

const LeadDetailsPage = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans flex flex-col gap-6">
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <span>CRM</span> <ChevronRight className="w-3 h-3 text-gray-400" /> <span>Leads</span> <ChevronRight className="w-3 h-3 text-gray-400" /> <span className="font-medium text-gray-800">Sarah Jenkins</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sarah Jenkins</h1>
          <p className="text-sm text-gray-700 mt-1">VP of Technology at Acme Corp</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="border border-gray-300 bg-white text-gray-700 rounded-lg px-4 py-2 transition text-sm flex items-center gap-2 hover:bg-gray-50">
            <Edit className="w-4 h-4" /> Edit Lead
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition text-sm font-medium flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-gray-800 pb-3 border-b border-gray-100">Lead Summary</h2>
          <div className="flex flex-col gap-4 text-sm">
            <div><span className="text-xs text-gray-500 block">Status</span> <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mt-1 inline-block">Qualified</span></div>
            <div><span className="text-xs text-gray-500 block">Priority</span> <span className="text-red-500 font-semibold">High</span></div>
            <div><span className="text-xs text-gray-500 block">Email</span> <span className="text-gray-900 font-medium flex items-center gap-1.5 mt-0.5"><Mail className="w-4 h-4 text-gray-400" /> sarah@acme.com</span></div>
            <div><span className="text-xs text-gray-500 block">Phone</span> <span className="text-gray-900 font-medium flex items-center gap-1.5 mt-0.5"><Phone className="w-4 h-4 text-gray-400" /> +1 (555) 234-5678</span></div>
            <div><span className="text-xs text-gray-500 block">Organization</span> <span className="text-gray-900 font-medium flex items-center gap-1.5 mt-0.5"><Building2 className="w-4 h-4 text-gray-400" /> Acme Corp</span></div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-gray-800">Activity Timeline</h2>
            <div className="flex flex-col gap-4 border-l-2 border-gray-200 pl-4 py-2">
              <div className="relative">
                <span className="w-3 h-3 bg-blue-600 rounded-full absolute -left-[23px] top-1"></span>
                <p className="text-sm font-semibold text-gray-900">Discovery Call Completed</p>
                <p className="text-xs text-gray-500">Jul 28, 2026 at 10:30 AM</p>
                <p className="text-sm text-gray-700 mt-1">Discussed budget and implementation timeline. Sarah requested a demo next week.</p>
              </div>
              <div className="relative mt-2">
                <span className="w-3 h-3 bg-gray-300 rounded-full absolute -left-[23px] top-1"></span>
                <p className="text-sm font-semibold text-gray-900">Initial Email Sent</p>
                <p className="text-xs text-gray-500">Jul 25, 2026 at 02:15 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailsPage;
