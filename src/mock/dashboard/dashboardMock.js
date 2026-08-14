/**
 * Mock Data for Company Admin & Manager Dashboard pages.
 */

export const KPI_STATS = [
  {
    id: 'total-leads',
    title: 'Total Leads',
    value: '1,482',
    change: '+12.5%',
    trend: 'up',
    trendLabel: 'from last month',
    iconName: 'DollarSign'
  },
  {
    id: 'new-leads',
    title: 'New Leads',
    value: '124',
    change: '+4.8%',
    trend: 'up',
    trendLabel: 'from last week',
    iconName: 'Users'
  },
  {
    id: 'followups',
    title: "Today's Followups",
    value: '18',
    change: '-2.1%',
    trend: 'down',
    trendLabel: 'from yesterday',
    iconName: 'Activity'
  },
  {
    id: 'active-employees',
    title: 'Active Employees',
    value: '8',
    change: '0%',
    trend: 'neutral',
    trendLabel: 'no change',
    iconName: 'User'
  }
];

export const TEAM_PERFORMANCE_SUMMARY = {
  teamRevenue: 1240000,
  formattedTeamRevenue: '$1,240,000',
  totalHotLeads: 28,
  conversionRate: '34.5%',
  revenueFunnel: {
    leadValue: 3450000,
    openDeals: 2100000,
    wonDeals: 1240000
  },
  managerTarget: {
    target: 1500000,
    achieved: 1240000,
    percentage: 82.6
  }
};

export const RECENT_LEADS = [
  { id: 1, name: 'Sarah Jenkins', company: 'Acme Corp', owner: 'Agent Smith', status: 'Hot', date: '2026-08-14' },
  { id: 2, name: 'Mike Ross', company: 'TechStart Inc', owner: 'Thomas Anderson', status: 'Contacted', date: '2026-08-14' },
  { id: 3, name: 'David Miller', company: 'Nexus Software', owner: 'Trinity Bell', status: 'Qualified', date: '2026-08-13' },
  { id: 4, name: 'Carlos Mendez', company: 'Solaris Energy', owner: 'Agent Smith', status: 'Hot', date: '2026-08-12' },
  { id: 5, name: 'Emily Blunt', company: 'Apex Health', owner: 'Agent Smith', status: 'Proposal', date: '2026-08-10' }
];

export const TODAY_FOLLOWUPS = [
  { id: 'f1', time: '10:00 AM', title: 'Discovery Call', clientName: 'Sarah Jenkins (Acme Corp)', type: 'Call' },
  { id: 'f2', time: '01:30 PM', title: 'Product Walkthrough', clientName: 'Mike Ross (TechStart Inc)', type: 'Meeting' },
  { id: 'f3', time: '04:00 PM', title: 'Proposal Pitch', clientName: 'David Miller (Nexus Software)', type: 'Proposal' },
  { id: 'f4', time: '06:00 PM', title: 'Follow-up Email', clientName: 'Carlos Mendez (Solaris Energy)', type: 'Email' }
];

export const RECENT_ACTIVITIES = [
  { id: 'act1', title: 'New deal pipeline created', description: 'Created pipeline "Solaris Expansion" valued at $520k.', time: '10 mins ago', variant: 'success', iconName: 'Plus' },
  { id: 'act2', title: 'Lead disposition logged', description: 'Agent Smith marked Sarah Jenkins as Hot Lead.', time: '45 mins ago', variant: 'info', iconName: 'Edit' },
  { id: 'act3', title: 'Contract review scheduled', description: 'Scheduled call with Apex Health legal team.', time: '2 hours ago', variant: 'warning', iconName: 'Calendar' }
];

export const NOTIFICATIONS = [
  { id: 'n1', title: 'New Hot Lead assigned', description: 'Transferred Solaris Energy lead to Agent Smith.', time: '15m ago', unread: true, variant: 'primary', iconName: 'Mail' },
  { id: 'n2', title: 'Target milestone reached', description: 'Team reached 82.6% of monthly revenue target.', time: '2h ago', unread: false, variant: 'success', iconName: 'CheckCircle' },
  { id: 'n3', title: 'Follow-up reminder', description: '3 calls scheduled for today after 2 PM.', time: '3h ago', unread: false, variant: 'warning', iconName: 'Bell' }
];

export const QUICK_ACTIONS = [
  { id: 'qa-lead', title: 'Create Lead', description: 'Register a new customer lead.', iconName: 'Plus', actionKey: 'create-lead' },
  { id: 'qa-org', title: 'Create Organization', description: 'Add a new corporate profile.', iconName: 'Users', actionKey: 'create-org' },
  { id: 'qa-contact', title: 'Create Contact', description: 'Register a contact person.', iconName: 'User', actionKey: 'create-contact' },
  { id: 'qa-task', title: 'Create Task', description: 'Add a todo task reminder.', iconName: 'Activity', actionKey: 'create-task' }
];
