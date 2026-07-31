import React from 'react';
import { ChevronRight, Building2, Users, MapPin, Mail, Phone, Briefcase, Plus } from 'lucide-react';

const OrganizationDetailsPage = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans flex flex-col gap-6">
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <span>CRM</span> <ChevronRight className="w-3 h-3 text-gray-400" /> <span>Organizations</span> <ChevronRight className="w-3 h-3 text-gray-400" /> <span className="font-medium text-gray-800">Acme Corp</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Acme Corp</h1>
          <p className="text-sm text-gray-700 mt-1">Enterprise Cloud & IT Solutions</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Related Lead
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-800 pb-3 border-b border-gray-100">Company Information</h2>
          <div className="flex flex-col gap-3 text-sm">
            <div><span className="text-xs text-gray-500 block">Industry</span> <span className="text-gray-900 font-medium">Technology</span></div>
            <div><span className="text-xs text-gray-500 block">Company Size</span> <span className="text-gray-900 font-medium">250 - 500 employees</span></div>
            <div><span className="text-xs text-gray-500 block">Location</span> <span className="text-gray-900 font-medium flex items-center gap-1 mt-1"><MapPin className="w-4 h-4 text-gray-400" /> San Francisco, CA</span></div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Contacts at Acme Corp</h2>
            <div className="flex flex-col gap-3">
              <div className="p-3 border border-gray-200 rounded-lg flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">Sarah Jenkins</h3>
                  <p className="text-xs text-gray-500">VP of Technology • sarah@acme.com</p>
                </div>
                <span className="text-xs font-medium text-blue-600 border border-blue-200 bg-blue-50 px-2.5 py-1 rounded-full">Primary Contact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetailsPage;
