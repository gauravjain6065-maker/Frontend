import React, { useState } from 'react';
import { Bell, User, Lock, ChevronRight, Check, Eye, EyeOff, ShieldCheck } from 'lucide-react';

const ProfileNotificationsPage = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState('');

  const notifications = [
    { id: 1, title: 'New lead assigned: TechCorp', time: '10 mins ago', isUnread: true },
    { id: 2, title: 'Follow-up reminder: Call Sarah Jenkins', time: '1 hour ago', isUnread: true },
    { id: 3, title: 'Quarterly sales target updated', time: '1 day ago', isUnread: false }
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans flex flex-col gap-6">
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <span>CRM</span> <ChevronRight className="w-3 h-3 text-gray-400" /> <span className="font-medium text-gray-800">Notifications & Profile</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications & Account Settings</h1>
          <p className="text-sm text-gray-700 mt-1">Manage personal info, security, and updates.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-800 pb-3 border-b border-gray-100 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" /> My Profile
          </h2>
          <div className="flex flex-col items-center text-center gap-3 my-2">
            <div className="w-20 h-20 rounded-full bg-blue-600 text-white font-bold text-2xl flex items-center justify-center">
              JD
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">John Doe</h3>
              <p className="text-xs text-gray-500">EMP-84920 • Senior Account Executive</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-sm pt-3 border-t border-gray-100">
            <div><span className="text-xs text-gray-500 block">Department</span> <span className="font-medium text-gray-900">Sales & CRM</span></div>
            <div><span className="text-xs text-gray-500 block">Work Email</span> <span className="font-medium text-gray-900">john.doe@company.com</span></div>
            <div><span className="text-xs text-gray-500 block">Phone</span> <span className="font-medium text-gray-900">+1 (555) 019-2834</span></div>
            <div><span className="text-xs text-gray-500 block">Joining Date</span> <span className="font-medium text-gray-900">Jan 15, 2024</span></div>
          </div>
        </div>

        {/* Change Password & Notifications */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Notifications */}
          <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" /> Notifications
              </h2>
              <button className="text-xs text-blue-600 hover:underline font-medium">Mark all as read</button>
            </div>
            <div className="flex flex-col gap-2">
              {notifications.map((n) => (
                <div key={n.id} className={`p-3 rounded-lg border ${n.isUnread ? 'bg-blue-50/50 border-blue-100' : 'bg-white border-gray-100'} flex justify-between items-center`}>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                    <span className="text-xs text-gray-500">{n.time}</span>
                  </div>
                  {n.isUnread && <span className="w-2 h-2 rounded-full bg-blue-600"></span>}
                </div>
              ))}
            </div>
          </div>

          {/* Change Password */}
          <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-600" /> Change Security Password
            </h2>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Current Password</label>
                <div className="relative">
                  <input type={showCurrent ? 'text' : 'password'} className="h-10 w-full rounded-lg border border-gray-300 px-3 pr-10 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-3 text-gray-400">
                    {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">New Password</label>
                  <div className="relative">
                    <input type={showNew ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 px-3 pr-10 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" />
                    <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-3 text-gray-400">
                      {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <input type={showConfirm ? 'text' : 'password'} className="h-10 w-full rounded-lg border border-gray-300 px-3 pr-10 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-3 text-gray-400">
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <button className="self-start bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition text-sm font-medium mt-2">
                Save New Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileNotificationsPage;
