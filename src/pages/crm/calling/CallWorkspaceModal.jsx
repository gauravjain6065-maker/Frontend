import React, { useState, useEffect } from 'react';
import { 
  X, 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Pause, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Volume2, 
  Save, 
  FileText, 
  Building2, 
  Mail, 
  Flame, 
  Sparkles, 
  Calendar,
  History,
  Tag,
  Activity
} from 'lucide-react';

export default function CallWorkspaceModal({ lead, isOpen, onClose, onSaveDisposition }) {
  const [callNotes, setCallNotes] = useState('');
  const [disposition, setDisposition] = useState('');
  const [followUpDate, setFollowUpDate] = useState('2026-08-15');
  const [followUpTime, setFollowUpTime] = useState('14:30');
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(165); // 02:45 initial
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Timer simulation
  useEffect(() => {
    if (!isOpen || isOnHold) return;
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isOnHold]);

  if (!isOpen || !lead) return null;

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleDispositionClick = (type) => {
    setDisposition(type);
    if (type === 'Call Back Later') {
      setShowDatePicker(true);
    } else {
      setShowDatePicker(false);
    }
  };

  const handleAddQuickTag = (tagText) => {
    setCallNotes((prev) => (prev ? `${prev} • ${tagText}` : tagText));
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
      followUpDate: disposition === 'Call Back Later' ? `${followUpDate} ${followUpTime}` : null
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#0B132B] text-slate-100 rounded-3xl shadow-2xl border border-slate-800/80 w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* ==========================================
            SOFTPHONE TOP BAR / ACTIVE CALL CONSOLE 
            ========================================== */}
        <div className="bg-gradient-to-r from-[#080E21] via-[#0F1C3F] to-[#080E21] p-5 border-b border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Lead Avatar & Live Indicator */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-500/20 border border-blue-400/30">
                {lead.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0B132B] animate-ping" />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0B132B]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white tracking-tight">{lead.name}</h2>
                {lead.priority === 'High' && (
                  <span className="bg-red-500/20 border border-red-500/40 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-red-400" /> High Value
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-medium flex items-center gap-2 mt-0.5">
                <Building2 className="w-3.5 h-3.5 text-blue-400" /> {lead.company} • 
                <span className="font-mono text-slate-200">{lead.phone || '+1 (555) 000-0000'}</span>
              </p>
            </div>
          </div>

          {/* Call Waveform & Audio Timer */}
          <div className="flex items-center gap-6 bg-slate-900/80 px-4 py-2 rounded-2xl border border-slate-800">
            {/* Animated Audio Waveform */}
            <div className="flex items-center gap-1 h-6">
              <span className={`w-1 bg-emerald-400 rounded-full animate-bounce ${isMuted || isOnHold ? 'h-1' : ''}`} style={{ animationDelay: '0ms' }} />
              <span className={`w-1 bg-emerald-400 rounded-full animate-bounce ${isMuted || isOnHold ? 'h-1' : ''}`} style={{ animationDelay: '150ms' }} />
              <span className={`w-1 bg-emerald-400 rounded-full animate-bounce ${isMuted || isOnHold ? 'h-1' : ''}`} style={{ animationDelay: '300ms' }} />
              <span className={`w-1 bg-emerald-400 rounded-full animate-bounce ${isMuted || isOnHold ? 'h-1' : ''}`} style={{ animationDelay: '450ms' }} />
              <span className={`w-1 bg-emerald-400 rounded-full animate-bounce ${isMuted || isOnHold ? 'h-1' : ''}`} style={{ animationDelay: '200ms' }} />
            </div>

            {/* Timer & Status */}
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block">
                {isOnHold ? 'ON HOLD' : isMuted ? 'MUTED' : 'CALL CONNECTED'}
              </span>
              <span className="text-xl font-black font-mono tracking-wider text-white">
                {formatTimer(secondsElapsed)}
              </span>
            </div>

            {/* In-Call Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2.5 rounded-xl border transition cursor-pointer ${
                  isMuted 
                    ? 'bg-amber-500/20 border-amber-500 text-amber-400' 
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white'
                }`}
                title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setIsOnHold(!isOnHold)}
                className={`p-2.5 rounded-xl border transition cursor-pointer ${
                  isOnHold 
                    ? 'bg-purple-500/20 border-purple-500 text-purple-400' 
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white'
                }`}
                title={isOnHold ? 'Resume Call' : 'Hold Call'}
              >
                {isOnHold ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Close Window */}
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition cursor-pointer hidden md:block"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ==========================================
            BODY: DISPOSITION & CALL INSIGHTS 
            ========================================== */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6 bg-[#080E21]">
          
          {/* Quick Lead Metadata Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl text-xs">
              <span className="text-slate-400 block font-medium">Deal Potential Value</span>
              <span className="text-emerald-400 font-extrabold text-sm">{lead.value || '$50,000'}</span>
            </div>
            <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl text-xs">
              <span className="text-slate-400 block font-medium">Lead Engagement Score</span>
              <span className="text-blue-400 font-extrabold text-sm">{lead.score || 88} / 100</span>
            </div>
            <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl text-xs">
              <span className="text-slate-400 block font-medium">Email Address</span>
              <span className="text-slate-200 font-semibold truncate block">{lead.email || 'N/A'}</span>
            </div>
            <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl text-xs">
              <span className="text-slate-400 block font-medium">Current Status</span>
              <span className="text-purple-400 font-extrabold uppercase text-[11px]">{lead.status}</span>
            </div>
          </div>

          {/* Disposition Selection Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-400" /> Select Call Outcome / Disposition <span className="text-red-400">*</span>
              </label>
              <span className="text-[11px] text-slate-400 font-medium">Updates lead status automatically</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* 1. Interested */}
              <button
                type="button"
                onClick={() => handleDispositionClick('Interested')}
                className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 cursor-pointer ${
                  disposition === 'Interested'
                    ? 'bg-gradient-to-b from-emerald-600 to-emerald-700 text-white border-emerald-400 shadow-lg shadow-emerald-500/25 scale-[1.02]'
                    : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:bg-emerald-950/30'
                }`}
              >
                <div className={`p-2 rounded-xl ${disposition === 'Interested' ? 'bg-white/20' : 'bg-emerald-500/10 text-emerald-400'}`}>
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <span className="font-extrabold text-sm block">Interested</span>
                  <span className={`text-[10px] font-semibold ${disposition === 'Interested' ? 'text-emerald-100' : 'text-emerald-400'}`}>
                    Moves to Qualified
                  </span>
                </div>
              </button>

              {/* 2. Not Interested */}
              <button
                type="button"
                onClick={() => handleDispositionClick('Not Interested')}
                className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 cursor-pointer ${
                  disposition === 'Not Interested'
                    ? 'bg-gradient-to-b from-red-600 to-red-700 text-white border-red-400 shadow-lg shadow-red-500/25 scale-[1.02]'
                    : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-red-500/50 hover:bg-red-950/30'
                }`}
              >
                <div className={`p-2 rounded-xl ${disposition === 'Not Interested' ? 'bg-white/20' : 'bg-red-500/10 text-red-400'}`}>
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <span className="font-extrabold text-sm block">Not Interested</span>
                  <span className={`text-[10px] font-semibold ${disposition === 'Not Interested' ? 'text-red-100' : 'text-red-400'}`}>
                    Moves to Lost
                  </span>
                </div>
              </button>

              {/* 3. Call Back Later */}
              <button
                type="button"
                onClick={() => handleDispositionClick('Call Back Later')}
                className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 cursor-pointer ${
                  disposition === 'Call Back Later'
                    ? 'bg-gradient-to-b from-amber-500 to-amber-600 text-white border-amber-300 shadow-lg shadow-amber-500/25 scale-[1.02]'
                    : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-amber-500/50 hover:bg-amber-950/30'
                }`}
              >
                <div className={`p-2 rounded-xl ${disposition === 'Call Back Later' ? 'bg-white/20' : 'bg-amber-500/10 text-amber-400'}`}>
                  <Clock className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <span className="font-extrabold text-sm block">Call Back Later</span>
                  <span className={`text-[10px] font-semibold ${disposition === 'Call Back Later' ? 'text-amber-100' : 'text-amber-400'}`}>
                    Schedule Follow-up
                  </span>
                </div>
              </button>

              {/* 4. Left Voicemail */}
              <button
                type="button"
                onClick={() => handleDispositionClick('Voicemail')}
                className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 cursor-pointer ${
                  disposition === 'Voicemail'
                    ? 'bg-gradient-to-b from-blue-600 to-indigo-600 text-white border-blue-400 shadow-lg shadow-blue-500/25 scale-[1.02]'
                    : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-blue-500/50 hover:bg-blue-950/30'
                }`}
              >
                <div className={`p-2 rounded-xl ${disposition === 'Voicemail' ? 'bg-white/20' : 'bg-blue-500/10 text-blue-400'}`}>
                  <Volume2 className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <span className="font-extrabold text-sm block">Left Voicemail</span>
                  <span className={`text-[10px] font-semibold ${disposition === 'Voicemail' ? 'text-blue-100' : 'text-blue-400'}`}>
                    Logs Call Activity
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Date & Time Picker if "Call Back Later" is active */}
          {showDatePicker && (
            <div className="p-4 bg-amber-950/40 border border-amber-500/40 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-top-2 duration-200">
              <span className="font-bold text-amber-200 text-xs flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" /> Schedule Call Back Reminder Date & Time:
              </span>
              <div className="flex items-center gap-3">
                <input
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="bg-slate-900 border border-amber-500/50 text-white rounded-xl px-3 py-1.5 text-xs font-bold outline-none"
                />
                <input
                  type="time"
                  value={followUpTime}
                  onChange={(e) => setFollowUpTime(e.target.value)}
                  className="bg-slate-900 border border-amber-500/50 text-white rounded-xl px-3 py-1.5 text-xs font-bold outline-none"
                />
              </div>
            </div>
          )}

          {/* Call Notes & Quick Tags */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-400" /> Call Conversation Notes & Requirements
              </label>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Quick Tags:</span>
                <button
                  type="button"
                  onClick={() => handleAddQuickTag('Requested Demo')}
                  className="px-2 py-0.5 bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 text-[10px] font-semibold rounded-md transition cursor-pointer"
                >
                  + Demo Needed
                </button>
                <button
                  type="button"
                  onClick={() => handleAddQuickTag('Price Objection')}
                  className="px-2 py-0.5 bg-slate-800 hover:bg-amber-600 hover:text-white text-slate-300 text-[10px] font-semibold rounded-md transition cursor-pointer"
                >
                  + Price Objection
                </button>
                <button
                  type="button"
                  onClick={() => handleAddQuickTag('Decision Maker Met')}
                  className="px-2 py-0.5 bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 text-[10px] font-semibold rounded-md transition cursor-pointer"
                >
                  + Decision Maker
                </button>
              </div>
            </div>

            <textarea
              rows={4}
              value={callNotes}
              onChange={(e) => setCallNotes(e.target.value)}
              placeholder="Enter detailed call conversation summary, client feedback, objections, or agreed next action steps..."
              className="w-full rounded-2xl border border-slate-800 bg-slate-900/90 p-4 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none leading-relaxed"
            />
          </div>

        </div>

        {/* ==========================================
            FOOTER: SAVE DISPOSITION BUTTONS 
            ========================================== */}
        <div className="p-4 bg-[#080E21] border-t border-slate-800/80 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-bold text-xs hover:bg-slate-800 transition cursor-pointer"
          >
            Cancel Session
          </button>

          <button
            type="button"
            disabled={!disposition}
            onClick={handleSave}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 text-white font-extrabold text-xs transition flex items-center gap-2 shadow-lg shadow-blue-500/25 cursor-pointer"
          >
            <Save className="w-4 h-4" /> Complete & Save Call Disposition
          </button>
        </div>

      </div>
    </div>
  );
}
