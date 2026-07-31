import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  Users, 
  Target, 
  CheckSquare, 
  TrendingUp, 
  UserPlus, 
  PlusCircle, 
  ArrowUpRight, 
  Clock, 
  PhoneCall, 
  Building2 
} from 'lucide-react';

export function Dashboard({ onNavigate }) {
  const navigate = (page) => {
    if (onNavigate) onNavigate(page);
  };

  const kpis = [
    { title: 'Total Team Members', value: '14', change: '+2 this month', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', page: 'EmployeeList' },
    { title: 'Active Team Leads', value: '128', change: '+12% vs last week', icon: Target, color: 'text-amber-600', bg: 'bg-amber-50', page: 'LeadList' },
    { title: 'Pending Tasks', value: '34', change: '8 high priority', icon: CheckSquare, color: 'text-red-600', bg: 'bg-red-50', page: 'TaskList' },
    { title: 'Monthly Revenue', value: '$245,800', change: '+18.4% target', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50', page: 'TeamPerformanceReport' },
  ];

  const recentActivities = [
    { id: 1, user: 'Sarah Jenkins', action: 'Closed deal with Acme Corp ($45,000)', time: '10 mins ago', page: 'LeadDetails' },
    { id: 2, user: 'Michael Brown', action: 'Assigned 5 new leads to Alex Rivera', time: '45 mins ago', page: 'AssignLead' },
    { id: 3, user: 'David Kim', action: 'Scheduled follow-up with TechGlobal', time: '2 hours ago', page: 'FollowUpList' },
    { id: 4, user: 'Jessica Taylor', action: 'Updated status for Lead #4092 to Contacted', time: '3 hours ago', page: 'LeadList' },
  ];

  const pendingTasks = [
    { id: 1, title: 'Review Q3 Team Targets', assignedTo: 'Self', dueDate: 'Today, 5:00 PM', priority: 'High' },
    { id: 2, title: 'Approve Enterprise Lead Allocation', assignedTo: 'Sarah Jenkins', dueDate: 'Tomorrow', priority: 'Medium' },
    { id: 3, title: 'Client Onboarding Sync with Apex Inc', assignedTo: 'David Kim', dueDate: 'Aug 02, 2026', priority: 'High' },
  ];

  const teamMembers = [
    { name: 'Sarah Jenkins', role: 'Senior Rep', leads: 24, deals: 8, performance: '94%' },
    { name: 'Alex Rivera', role: 'Account Exec', leads: 19, deals: 5, performance: '88%' },
    { name: 'David Kim', role: 'Sales Exec', leads: 22, deals: 6, performance: '91%' },
    { name: 'Emily Zhang', role: 'Junior Rep', leads: 15, deals: 3, performance: '82%' },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Manager Dashboard"
        subtitle="Overview of team performance, lead distribution, and key sales metrics."
        actions={
          <>
            <Button variant="secondary" icon={UserPlus} onClick={() => navigate('CreateEmployee')}>Add Member</Button>
            <Button variant="primary" icon={PlusCircle} onClick={() => navigate('AssignLead')}>Assign Lead</Button>
          </>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="cursor-pointer hover:border-blue-300 transition-colors" onClick={() => navigate(kpi.page)}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                  <span className="text-xs font-medium text-green-600 mt-1 inline-block">{kpi.change}</span>
                </div>
                <div className={`p-3 rounded-lg ${kpi.bg}`}>
                  <Icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Overview */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Team Overview" subtitle="Current workload and conversion metrics for active representatives.">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500">
                    <th className="pb-3">Representative</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3">Active Leads</th>
                    <th className="pb-3">Deals Closed</th>
                    <th className="pb-3 text-right">Quota Met</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {teamMembers.map((member, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => navigate('EmployeeDetails')}
                    >
                      <td className="py-3 font-medium text-blue-600">{member.name}</td>
                      <td className="py-3 text-gray-500 text-xs">{member.role}</td>
                      <td className="py-3 text-gray-700">{member.leads}</td>
                      <td className="py-3 text-gray-700">{member.deals}</td>
                      <td className="py-3 text-right">
                        <Badge variant={parseInt(member.performance) >= 90 ? 'success' : 'warning'}>
                          {member.performance}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Pending Tasks */}
          <Card title="Pending Manager Tasks" subtitle="Action items requiring your immediate review.">
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => navigate('TaskDetails')}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <CheckSquare className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                      <p className="text-xs text-gray-500">Assigned: {task.assignedTo} • Due: {task.dueDate}</p>
                    </div>
                  </div>
                  <Badge variant={task.priority === 'High' ? 'danger' : 'warning'}>
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar Column: Quick Actions & Recent Activity */}
        <div className="space-y-6">
          <Card title="Quick Actions">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate('CreateEmployee')}
                className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-colors text-center"
              >
                <UserPlus className="w-5 h-5 text-blue-600 mb-1" />
                <span className="text-xs font-medium text-gray-800">Add Employee</span>
              </button>
              <button
                onClick={() => navigate('AssignLead')}
                className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-colors text-center"
              >
                <Target className="w-5 h-5 text-blue-600 mb-1" />
                <span className="text-xs font-medium text-gray-800">Assign Lead</span>
              </button>
              <button
                onClick={() => navigate('OrganizationList')}
                className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-colors text-center"
              >
                <Building2 className="w-5 h-5 text-blue-600 mb-1" />
                <span className="text-xs font-medium text-gray-800">New Org</span>
              </button>
              <button
                onClick={() => navigate('CreateFollowUp')}
                className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-colors text-center"
              >
                <PhoneCall className="w-5 h-5 text-blue-600 mb-1" />
                <span className="text-xs font-medium text-gray-800">Schedule Call</span>
              </button>
            </div>
          </Card>

          <Card title="Recent Activity" subtitle="Live updates across your team.">
            <div className="space-y-4">
              {recentActivities.map((act) => (
                <div
                  key={act.id}
                  onClick={() => navigate(act.page)}
                  className="flex items-start gap-3 text-xs cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-gray-800 font-medium">{act.user}</p>
                    <p className="text-gray-600">{act.action}</p>
                    <span className="text-gray-400 text-[11px] mt-0.5 block">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
