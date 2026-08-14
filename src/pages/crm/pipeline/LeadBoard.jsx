import React from 'react';
import { DndContext, useDroppable, useDraggable } from '@dnd-kit/core';
import LeadCard from './LeadCard';

const COLUMNS = [
  { id: 'New', title: 'New Leads', color: 'border-blue-400 bg-blue-50/40 text-blue-700' },
  { id: 'Contacted', title: 'Contacted', color: 'border-amber-400 bg-amber-50/40 text-amber-700' },
  { id: 'Qualified', title: 'Qualified', color: 'border-purple-400 bg-purple-50/40 text-purple-700' },
  { id: 'Proposal', title: 'Proposal Sent', color: 'border-indigo-400 bg-indigo-50/40 text-indigo-700' },
  { id: 'Hot', title: 'Hot Leads 🔥', color: 'border-red-400 bg-red-50/40 text-red-700' },
  { id: 'Call Back Later', title: 'Call Back Later 🕒', color: 'border-yellow-400 bg-yellow-50/40 text-yellow-800' },
  { id: 'Lost', title: 'Lost', color: 'border-gray-300 bg-gray-50 text-gray-600' }
];

function DraggableLeadCard({ lead, onCallLead, onSelectLead, onStatusChange }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 50 : 1,
  } : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="touch-none">
      <div className="relative group">
        <LeadCard lead={lead} onCallLead={onCallLead} onSelectLead={onSelectLead} />
        
        {/* Quick status change dropdown for accessibility */}
        <div className="mt-1 px-1 flex items-center justify-between text-[10px] text-gray-400">
          <span>Move to:</span>
          <select
            value={lead.status}
            onChange={(e) => onStatusChange(lead.id, e.target.value)}
            className="text-[10px] bg-gray-100 hover:bg-gray-200 border-none rounded px-1 py-0.5 font-medium text-gray-700 outline-none cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            {COLUMNS.map(c => (
              <option key={c.id} value={c.id}>{c.id}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function KanbanColumn({ column, leads, onCallLead, onSelectLead, onStatusChange }) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div 
      ref={setNodeRef}
      className={`flex-1 min-w-[280px] max-w-[320px] rounded-xl border ${column.color.split(' ')[0]} bg-slate-50/70 p-3 flex flex-col gap-3 transition-colors ${isOver ? 'bg-blue-100/50 border-blue-500' : ''}`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between px-1 pb-1 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <h3 className={`font-extrabold text-xs tracking-wide uppercase ${column.color.split(' ')[2]}`}>
            {column.title}
          </h3>
          <span className="bg-white border border-gray-200 text-gray-700 font-bold text-[11px] px-2 py-0.5 rounded-full shadow-xs">
            {leads.length}
          </span>
        </div>
      </div>

      {/* Cards List */}
      <div className="flex flex-col gap-3 overflow-y-auto max-h-[70vh] pr-1">
        {leads.length > 0 ? (
          leads.map(lead => (
            <DraggableLeadCard
              key={lead.id}
              lead={lead}
              onCallLead={onCallLead}
              onSelectLead={onSelectLead}
              onStatusChange={onStatusChange}
            />
          ))
        ) : (
          <div className="p-6 text-center text-xs text-gray-400 border border-dashed border-gray-200 rounded-xl bg-white/50 font-medium">
            No leads in {column.id}
          </div>
        )}
      </div>
    </div>
  );
}

export default function LeadBoard({ leads = [], onStatusChange, onCallLead, onSelectLead }) {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const leadId = active.id;
      const newStatus = over.id; // column ID
      if (COLUMNS.some(c => c.id === newStatus)) {
        onStatusChange(leadId, newStatus);
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4 pt-1 items-start select-none">
        {COLUMNS.map(column => {
          const colLeads = leads.filter(l => l.status === column.id);
          return (
            <KanbanColumn
              key={column.id}
              column={column}
              leads={colLeads}
              onCallLead={onCallLead}
              onSelectLead={onSelectLead}
              onStatusChange={onStatusChange}
            />
          );
        })}
      </div>
    </DndContext>
  );
}
