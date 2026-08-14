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
  Clock, 
  PhoneCall, 
  Building2,
  Flame,
  BarChart3,
  Award
} from 'lucide-react';
import { TEAM_PERFORMANCE_SUMMARY } from '../../mock/dashboard/dashboardMock';

export function Dashboard({ onNavigate }) {
  const navigate = (page) => {
    if (onNavigate) onNavigate(page);
  };

  const kpis = [
    { title: 'Total Team Members', value: '14', change: '+2 this month', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', page: 'EmployeeList' },
    { title: 'Active Team Leads', value: '128', change: '+12% vs last week', icon: Target, color: 'text-amber-600', bg: 'bg-amber-50', page: 'LeadList' },
    { title: 'Pending Tasks', value: '34', change: '8 high priority', icon: CheckSquare, color: 'text-red-600', bg: 'bg-red-50', page: 'TaskList' },
    { title: 'Monthly Revenue', value: '$1,240,000', change: '+18.4% target', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50', page: 'TeamPerformanceReport' },
  ];

  const teamMembers = [
    { name: 'Agent Smith', role: 'Senior Rep', leads: 22, deals: 15, performance: '105%' },
    { name: 'Thomas Anderson', role: 'Representative', leads: 11, deals: 6, performance: '88%' },
    { name: 'Trinity Bell', role: 'Representative', leads: 18, deals: 12, performance: '98%' },
    { name: 'Cypher Reagan', role: 'Representative', leads: 0, deals: 0, performance: '45%' },
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen font-sans">
      <PageHeader
        title="Manager Performance Dashboard"
        subtitle="Overview of team performance, revenue funnel, and sales execution targets."
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

      {/* 3 Custom Performance Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Widget 1: Hot Leads */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold">
                <Flame className="w-5 h-5 fill-red-500 text-red-500" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Hot Prospects Queue</h3>
            </div>
            <span className="bg-red-100 text-red-700 font-extrabold text-xs px-2.5 py-0.5 rounded-full">
              {TEAM_PERFORMANCE_SUMMARY.totalHotLeads} Hot
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            <div className="p-2.5 bg-red-50/50 rounded-xl border border-red-100 flex items-center justify-between text-xs">
              <span className="font-bold text-gray-800">Sarah Jenkins (Acme Corp)</span>
              <span className="font-mono text-red-600 font-bold">$240,000</span>
            </div>
            <div className="p-2.5 bg-red-50/50 rounded-xl border border-red-100 flex items-center justify-between text-xs">
              <span className="font-bold text-gray-800">Carlos Mendez (Solaris)</span>
              <span className="font-mono text-red-600 font-bold">$520,000</span>
            </div>
            <div className="p-2.5 bg-red-50/50 rounded-xl border border-red-100 flex items-center justify-between text-xs">
              <span className="font-bold text-gray-800">Jessica Taylor (Logistics)</span>
              <span className="font-mono text-red-600 font-bold">$180,000</span>
            </div>
          </div>
        </div>

        {/* Widget 2: Revenue Funnel Overview */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Revenue Funnel Overview</h3>
            </div>
            <span className="text-xs text-blue-600 font-bold">3 Stage Funnel</span>
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-500">1. Total Lead Pipeline</span>
                <span className="text-gray-900">$3,450,000</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-700 h-full rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-500">2. Open Deals Value</span>
                <span className="text-blue-600 font-bold">$2,100,000</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '60%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-500">3. Closed Won Revenue</span>
                <span className="text-green-600 font-bold">$1,240,000</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full rounded-full" style={{ width: '36%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Widget 3: Manager vs Target Gauge */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Manager vs Revenue Target</h3>
            </div>
            <span className="bg-purple-100 text-purple-700 font-extrabold text-xs px-2.5 py-0.5 rounded-full">
              {TEAM_PERFORMANCE_SUMMARY.managerTarget.percentage}% Achieved
            </span>
          </div>

          <div className="mt-4 flex flex-col items-center text-center">
            <div className="text-3xl font-black text-gray-900">
              ${(TEAM_PERFORMANCE_SUMMARY.managerTarget.achieved / 1000000).toFixed(2)}M
              <span className="text-xs font-medium text-gray-400"> / ${(TEAM_PERFORMANCE_SUMMARY.managerTarget.target / 1000000).toFixed(1)}M</span>
            </div>
            <p className="text-xs text-gray-500 mt-1 font-medium font-sans">Monthly Quota Goal</p>

            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mt-4">
              <div className="bg-gradient-to-r from-purple-500 to-blue-600 h-full rounded-full" style={{ width: `${TEAM_PERFORMANCE_SUMMARY.managerTarget.percentage}%` }} />
            </div>
          </div>
        </div>

      </div>

      {/* Team Workload Table */}
      <div className="grid grid-cols-1 gap-6">
        <Card title="Direct Team Performance Workload" subtitle="Current workload and conversion metrics for active telecallers.">
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
      </div>
    </div>
  );
}
export default Dashboard;
