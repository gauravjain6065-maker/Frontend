import React from 'react';
import { ChevronRight, Phone, Mail, CheckCircle, Activity, Filter, Search } from 'lucide-react';

const ActivityTimelinePage = () => {
  const events = [
    { id: 1, type: 'call', title: 'Discovery Call Completed', desc: 'Completed a 15-min discovery call with Acme Corp (Sarah Jenkins)', time: 'Today at 10:30 AM', icon: <Phone className="w-4 h-4 text-blue-600" /> },
    { id: 2, type: 'email', title: 'Sent proposal quote', desc: 'Sent proposal quote to TechStart Inc (Mike Ross)', time: 'Today at 09:15 AM', icon: <Mail className="w-4 h-4 text-green-500" /> },
    { id: 3, type: 'task', title: 'Completed task', desc: 'Schedule Demo with GlobalLogistics', time: 'Yesterday at 04:00 PM', icon: <CheckCircle className="w-4 h-4 text-purple-500" /> }
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans flex flex-col gap-6">
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <span>CRM</span> <ChevronRight className="w-3 h-3 text-gray-400" /> <span className="font-medium text-gray-800">Activity Timeline</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activity Timeline</h1>
          <p className="text-sm text-gray-700 mt-1">Audit log of all calls, emails, updates, and interactions.</p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-4 border-l-2 border-blue-500 pl-6 ml-2">
          {events.map((e) => (
            <div key={e.id} className="relative pb-6 last:pb-0">
              <div className="absolute -left-[35px] top-0 p-1.5 rounded-full bg-white border border-gray-200 shadow-sm">
                {e.icon}
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{e.title}</h3>
              <p className="text-sm text-gray-700 mt-0.5">{e.desc}</p>
              <span className="text-xs text-gray-500 mt-1 block font-medium">{e.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityTimelinePage;
