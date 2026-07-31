import React from 'react';
import { Search, Filter, Plus, ChevronRight, ClipboardList, CheckCircle, Clock } from 'lucide-react';

const MyTasksPage = () => {
  const tasks = [
    { id: 1, title: 'Send revised contract to TechCorp', lead: 'TechStart Inc', priority: 'High', status: 'Pending', dueDate: 'Today, 5:00 PM' },
    { id: 2, title: 'Prepare Q3 Sales Deck for Team Review', lead: 'Internal', priority: 'Medium', status: 'In Progress', dueDate: 'Tomorrow, 11:00 AM' },
    { id: 3, title: 'Schedule Technical Demo with Nexus Software', lead: 'Nexus Software', priority: 'High', status: 'Completed', dueDate: 'Jul 26, 2026' },
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans flex flex-col gap-6">
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <span>CRM</span> <ChevronRight className="w-3 h-3 text-gray-400" /> <span className="font-medium text-gray-800">My Tasks</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-sm text-gray-700 mt-1">Track and manage your daily operational to-dos.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition text-sm font-medium flex items-center gap-2 self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Create Task
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input type="text" placeholder="Search tasks..." className="h-10 w-full rounded-lg border border-gray-300 px-3 pl-9 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-gray-500 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="p-4">Task</th>
                <th className="p-4">Related Lead</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Status</th>
                <th className="p-4">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {tasks.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-semibold text-gray-900">{t.title}</td>
                  <td className="p-4 text-blue-600">{t.lead}</td>
                  <td className="p-4"><span className={`text-xs font-bold ${t.priority === 'High' ? 'text-red-500' : 'text-amber-500'}`}>{t.priority}</span></td>
                  <td className="p-4"><span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">{t.status}</span></td>
                  <td className="p-4 text-xs text-gray-500">{t.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyTasksPage;
