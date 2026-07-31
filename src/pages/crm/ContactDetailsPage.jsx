import React from 'react';
import { ChevronRight, Mail, Phone, Building2, Calendar, Clock, Edit } from 'lucide-react';

const ContactDetailsPage = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans flex flex-col gap-6">
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <span>CRM</span> <ChevronRight className="w-3 h-3 text-gray-400" /> <span>Contacts</span> <ChevronRight className="w-3 h-3 text-gray-400" /> <span className="font-medium text-gray-800">Sarah Jenkins</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sarah Jenkins</h1>
          <p className="text-sm text-gray-700 mt-1">VP of Technology at Acme Corp</p>
        </div>
        <button className="border border-gray-300 bg-white text-gray-700 rounded-lg px-4 py-2 transition text-sm flex items-center gap-2 hover:bg-gray-50">
          <Edit className="w-4 h-4" /> Edit Contact
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-800 pb-3 border-b border-gray-100">Personal Details</h2>
          <div className="flex flex-col gap-3 text-sm">
            <div><span className="text-xs text-gray-500 block">Email</span> <span className="text-gray-900 font-medium">sarah@acme.com</span></div>
            <div><span className="text-xs text-gray-500 block">Phone</span> <span className="text-gray-900 font-medium">+1 (555) 234-5678</span></div>
            <div><span className="text-xs text-gray-500 block">Organization</span> <span className="text-blue-600 font-medium">Acme Corp</span></div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Calls & Interaction History</h2>
            <div className="flex flex-col gap-3">
              <div className="p-3 border border-gray-100 rounded-lg bg-slate-50">
                <p className="text-sm font-semibold text-gray-900">Outgoing Phone Call</p>
                <p className="text-xs text-gray-500">Jul 28, 2026 • Duration: 14 mins</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsPage;
