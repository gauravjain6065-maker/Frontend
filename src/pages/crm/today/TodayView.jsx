import React, { useState } from 'react';
import { Calendar, Clock, Flame, PhoneCall, CheckCircle2, ChevronRight, Filter, AlertTriangle } from 'lucide-react';
import { getLeads, saveLeads } from '../../../mock/leads/mockLeads';
import CallWorkspaceModal from '../calling/CallWorkspaceModal';

export default function TodayView() {
  const [leads, setLeads] = useState(getLeads());
  const [activeCallingLead, setActiveCallingLead] = useState(null);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Filter leads for today's queue
  const todayDateStr = new Date().toISOString().split('T')[0]; // "2026-08-14"
  
  const todayQueue = leads.filter((lead) => {
    const isTodayFollowUp = lead.follow_up_date === todayDateStr || lead.follow_up_date === '2026-08-14';
    const isCallBackLater = lead.status === 'Call Back Later' || lead.status === 'Hot';
    const matchesPriority = priorityFilter === 'All' || lead.priority === priorityFilter;

    return (isTodayFollowUp || isCallBackLater) && matchesPriority;
  });

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

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <span>CRM</span> <ChevronRight className="w-3 h-3 text-gray-400" /> <span className="font-medium text-gray-800">My Day - Today's Queue</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">
            <Clock className="w-4 h-4 text-blue-400" /> Priority Calling Queue
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Today's Sales Execution Queue</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Focus on high-priority call backs, scheduled follow-ups, and hot prospects for today.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 shrink-0">
          <div className="text-right">
            <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider block">Remaining Calls</span>
            <span className="text-2xl font-black text-white">{todayQueue.length}</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-600/30">
            <PhoneCall className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Priority Filter & Stats bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
          <Filter className="w-4 h-4 text-blue-600" /> Filter Queue by Priority:
          <div className="flex items-center gap-1.5 ml-2">
            {['All', 'High', 'Medium', 'Low'].map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  priorityFilter === p ? 'bg-blue-600 text-white shadow-2xs' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-gray-500 font-medium">
          Showing <span className="font-bold text-gray-900">{todayQueue.length}</span> actionable leads for today
        </div>
      </div>

      {/* Priority Leads Queue List */}
      <div className="flex flex-col gap-4">
        {todayQueue.length > 0 ? (
          todayQueue.map((lead, idx) => (
            <div 
              key={lead.id} 
              className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden group"
            >
              {/* Left Rank Border Indicator */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                lead.priority === 'High' ? 'bg-red-500' : lead.priority === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'
              }`} />

              <div className="flex items-center gap-4 pl-2">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-extrabold text-sm flex items-center justify-center shrink-0">
                  #{idx + 1}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900 text-base group-hover:text-blue-600 transition-colors">
                      {lead.name}
                    </h3>
                    <span className="text-xs text-gray-500 font-semibold">• {lead.company}</span>
                    {lead.status === 'Hot' && (
                      <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Flame className="w-3 h-3 fill-red-500 text-red-500" /> Hot Lead
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                    <span>Phone: <strong className="text-gray-900 font-mono">{lead.phone || 'N/A'}</strong></span>
                    <span>Lead Score: <strong className="text-blue-600">{lead.score || 85}</strong></span>
                    <span>Value: <strong className="text-green-700 font-bold">{lead.value || '$50,000'}</strong></span>
                  </div>
                </div>
              </div>

              {/* Center/Right Priority & Action Button */}
              <div className="flex items-center gap-4 self-end md:self-auto">
                <div className="text-right hidden sm:block">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase block mb-1 ${
                    lead.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {lead.priority} Priority
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">Follow-up: Today</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenCallModal(lead)}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-green-600/30 flex items-center gap-2 transition cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" /> Start Call Workspace
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-12 text-center border border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center gap-2">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
            <h3 className="text-lg font-bold text-gray-800">You're all caught up for today! 🎉</h3>
            <p className="text-xs text-gray-500 max-w-md">No pending high-priority call backs or scheduled follow-ups remaining in your queue.</p>
          </div>
        )}
      </div>

      {/* Call Workspace Modal */}
      <CallWorkspaceModal
        lead={activeCallingLead}
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        onSaveDisposition={handleSaveDisposition}
      />
    </div>
  );
}
