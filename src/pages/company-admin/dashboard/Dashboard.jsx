import React, { useState } from 'react';
import { 
  DollarSign, 
  Users, 
  Activity, 
  User, 
  Plus, 
  Edit, 
  Calendar, 
  Mail, 
  CheckCircle, 
  Bell, 
  ChevronRight,
  TrendingUp,
  FileText,
  Clock,
  Phone,
  Flame,
  Target,
  BarChart3,
  Filter
} from 'lucide-react';

import {
  PageContainer,
  PageHeader,
  Card,
  Stack
} from '../../../components/layout';

import {
  StatCard,
  ActivityCard,
  NotificationCard,
  DataTable,
  StatusBadge,
  Button,
  Modal,
  Input,
  Select,
  Textarea,
  DatePicker
} from '../../../components/ui';

import {
  KPI_STATS,
  RECENT_LEADS,
  TODAY_FOLLOWUPS,
  RECENT_ACTIVITIES,
  NOTIFICATIONS,
  QUICK_ACTIONS,
  TEAM_PERFORMANCE_SUMMARY
} from '../../../mock/dashboard/dashboardMock';

const AvatarMock = ({ name }) => {
  const getInitials = (n) => {
    if (!n) return '?';
    const p = n.trim().split(/\s+/);
    return p.length >= 2 ? (p[0][0] + p[p.length - 1][0]).toUpperCase() : n.slice(0, 2).toUpperCase();
  };

  return (
    <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-[10px] select-none flex-shrink-0">
      {getInitials(name)}
    </div>
  );
};

const iconMap = {
  DollarSign,
  Users,
  Activity,
  User,
  Plus,
  Edit,
  Calendar,
  Mail,
  CheckCircle,
  Bell
};

export default function Dashboard() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);
  const [tableData, setTableData] = useState(RECENT_LEADS);
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const crumbs = [{ label: 'Dashboard' }];

  const tableColumns = [
    { 
      key: 'name', 
      label: 'Lead Name', 
      sortable: true,
      render: (val, row) => (
        <Stack direction="row" space={2.5} align="center">
          <AvatarMock name={val} />
          <div className="flex flex-col">
            <span className="font-semibold text-neutral-800 text-xs">{val}</span>
            <span className="text-[10px] text-neutral-400">Owner: {row.owner}</span>
          </div>
        </Stack>
      )
    },
    { key: 'company', label: 'Organization', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: false,
      render: (val) => <StatusBadge status={val} />
    },
    { 
      key: 'date', 
      label: 'Created Date', 
      sortable: true,
      render: (val) => (
        <span className="text-[10px] font-semibold text-neutral-500">{val}</span>
      )
    }
  ];

  return (
    <PageContainer fluid padding="p-5" className="bg-[#F8FAFC]">
      <div className="grid grid-cols-1 gap-5">
        
        {/* Top Header */}
        <PageHeader
          title="Executive Dashboard"
          description={
            <span>
              Welcome back, <strong className="text-neutral-800 font-bold">Admin</strong>. Overview of sales performance, revenue funnel, and team targets.
            </span>
          }
          breadcrumbs={crumbs}
        />

        {/* Row 1: KPI Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {KPI_STATS.map((stat) => {
            const StatIcon = iconMap[stat.iconName] || DollarSign;
            return (
              <StatCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                trend={stat.trend}
                trendLabel={stat.trendLabel}
                icon={StatIcon}
              />
            );
          })}
        </div>

        {/* Row 2: 3 Custom Performance Widgets (Hot Leads, Revenue Funnel, Manager vs Target) */}
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

          {/* Widget 2: Revenue Funnel */}
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
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">Manager vs Monthly Target</h3>
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
              <p className="text-xs text-gray-500 mt-1 font-medium">Team Quota Progress</p>

              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mt-4">
                <div className="bg-gradient-to-r from-purple-500 to-blue-600 h-full rounded-full" style={{ width: `${TEAM_PERFORMANCE_SUMMARY.managerTarget.percentage}%` }} />
              </div>
            </div>
          </div>

        </div>

        {/* Row 3: Recent Leads Table */}
        <div className="grid grid-cols-1 gap-5">
          <Card title="Recent Lead Submissions">
            <DataTable
              columns={tableColumns}
              data={tableData}
            />
          </Card>
        </div>

      </div>
    </PageContainer>
  );
}
