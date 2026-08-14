import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Eye, Trash, ChevronRight, CheckSquare } from 'lucide-react';

const MyTasksPage = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Send revised contract to TechCorp', lead: 'TechStart Inc', priority: 'High', status: 'Pending', dueDate: 'Today, 5:00 PM' },
    { id: 2, title: 'Prepare Q3 Sales Deck for Team Review', lead: 'Internal', priority: 'Medium', status: 'In Progress', dueDate: 'Tomorrow, 11:00 AM' },
    { id: 3, title: 'Schedule Technical Demo with Nexus Software', lead: 'Nexus Software', priority: 'High', status: 'Completed', dueDate: 'Jul 26, 2026' },
    { id: 4, title: 'Follow up on Enterprise Proposal', lead: 'Acme Corp', priority: 'High', status: 'Pending', dueDate: 'Today, 2:30 PM' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.lead.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'Completed' ? 'Pending' : 'Completed';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this task from your list?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans flex flex-col gap-6">
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <span>CRM</span> <ChevronRight className="w-3 h-3 text-gray-400" /> <span className="font-medium text-gray-800">My Assigned Tasks</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Assigned Tasks</h1>
          <p className="text-sm text-gray-600 mt-1">Review and complete operational tasks assigned by your Sales Manager or Admin.</p>
        </div>
        <span className="text-xs font-bold text-slate-700 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-2xs flex items-center gap-2 self-start sm:self-auto">
          <CheckSquare className="w-4 h-4 text-blue-600" /> Manager Assigned Tasks
        </span>
      </div>

      <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks or leads..." 
              className="h-10 w-full rounded-lg border border-gray-300 px-3 pl-9 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-slate-50 text-xs font-bold uppercase text-gray-500 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="p-4 w-10">Done</th>
                <th className="p-4">Task Description</th>
                <th className="p-4">Related Lead</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Status</th>
                <th className="p-4">Due Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition">
                    <td className="p-4">
                      <input 
                        type="checkbox" 
                        checked={t.status === 'Completed'}
                        onChange={() => toggleTaskStatus(t.id)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                      />
                    </td>
                    <td className={`p-4 font-bold ${t.status === 'Completed' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                      {t.title}
                    </td>
                    <td className="p-4 text-blue-600 font-semibold">{t.lead}</td>
                    <td className="p-4">
                      <span className={`text-xs font-bold ${t.priority === 'High' ? 'text-red-600' : 'text-amber-600'}`}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        t.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        t.status === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="p-4 text-xs font-mono text-gray-600">{t.dueDate}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => handleDelete(t.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-slate-100 transition cursor-pointer">
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500 font-medium">
                    No tasks assigned matching filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyTasksPage;
