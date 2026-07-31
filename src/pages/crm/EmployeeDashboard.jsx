import React from 'react';
import { 
  Users, 
  ClipboardList, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  Plus, 
  Calendar, 
  Phone, 
  Mail, 
  ChevronRight,
  Target,
  Activity,
  UserCheck
} from 'lucide-react';

const EmployeeDashboard = () => {
  // Breadcrumb mock
  const breadcrumb = [
    { label: 'CRM', href: '#' },
    { label: 'Employee Dashboard', href: '#' },
  ];

  // KPI Data
  const kpis = [
    {
      title: 'Total Leads',
      value: '124',
      change: '+12% from last month',
      isPositive: true,
      icon: <Users className="w-6 h-6 text-blue-600" />,
      bg: 'bg-blue-50'
    },
    {
      title: 'Active Tasks',
      value: '18',
      change: '4 due today',
      isWarning: true,
      icon: <ClipboardList className="w-6 h-6 text-amber-500" />,
      bg: 'bg-amber-50'
    },
    {
      title: 'Pending Follow-ups',
      value: '9',
      change: '2 high priority',
      isPositive: false,
      icon: <Clock className="w-6 h-6 text-red-500" />,
      bg: 'bg-red-50'
    },
    {
      title: 'Closed Deals',
      value: '$48,500',
      change: '+24% revenue target',
      isPositive: true,
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      bg: 'bg-green-50'
    }
  ];

  // Lead Status Breakdown
  const leadStatuses = [
    { status: 'New', count: 42, color: 'bg-blue-500', percentage: '34%' },
    { status: 'Contacted', count: 35, color: 'bg-amber-500', percentage: '28%' },
    { status: 'Qualified', count: 28, color: 'bg-purple-500', percentage: '23%' },
    { status: 'Negotiation', count: 12, color: 'bg-indigo-500', percentage: '10%' },
    { status: 'Won', count: 7, color: 'bg-green-500', percentage: '5%' }
  ];

  // Recent Activities
  const recentActivities = [
    {
      id: 1,
      type: 'call',
      user: 'John Doe',
      action: 'Completed a 15-min discovery call with',
      target: 'Acme Corp (Sarah Jenkins)',
      time: '25 mins ago',
      icon: <Phone className="w-4 h-4 text-blue-600" />
    },
    {
      id: 2,
      type: 'email',
      user: 'John Doe',
      action: 'Sent proposal quote to',
      target: 'TechStart Inc (Mike Ross)',
      time: '1 hour ago',
      icon: <Mail className="w-4 h-4 text-green-500" />
    },
    {
      id: 3,
      type: 'task',
      user: 'John Doe',
      action: 'Marked task as completed:',
      target: 'Schedule Demo with GlobalLogistics',
      time: '3 hours ago',
      icon: <CheckCircle className="w-4 h-4 text-purple-500" />
    }
  ];

  // Today's Follow-ups
  const todaysFollowups = [
    {
      id: 1,
      company: 'Nexus Software',
      contact: 'David Miller',
      time: '10:30 AM',
      type: 'Call',
      priority: 'High',
      phone: '+1 (555) 234-5678'
    },
    {
      id: 2,
      company: 'Apex Health Solutions',
      contact: 'Emily Blunt',
      time: '02:00 PM',
      type: 'Demo Meeting',
      priority: 'Medium',
      phone: '+1 (555) 876-5432'
    },
    {
      id: 3,
      company: 'Vanguard Retail',
      contact: 'Robert Fox',
      time: '04:30 PM',
      type: 'Email Follow-up',
      priority: 'Normal',
      phone: '+1 (555) 345-6789'
    }
  ];

  // Upcoming Tasks
  const upcomingTasks = [
    { id: 1, task: 'Send revised contract to TechCorp', dueDate: 'Today, 5:00 PM', priority: 'High' },
    { id: 2, task: 'Prepare Q3 Sales Deck for Team Review', dueDate: 'Tomorrow, 11:00 AM', priority: 'Medium' },
    { id: 3, task: 'Update CRM lead statuses for weekly audit', dueDate: 'Aug 2, 2026', priority: 'Normal' }
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        {breadcrumb.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <ChevronRight className="w-3 h-3 text-gray-400" />}
            <span className={index === breadcrumb.length - 1 ? 'font-medium text-gray-800' : 'hover:text-blue-600 cursor-pointer'}>
              {item.label}
            </span>
          </React.Fragment>
        ))}
      </nav>

      {/* Header / Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Good morning, John 👋</h1>
          <p className="text-sm text-gray-700 mt-1">Here is what's happening with your sales pipeline today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="border border-gray-300 bg-white text-gray-700 rounded-lg px-4 py-2 transition text-sm font-medium flex items-center gap-2 hover:bg-gray-50 shadow-sm">
            <Calendar className="w-4 h-4 text-gray-500" /> Filter Date
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition text-sm font-medium flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> Add New Lead
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, index) => (
          <div key={index} className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col justify-between">
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

      {/* Main Grid: Charts & Follow-ups */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Lead Pipeline & Recent Activity */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Lead Status Chart Card */}
          <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" /> Pipeline Status Distribution
              </h2>
              <span className="text-xs font-medium text-blue-600 cursor-pointer hover:underline">View Full Report</span>
            </div>

            {/* Visual Bar Chart Placeholder */}
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
              <button className="text-xs font-medium text-blue-600 hover:underline">See All</button>
            </div>

            <div className="flex flex-col gap-4">
              {recentActivities.map((act) => (
                <div key={act.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition border border-transparent hover:border-gray-200">
                  <div className="p-2 rounded-lg bg-slate-100 mt-0.5">
                    {act.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">{act.user}</span> {act.action} <span className="font-medium text-blue-600">{act.target}</span>
                    </p>
                    <span className="text-xs text-gray-500 mt-0.5 block">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Column: Today's Follow-ups & Quick Actions */}
        <div className="flex flex-col gap-6">
          
          {/* Today's Follow-ups Card */}
          <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-600" /> Today's Follow-ups
              </h2>
              <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">3 Scheduled</span>
            </div>

            <div className="flex flex-col gap-3">
              {todaysFollowups.map((item) => (
                <div key={item.id} className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition bg-slate-50/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{item.company}</h3>
                      <p className="text-xs text-gray-600">{item.contact}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      item.priority === 'High' ? 'bg-red-100 text-red-600' : 
                      item.priority === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200 text-xs text-gray-500">
                    <span className="flex items-center gap-1 font-medium text-gray-700">
                      <Clock className="w-3.5 h-3.5 text-blue-600" /> {item.time}
                    </span>
                    <span className="text-blue-600 hover:underline cursor-pointer font-medium">{item.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks Card */}
          <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-blue-600" /> Upcoming Tasks
            </h2>
            <div className="flex flex-col gap-3">
              {upcomingTasks.map((t) => (
                <div key={t.id} className="flex items-start gap-2.5 p-2.5 border border-gray-100 rounded-lg hover:bg-slate-50 transition">
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 font-medium leading-snug">{t.task}</p>
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
            <button className="mt-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-lg px-4 py-2.5 transition text-sm text-center shadow-sm">
              + Register New Prospect
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default EmployeeDashboard;
