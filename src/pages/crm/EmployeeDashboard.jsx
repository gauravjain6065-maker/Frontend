import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  ClipboardList, 
  Clock, 
  CheckCircle, 
  Plus, 
  Calendar, 
  Phone, 
  Mail, 
  ChevronRight,
  Target,
  Activity,
  UserCheck,
  X,
  Check
} from 'lucide-react';

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  // Interactive State
  const [dateFilter, setDateFilter] = useState('This Month');
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  // Form States
  const [newLeadData, setNewLeadData] = useState({ name: '', org: '', email: '', phone: '', status: 'New', priority: 'Medium' });
  const [newTaskData, setNewTaskData] = useState({ title: '', lead: '', dueDate: '', priority: 'Medium' });

  // Dynamic Lists State
  const [upcomingTasks, setUpcomingTasks] = useState([
    { id: 1, task: 'Send revised contract to TechCorp', dueDate: 'Today, 5:00 PM', priority: 'High', done: false },
    { id: 2, task: 'Prepare Q3 Sales Deck for Team Review', dueDate: 'Tomorrow, 11:00 AM', priority: 'Medium', done: false },
    { id: 3, task: 'Update CRM lead statuses for weekly audit', dueDate: 'Aug 2, 2026', priority: 'Normal', done: false }
  ]);

  const [leadStatuses] = useState([
    { status: 'New', count: 42, color: 'bg-blue-500', percentage: '34%' },
    { status: 'Contacted', count: 35, color: 'bg-amber-500', percentage: '28%' },
    { status: 'Qualified', count: 28, color: 'bg-purple-500', percentage: '23%' },
    { status: 'Negotiation', count: 12, color: 'bg-indigo-500', percentage: '10%' },
    { status: 'Won', count: 7, color: 'bg-green-500', percentage: '5%' }
  ]);

  const [todaysFollowups] = useState([
    {
      id: 1,
      company: 'Nexus Software',
      contact: 'David Miller',
      time: '10:30 AM',
      type: 'Call',
      priority: 'High'
    },
    {
      id: 2,
      company: 'Apex Health Solutions',
      contact: 'Emily Blunt',
      time: '02:00 PM',
      type: 'Demo Meeting',
      priority: 'Medium'
    },
    {
      id: 3,
      company: 'Vanguard Retail',
      contact: 'Robert Fox',
      time: '04:30 PM',
      type: 'Email Follow-up',
      priority: 'Normal'
    }
  ]);

  const kpis = [
    {
      title: 'Total Leads',
      value: '124',
      change: '+12% from last month',
      icon: <Users className="w-6 h-6 text-blue-600" />,
      bg: 'bg-blue-50',
      action: () => navigate('/employee/leads')
    },
    {
      title: 'Active Tasks',
      value: `${upcomingTasks.filter(t => !t.done).length}`,
      change: 'Due soon',
      icon: <ClipboardList className="w-6 h-6 text-amber-500" />,
      bg: 'bg-amber-50',
      action: () => navigate('/employee/tasks')
    },
    {
      title: 'Pending Follow-ups',
      value: `${todaysFollowups.length}`,
      change: '2 high priority',
      icon: <Clock className="w-6 h-6 text-red-500" />,
      bg: 'bg-red-50',
      action: () => navigate('/employee/followups')
    },
    {
      title: 'Closed Deals',
      value: '$48,500',
      change: '+24% revenue target',
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      bg: 'bg-green-50',
      action: () => navigate('/employee/timeline')
    }
  ];

  const handleAddLeadSubmit = (e) => {
    e.preventDefault();
    if (!newLeadData.name || !newLeadData.org) return;
    alert(`New Lead "${newLeadData.name}" (${newLeadData.org}) registered successfully!`);
    setShowAddLeadModal(false);
    setNewLeadData({ name: '', org: '', email: '', phone: '', status: 'New', priority: 'Medium' });
    navigate('/employee/leads');
  };

  const handleAddTaskSubmit = (e) => {
    e.preventDefault();
    if (!newTaskData.title) return;
    const newTask = {
      id: Date.now(),
      task: newTaskData.title,
      dueDate: newTaskData.dueDate || 'Tomorrow, 5:00 PM',
      priority: newTaskData.priority,
      done: false
    };
    setUpcomingTasks([newTask, ...upcomingTasks]);
    setShowAddTaskModal(false);
    setNewTaskData({ title: '', lead: '', dueDate: '', priority: 'Medium' });
  };

  const toggleTaskDone = (id) => {
    setUpcomingTasks(upcomingTasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/employee/dashboard')}>Employee</span>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="font-medium text-gray-800">Dashboard</span>
      </nav>

      {/* Header / Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Good morning, John 👋</h1>
          <p className="text-sm text-gray-700 mt-1">Here is what's happening with your sales pipeline today.</p>
        </div>
        <div className="flex items-center gap-3 relative">
          {/* Date Filter Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowDateFilter(!showDateFilter)}
              className="border border-gray-300 bg-white text-gray-700 rounded-lg px-4 py-2 transition text-sm font-medium flex items-center gap-2 hover:bg-gray-50 shadow-sm cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-gray-500" /> Filter: <span className="font-bold text-blue-600">{dateFilter}</span>
            </button>

            {showDateFilter && (
              <div className="absolute right-0 top-11 w-44 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-30 text-xs">
                {['Today', 'This Week', 'This Month', 'This Quarter', 'All Time'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setDateFilter(opt);
                      setShowDateFilter(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center justify-between cursor-pointer ${dateFilter === opt ? 'font-bold text-blue-600' : 'text-gray-700'}`}
                  >
                    <span>{opt}</span>
                    {dateFilter === opt && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Add New Lead Button */}
          <button 
            onClick={() => setShowAddLeadModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition text-sm font-medium flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add New Lead
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, index) => (
          <div 
            key={index} 
            onClick={kpi.action}
            className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col justify-between cursor-pointer hover:shadow-md hover:border-blue-300 transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{kpi.title}</span>
              <div className={`p-2.5 rounded-lg ${kpi.bg}`}>
                {kpi.icon}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold text-gray-900">{kpi.value}</div>
              <p className="text-xs text-gray-500 mt-1 font-medium">{kpi.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Lead Pipeline & Activity */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Pipeline Status Chart Card */}
          <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" /> Pipeline Status Distribution
              </h2>
              <button 
                onClick={() => navigate('/employee/leads')} 
                className="text-xs font-medium text-blue-600 hover:underline cursor-pointer"
              >
                View Full Report
              </button>
            </div>

            <div className="mt-2 flex flex-col gap-3">
              <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex">
                <div className="bg-blue-500 h-full" style={{ width: '34%' }} title="New: 34%"></div>
                <div className="bg-amber-500 h-full" style={{ width: '28%' }} title="Contacted: 28%"></div>
                <div className="bg-purple-500 h-full" style={{ width: '23%' }} title="Qualified: 23%"></div>
                <div className="bg-indigo-500 h-full" style={{ width: '10%' }} title="Negotiation: 10%"></div>
                <div className="bg-green-500 h-full" style={{ width: '5%' }} title="Won: 5%"></div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4 pt-4 border-t border-gray-100">
                {leadStatuses.map((item, i) => (
                  <div key={i} className="flex flex-col">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
                      <span>{item.status}</span>
                    </div>
                    <span className="text-base font-bold text-gray-800 mt-1">{item.count}</span>
                    <span className="text-xs text-gray-400">{item.percentage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" /> Recent CRM Activity
              </h2>
              <button 
                onClick={() => navigate('/employee/timeline')} 
                className="text-xs font-medium text-blue-600 hover:underline cursor-pointer"
              >
                See All
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition border border-gray-100">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">John Doe</span> completed a 15-min discovery call with <span className="font-medium text-blue-600">Acme Corp (Sarah Jenkins)</span>
                  </p>
                  <span className="text-xs text-gray-500 mt-0.5 block">25 mins ago</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition border border-gray-100">
                <div className="p-2 rounded-lg bg-green-50 text-green-600">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">John Doe</span> sent proposal quote to <span className="font-medium text-blue-600">TechStart Inc (Mike Ross)</span>
                  </p>
                  <span className="text-xs text-gray-500 mt-0.5 block">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right 1 Column */}
        <div className="flex flex-col gap-6">
          
          {/* Today's Follow-ups Card */}
          <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-600" /> Today's Follow-ups
              </h2>
              <span 
                onClick={() => navigate('/employee/followups')}
                className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full cursor-pointer hover:bg-red-200"
              >
                {todaysFollowups.length} Scheduled
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {todaysFollowups.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => navigate('/employee/followups')}
                  className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition bg-slate-50/50 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{item.company}</h3>
                      <p className="text-xs text-gray-600">{item.contact}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      item.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200 text-xs text-gray-500">
                    <span className="flex items-center gap-1 font-medium text-gray-700">
                      <Clock className="w-3.5 h-3.5 text-blue-600" /> {item.time}
                    </span>
                    <span className="text-blue-600 font-medium">{item.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks Card */}
          <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-blue-600" /> Tasks Assigned by Manager
              </h2>
              <span className="text-xs text-gray-400 font-medium">Assigned Tasks</span>
            </div>

            <div className="flex flex-col gap-3">
              {upcomingTasks.map((t) => (
                <div key={t.id} className="flex items-start gap-2.5 p-2.5 border border-gray-100 rounded-lg hover:bg-slate-50 transition">
                  <input 
                    type="checkbox" 
                    checked={t.done}
                    onChange={() => toggleTaskDone(t.id)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                  />
                  <div className="flex-1">
                    <p className={`text-sm font-medium leading-snug ${t.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>{t.task}</p>
                    <span className="text-xs text-gray-500 mt-1 block">{t.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="rounded-xl border border-gray-200 shadow-sm bg-blue-600 p-6 text-white flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Quick Lead Entry</h3>
            <p className="text-xs text-blue-100">Quickly register a prospective client into your CRM pipeline.</p>
            <button 
              onClick={() => setShowAddLeadModal(true)}
              className="mt-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-lg px-4 py-2.5 transition text-sm text-center shadow-sm cursor-pointer"
            >
              + Register New Prospect
            </button>
          </div>

        </div>

      </div>

      {/* Add Lead Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 bg-gray-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-md p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Add New Lead</h2>
              <button onClick={() => setShowAddLeadModal(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddLeadSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Contact Name</label>
                <input 
                  type="text" 
                  required
                  value={newLeadData.name}
                  onChange={(e) => setNewLeadData({ ...newLeadData, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins" 
                  className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Organization Name</label>
                <input 
                  type="text" 
                  required
                  value={newLeadData.org}
                  onChange={(e) => setNewLeadData({ ...newLeadData, org: e.target.value })}
                  placeholder="e.g. Acme Corp" 
                  className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Email</label>
                  <input 
                    type="email" 
                    value={newLeadData.email}
                    onChange={(e) => setNewLeadData({ ...newLeadData, email: e.target.value })}
                    placeholder="email@company.com" 
                    className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Phone</label>
                  <input 
                    type="text" 
                    value={newLeadData.phone}
                    onChange={(e) => setNewLeadData({ ...newLeadData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000" 
                    className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
                <button type="button" onClick={() => setShowAddLeadModal(false)} className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer">
                  Create Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 bg-gray-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-md p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Create New Task</h2>
              <button onClick={() => setShowAddTaskModal(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddTaskSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Task Title</label>
                <input 
                  type="text" 
                  required
                  value={newTaskData.title}
                  onChange={(e) => setNewTaskData({ ...newTaskData, title: e.target.value })}
                  placeholder="e.g. Schedule product demo with client" 
                  className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Due Date</label>
                <input 
                  type="text" 
                  value={newTaskData.dueDate}
                  onChange={(e) => setNewTaskData({ ...newTaskData, dueDate: e.target.value })}
                  placeholder="e.g. Tomorrow, 4:00 PM" 
                  className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
                <button type="button" onClick={() => setShowAddTaskModal(false)} className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer">
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

export default EmployeeDashboard;
