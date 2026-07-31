import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Eye, Edit, Trash, ChevronRight, X } from 'lucide-react';

const MyTasksPage = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Send revised contract to TechCorp', lead: 'TechStart Inc', priority: 'High', status: 'Pending', dueDate: 'Today, 5:00 PM' },
    { id: 2, title: 'Prepare Q3 Sales Deck for Team Review', lead: 'Internal', priority: 'Medium', status: 'In Progress', dueDate: 'Tomorrow, 11:00 AM' },
    { id: 3, title: 'Schedule Technical Demo with Nexus Software', lead: 'Nexus Software', priority: 'High', status: 'Completed', dueDate: 'Jul 26, 2026' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', lead: '', priority: 'Medium', status: 'Pending', dueDate: '' });

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
    if (window.confirm('Delete this task?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;
    const newTask = {
      id: Date.now(),
      ...formData,
      dueDate: formData.dueDate || 'Tomorrow'
    };
    setTasks([newTask, ...tasks]);
    setShowModal(false);
    setFormData({ title: '', lead: '', priority: 'Medium', status: 'Pending', dueDate: '' });
  };

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
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition text-sm font-medium flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create Task
        </button>
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
              className="h-10 w-full rounded-lg border border-gray-300 px-3 pl-9 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-gray-500 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="p-4 w-10">Done</th>
                <th className="p-4">Task</th>
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
                    <td className={`p-4 font-semibold ${t.status === 'Completed' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                      {t.title}
                    </td>
                    <td className="p-4 text-blue-600 font-medium">{t.lead}</td>
                    <td className="p-4">
                      <span className={`text-xs font-bold ${t.priority === 'High' ? 'text-red-500' : 'text-amber-500'}`}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        t.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        t.status === 'In Progress' ? 'bg-amber-100 text-amber-700' : 'bg-blue-50 text-blue-700'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-gray-500">{t.dueDate}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => navigate('/crm/tasks/details')} className="p-1.5 text-gray-500 hover:text-blue-600 rounded hover:bg-slate-100">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(t.id)} className="p-1.5 text-gray-500 hover:text-red-600 rounded hover:bg-slate-100">
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    No tasks found matching your filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-gray-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-md p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Create New Task</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Task Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Follow up on proposal" 
                  className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Related Lead / Company</label>
                <input 
                  type="text" 
                  value={formData.lead}
                  onChange={(e) => setFormData({ ...formData, lead: e.target.value })}
                  placeholder="e.g. Acme Corp" 
                  className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Priority</label>
                  <select 
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm bg-white"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Due Date</label>
                  <input 
                    type="text" 
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    placeholder="e.g. Tomorrow, 5:00 PM" 
                    className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm" 
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
                <button type="button" onClick={() => setShowModal(false)} className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTasksPage;
