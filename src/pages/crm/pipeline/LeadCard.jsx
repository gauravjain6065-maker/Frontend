import React from 'react';
import { Phone, Building2, User, Flame, Clock } from 'lucide-react';

export default function LeadCard({ lead, onCallLead, onSelectLead }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Hot':
        return <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Flame className="w-3 h-3 fill-red-500 text-red-500" /> Hot</span>;
      case 'Qualified':
        return <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Qualified</span>;
      case 'Proposal':
        return <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Proposal</span>;
      case 'Contacted':
        return <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Contacted</span>;
      case 'Call Back Later':
        return <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Clock className="w-3 h-3" /> Call Back</span>;
      case 'Lost':
        return <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full">Lost</span>;
      default:
        return <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">New</span>;
    }
  };

  return (
    <div 
      className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs hover:shadow-md transition-all group relative cursor-pointer flex flex-col gap-2.5"
      onClick={() => onSelectLead && onSelectLead(lead)}
    >
      {/* Header Row: Name & Status */}
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors truncate">
          {lead.name}
        </h4>
        {getStatusBadge(lead.status)}
      </div>

      {/* Company Name */}
      <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
        <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        <span className="truncate">{lead.company}</span>
      </div>

      {/* Value & Score */}
      <div className="flex items-center justify-between pt-1 text-xs">
        <span className="font-bold text-gray-900">{lead.value || '$0'}</span>
        {lead.score && (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
            Score: {lead.score}
          </span>
        )}
      </div>

      {/* Footer: Phone Number & Call Action Button */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
        <span className="text-gray-500 font-mono text-[11px] truncate max-w-[130px]">
          {lead.phone || 'No phone'}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onCallLead) onCallLead(lead);
          }}
          className="p-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-600 hover:text-white transition-all shadow-2xs flex items-center gap-1 font-semibold text-[11px] cursor-pointer"
          title="Open Caller Workspace"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call</span>
        </button>
      </div>
    </div>
  );
}
