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
  ArrowUpDown, 
  ChevronRight,
  TrendingUp,
  FileText,
  Clock,
  Phone,
  Briefcase
} from 'lucide-react';

import {
  PageContainer,
  PageHeader,
  Section,
  Card,
  Grid,
  Stack,
  Divider
} from '../../../components/layout';

import {
  StatCard,
  ActivityCard,
  NotificationCard,
  DataTable,
  Badge,
  StatusBadge,
  ChartPlaceholder,
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
  QUICK_ACTIONS
} from '../../../mock/dashboard/dashboardMock';

// Simple internal helper component for generating circular initial badges in tables
const AvatarMock = ({ name }) => {
  const getInitials = (n) => {
    if (!n) return '?';
    const p = n.trim().split(/\s+/);
    return p.length >= 2 ? (p[0][0] + p[p.length - 1][0]).toUpperCase() : n.slice(0, 2).toUpperCase();
  };

  return (
    <div className="w-8 h-8 rounded-full bg-primary-100 border border-primary-200 text-primary-700 flex items-center justify-center font-bold text-[10px] select-none flex-shrink-0">
      {getInitials(name)}
    </div>
  );
};

// Icon mapping dictionary to resolve string names from mock files
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
  // Modal toggle states
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // DataTable State
  const [tableData, setTableData] = useState(RECENT_LEADS);
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [tableLoading, setTableLoading] = useState(false);

  // Form input states (for demonstration inside modals)
  const [leadName, setLeadName] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadStatus, setLeadStatus] = useState('Active');
  
  const [orgName, setOrgName] = useState('');
  const [orgIndustry, setOrgIndustry] = useState('');

  // Breadcrumb structure
  const crumbs = [
    { label: 'Dashboard' }
  ];

  // DataTable columns config
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
        <span className="text-[10px] font-semibold text-neutral-500">
          {val}
        </span>
      )
    }
  ];

  // Sorting handler
  const handleSort = (columnKey) => {
    const isSameCol = sortColumn === columnKey;
    const direction = isSameCol && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(columnKey);
    setSortDirection(direction);
    setTableLoading(true);

    setTimeout(() => {
      const sorted = [...tableData].sort((a, b) => {
        const valA = String(a[columnKey]).toLowerCase();
        const valB = String(b[columnKey]).toLowerCase();
        return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
      setTableData(sorted);
      setTableLoading(false);
    }, 450);
  };

  // Mock Form Submit Handlers
  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!leadName || !leadCompany) {
      alert('Please fill out the required fields.');
      return;
    }
    const newLead = {
      id: tableData.length + 1,
      name: leadName,
      company: leadCompany,
      owner: 'Raj Sonar',
      status: leadStatus,
      date: new Date().toISOString().split('T')[0]
    };
    setTableData([newLead, ...tableData]);
    setLeadName('');
    setLeadCompany('');
    setIsLeadModalOpen(false);
    alert(`Lead "${newLead.name}" has been created successfully.`);
  };

  const handleCreateOrg = (e) => {
    e.preventDefault();
    if (!orgName) {
      alert('Please enter an organization name.');
      return;
    }
    setIsOrgModalOpen(false);
    setOrgName('');
    setOrgIndustry('');
    alert(`Organization "${orgName}" added to directory.`);
  };

  const handleQuickAction = (key) => {
    switch (key) {
      case 'create-lead':
        setIsLeadModalOpen(true);
        break;
      case 'create-org':
        setIsOrgModalOpen(true);
        break;
      case 'create-contact':
        setIsContactModalOpen(true);
        break;
      case 'create-task':
        setIsTaskModalOpen(true);
        break;
      default:
        break;
    }
  };

  return (
    <PageContainer fluid padding="p-5" className="bg-[#F8FAFC]">
      
      {/* ====================================================
          MODALS & OVERLAYS 
          ==================================================== */}
      {/* Create Lead Modal */}
      <Modal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        title="Create New CRM Lead"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setIsLeadModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateLead}>
              Create Lead
            </Button>
          </>
        }
      >
        <Stack space={4}>
          <Input 
            label="Lead Name" 
            required 
            placeholder="E.g., Bruce Wayne" 
            value={leadName} 
            onChange={(e) => setLeadName(e.target.value)}
          />
          <Input 
            label="Organization / Company" 
            required 
            placeholder="E.g., Wayne Enterprises" 
            value={leadCompany} 
            onChange={(e) => setLeadCompany(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <Select 
              label="Pipeline Status" 
              options={['Active', 'Inactive', 'Suspended', 'Pending']} 
              value={leadStatus}
              onChange={(e) => setLeadStatus(e.target.value)}
            />
            <DatePicker label="Estimated Deal Close" />
          </div>
        </Stack>
      </Modal>

      {/* Create Organization Modal */}
      <Modal
        isOpen={isOrgModalOpen}
        onClose={() => setIsOrgModalOpen(false)}
        title="Add Organization Account"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setIsOrgModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateOrg}>
              Save Organization
            </Button>
          </>
        }
      >
        <Stack space={4}>
          <Input 
            label="Organization Name" 
            required 
            placeholder="E.g., LexCorp" 
            value={orgName} 
            onChange={(e) => setOrgName(e.target.value)}
          />
          <Select 
            label="Industry Sector" 
            options={['Technology', 'Biotech', 'Finance', 'Manufacturing', 'Logistics']} 
            value={orgIndustry}
            onChange={(e) => setOrgIndustry(e.target.value)}
          />
          <Input label="Headquarters Location" placeholder="E.g., Metropolis, USA" />
        </Stack>
      </Modal>

      {/* Create Contact Modal */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Add Contact Person"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setIsContactModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsContactModalOpen(false)}>
              Save Contact
            </Button>
          </>
        }
      >
        <Stack space={4}>
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" required placeholder="Clark" />
            <Input label="Last Name" required placeholder="Kent" />
          </div>
          <Input label="Email Address" type="email" placeholder="clark.kent@dailyplanet.com" />
          <Input label="Select Associated Organization" placeholder="Search organization..." />
        </Stack>
      </Modal>

      {/* Create Task Modal */}
      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title="Schedule CRM Action Task"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setIsTaskModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsTaskModalOpen(false)}>
              Add Task
            </Button>
          </>
        }
      >
        <Stack space={4}>
          <Input label="Task Subject" required placeholder="E.g., Send pricing schedule" />
          <div className="grid grid-cols-2 gap-4">
            <DatePicker label="Due Date" required />
            <Select label="Task Priority" options={['Low', 'Normal', 'High', 'Urgent']} placeholder="Select Priority" />
          </div>
          <Textarea label="Instructions" placeholder="Describe specific actions needed..." />
        </Stack>
      </Modal>

      {/* ====================================================
          DASHBOARD GRID CONTAINER
          ==================================================== */}
      <div className="grid grid-cols-1 gap-5">
        
        {/* Top Header */}
        <PageHeader
          title="Dashboard"
          description={
            <span>
              Welcome back, <strong className="text-neutral-800 font-bold">Raj</strong>. Here's what's happening inside your CRM today.
            </span>
          }
          breadcrumbs={crumbs}
          actions={
            <>
              <Button 
                variant="secondary" 
                size="sm" 
                leadingIcon={Plus} 
                onClick={() => setIsOrgModalOpen(true)}
              >
                Create Organization
              </Button>
              <Button 
                variant="primary" 
                size="sm" 
                leadingIcon={Plus} 
                onClick={() => setIsLeadModalOpen(true)}
              >
                Create Lead
              </Button>
            </>
          }
        />

        {/* Row 1: 4 KPI Cards */}
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

        {/* Row 2: Lead Pipeline (8 cols) & Today's Followups (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Lead Pipeline */}
          <div className="lg:col-span-8 flex flex-col">
            <Card title="Lead Generation Trends" className="flex-1">
              <ChartPlaceholder type="area" height={260} />
            </Card>
          </div>

          {/* Today's Followups */}
          <div className="lg:col-span-4 flex flex-col">
            <Card title="Today's Followups" className="flex-1" footer={
              <button 
                onClick={() => setIsTaskModalOpen(true)}
                className="text-xs font-semibold text-primary-600 hover:text-primary-700 bg-transparent border-0 cursor-pointer flex items-center gap-1 focus:outline-none"
              >
                <Plus className="w-3.5 h-3.5" />
                Schedule New Task
              </button>
            }>
              <Stack space={3.5} className="max-h-[260px] overflow-y-auto crm-scrollbar pr-1">
                {TODAY_FOLLOWUPS.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-3 bg-neutral-100/60 hover:bg-neutral-100 border border-neutral-200 rounded-lg flex items-start gap-3 transition-colors text-xs select-none"
                  >
                    <div className="p-2 bg-white rounded-md text-primary-600 border border-neutral-200 flex-shrink-0 flex items-center justify-center">
                      {item.type === 'Call' ? (
                        <Phone className="w-3.5 h-3.5" />
                      ) : item.type === 'Meeting' ? (
                        <Users className="w-3.5 h-3.5" />
                      ) : (
                        <FileText className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-neutral-800 truncate">{item.title}</span>
                        <span className="text-[10px] text-neutral-400 font-semibold flex items-center gap-0.5 flex-shrink-0">
                          <Clock className="w-2.5 h-2.5" />
                          {item.time}
                        </span>
                      </div>
                      <p className="text-neutral-500 mt-1 truncate">Client: {item.clientName}</p>
                    </div>
                  </div>
                ))}
              </Stack>
            </Card>
          </div>
        </div>

        {/* Row 3: Recent Leads Table (8 cols) & Quick Actions (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Recent Leads Table */}
          <div className="lg:col-span-8 flex flex-col">
            <Card title="Recent Lead Pipeline Submissions" className="flex-1">
              <DataTable
                columns={tableColumns}
                data={tableData}
                loading={tableLoading}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={handleSort}
                onRowClick={(row) => alert(`Selected Row Detail Profile: ${row.name} (${row.company})`)}
              />
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-4 flex flex-col">
            <Card title="Dashboard Quick Commands" className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                {QUICK_ACTIONS.map((action) => {
                  const ActionIcon = iconMap[action.iconName] || Plus;
                  return (
                    <div
                      key={action.id}
                      onClick={() => handleQuickAction(action.actionKey)}
                      className="p-4 border border-neutral-200 rounded-xl hover:border-primary-300 hover:shadow-sm group select-none flex flex-col justify-between cursor-pointer transition-all bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-primary-50 text-primary-600 rounded-lg group-hover:bg-primary-500 group-hover:text-white transition-colors duration-150">
                          <ActionIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-neutral-800 group-hover:text-primary-600 transition-colors">
                            {action.title}
                          </h4>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-end text-primary-600 group-hover:translate-x-1.5 transition-transform duration-150">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>

        {/* Row 4: Recent Activities (6 cols) & Notifications (6 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Recent Activities */}
          <Card title="Log Timeline Activity">
            <div className="pl-1 pt-1 max-h-[300px] overflow-y-auto crm-scrollbar">
              {RECENT_ACTIVITIES.map((act, idx) => {
                const ActIcon = iconMap[act.iconName] || Plus;
                return (
                  <ActivityCard
                    key={act.id}
                    title={act.title}
                    description={act.description}
                    time={act.time}
                    icon={ActIcon}
                    variant={act.variant}
                    isLast={idx === RECENT_ACTIVITIES.length - 1}
                  />
                );
              })}
            </div>
          </Card>

          {/* Notifications */}
          <Card title="System Alerts Inbox">
            <Stack space={3} className="max-h-[300px] overflow-y-auto crm-scrollbar pr-1">
              {NOTIFICATIONS.map((item) => {
                const NoteIcon = iconMap[item.iconName] || Bell;
                return (
                  <NotificationCard
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    time={item.time}
                    unread={item.unread}
                    icon={NoteIcon}
                    variant={item.variant}
                  />
                );
              })}
            </Stack>
          </Card>
        </div>

      </div>
    </PageContainer>
  );
}
