import React from 'react';
import { Search, Filter, Calendar, Clock, Phone, Mail, ChevronRight } from 'lucide-react';

const MyFollowupsPage = () => {
  const followups = [
    { id: 1, company: 'Nexus Software', contact: 'David Miller', time: '10:30 AM', type: 'Call', status: 'Pending', priority: 'High' },
    { id: 2, company: 'Apex Health Solutions', contact: 'Emily Blunt', time: '02:00 PM', type: 'Demo Meeting', status: 'Scheduled', priority: 'Medium' },
    { id: 3, company: 'Vanguard Retail', contact: 'Robert Fox', time: '04:30 PM', type: 'Email Follow-up', status: 'Pending', priority: 'Normal' },
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans flex flex-col gap-6">
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <span>CRM</span> <ChevronRight className="w-3 h-3 text-gray-400" /> <span className="font-medium text-gray-800">My Follow-ups</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Follow-ups</h1>
          <p className="text-sm text-gray-700 mt-1">Scheduled calls, meetings, and lead reminders.</p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {followups.map((item) => (
            <div key={item.id} className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{item.company}</h3>
                  <p className="text-xs text-gray-500">{item.contact}</p>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-blue-50 text-blue-700 rounded-full">{item.type}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700 mt-2">
                <Clock className="w-4 h-4 text-blue-600" /> <span>Scheduled: {item.time}</span>
              </div>
              <button className="w-full mt-2 border border-gray-300 bg-white text-gray-700 rounded-lg py-2 text-sm font-medium hover:bg-gray-50 transition">
                Start Follow-up
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyFollowupsPage;
