import React from 'react';
import { ChevronRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const TaskDetailsPage = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans flex flex-col gap-6">
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <span>CRM</span> <ChevronRight className="w-3 h-3 text-gray-400" /> <span>Tasks</span> <ChevronRight className="w-3 h-3 text-gray-400" /> <span className="font-medium text-gray-800">Task Details</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Send revised contract to TechCorp</h1>
          <p className="text-sm text-gray-700 mt-1">Due Today, 5:00 PM • Priority: High</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 transition text-sm font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> Mark Complete
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-800">Task Description</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Review updated SLA clauses with legal team and send out the final PDF revision to Sarah at Acme Corp.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-4">Checklist</h3>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span>Verify revised SLA terms with legal</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span>Export PDF and send email</span>
            </label>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-800 pb-3 border-b border-gray-100">Metadata</h2>
          <div className="flex flex-col gap-3 text-sm">
            <div><span className="text-xs text-gray-500 block">Assigned By</span> <span className="font-medium text-gray-900">John Manager</span></div>
            <div><span className="text-xs text-gray-500 block">Related Lead</span> <span className="font-medium text-blue-600">TechStart Inc</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
