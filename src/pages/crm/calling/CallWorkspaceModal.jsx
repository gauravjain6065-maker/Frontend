import React, { useState } from 'react';
import { X, PhoneCall, PhoneOff, Calendar, CheckCircle2, AlertCircle, Clock, Volume2, Save, FileText } from 'lucide-react';

export default function CallWorkspaceModal({ lead, isOpen, onClose, onSaveDisposition }) {
  const [callNotes, setCallNotes] = useState('');
  const [disposition, setDisposition] = useState('');
  const [followUpDate, setFollowUpDate] = useState('2026-08-15');
  const [callDuration, setCallDuration] = useState('02:45');
  const [showDatePicker, setShowDatePicker] = useState(false);

  if (!isOpen || !lead) return null;

  const handleDispositionClick = (type) => {
    setDisposition(type);
    if (type === 'Call Back Later') {
      setShowDatePicker(true);
    } else {
      setShowDatePicker(false);
    }
  };

  const handleSave = () => {
    let nextStatus = lead.status;
    if (disposition === 'Interested') nextStatus = 'Qualified';
    else if (disposition === 'Not Interested') nextStatus = 'Lost';
    else if (disposition === 'Call Back Later') nextStatus = 'Call Back Later';

    onSaveDisposition({
      leadId: lead.id,
      disposition,
      status: nextStatus,
      notes: callNotes,
      followUpDate: disposition === 'Call Back Later' ? followUpDate : null
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center shadow-lg shadow-green-600/30">
              <PhoneCall className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight flex items-center gap-2">
                Caller Workspace: {lead.name}
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Active Call Session ({callDuration}) • {lead.company}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6">
          {/* Lead Quick Details Grid */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs">
            <div>
              <span className="text-gray-400 font-medium block">Phone Number</span>
              <span className="font-bold text-gray-900 text-sm font-mono">{lead.phone || '+1 (555) 000-0000'}</span>
            </div>
            <div>
              <span className="text-gray-400 font-medium block">Email Address</span>
              <span className="font-semibold text-gray-800 truncate block">{lead.email || 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-400 font-medium block">Current Status</span>
              <span className="font-bold text-blue-600 uppercase tracking-wide text-[11px]">{lead.status}</span>
            </div>
          </div>

          {/* Disposition Buttons Section */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
              Call Disposition <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => handleDispositionClick('Interested')}
                className={`p-3 rounded-xl border font-bold text-xs flex flex-col items-center gap-2 transition cursor-pointer ${
                  disposition === 'Interested'
                    ? 'bg-green-600 text-white border-green-600 shadow-md shadow-green-600/30'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-green-400 hover:bg-green-50'
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Interested (Qualified)</span>
              </button>

              <button
                type="button"
                onClick={() => handleDispositionClick('Not Interested')}
                className={`p-3 rounded-xl border font-bold text-xs flex flex-col items-center gap-2 transition cursor-pointer ${
                  disposition === 'Not Interested'
                    ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/30'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-red-400 hover:bg-red-50'
                }`}
              >
                <AlertCircle className="w-5 h-5" />
                <span>Not Interested (Lost)</span>
              </button>

              <button
                type="button"
                onClick={() => handleDispositionClick('Call Back Later')}
                className={`p-3 rounded-xl border font-bold text-xs flex flex-col items-center gap-2 transition cursor-pointer ${
                  disposition === 'Call Back Later'
                    ? 'bg-yellow-500 text-white border-yellow-500 shadow-md shadow-yellow-500/30'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-yellow-400 hover:bg-yellow-50'
                }`}
              >
                <Clock className="w-5 h-5" />
                <span>Call Back Later</span>
              </button>

              <button
                type="button"
                onClick={() => handleDispositionClick('Voicemail')}
                className={`p-3 rounded-xl border font-bold text-xs flex flex-col items-center gap-2 transition cursor-pointer ${
                  disposition === 'Voicemail'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <Volume2 className="w-5 h-5" />
                <span>Left Voicemail</span>
              </button>
            </div>
          </div>

          {/* Date Picker if "Call Back Later" is selected */}
          {showDatePicker && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="font-bold text-yellow-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-yellow-600" /> Select Follow-up Date & Time:
              </span>
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="bg-white border border-yellow-300 rounded-lg px-3 py-1.5 font-semibold text-gray-800 outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          )}

          {/* Call Notes Textarea */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-600" /> Call Notes & Summary
            </label>
            <textarea
              rows={4}
              value={callNotes}
              onChange={(e) => setCallNotes(e.target.value)}
              placeholder="Enter detailed call conversation summary, client requirements, objections, or next steps..."
              className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-semibold text-xs hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel Session
          </button>

          <button
            type="button"
            disabled={!disposition}
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs transition flex items-center gap-2 shadow-md shadow-blue-600/30 cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save Disposition & Log Call
          </button>
        </div>
      </div>
    </div>
  );
}
