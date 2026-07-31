/**
 * Mock Data for the Company Admin Dashboard page.
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

export const RECENT_LEADS = [
  {
    id: 1,
    name: 'Jane Cooper',
    company: 'Microsoft',
    owner: 'Raj Sonar',
    status: 'Active',
    date: '2026-07-30'
  },
  {
    id: 2,
    name: 'Cody Fisher',
    company: 'Apple',
    owner: 'Sarah Connor',
    status: 'Inactive',
    date: '2026-07-29'
  },
  {
    id: 3,
    name: 'Esther Howard',
    company: 'Google',
    owner: 'John Connor',
    status: 'Active',
    date: '2026-07-28'
  },
  {
    id: 4,
    name: 'Jenny Wilson',
    company: 'Facebook',
    owner: 'Raj Sonar',
    status: 'Suspended',
    date: '2026-07-27'
  },
  {
    id: 5,
    name: 'Kristin Watson',
    company: 'Amazon',
    owner: 'Sarah Connor',
    status: 'Active',
    date: '2026-07-26'
  }
];

export const TODAY_FOLLOWUPS = [
  {
    id: 'f1',
    time: '10:00 AM',
    title: 'Introductory Call',
    clientName: 'Jane Cooper (Microsoft)',
    type: 'Call'
  },
  {
    id: 'f2',
    time: '01:30 PM',
    title: 'Product Walkthrough Demo',
    clientName: 'Cody Fisher (Apple)',
    type: 'Meeting'
  },
  {
    id: 'f3',
    time: '04:00 PM',
    title: 'Proposal Review & Pitch',
    clientName: 'Esther Howard (Google)',
    type: 'Proposal'
  },
  {
    id: 'f4',
    time: '06:00 PM',
    title: 'Follow-up Email Check-in',
    clientName: 'Jenny Wilson (Facebook)',
    type: 'Email'
  }
];

export const RECENT_ACTIVITIES = [
  {
    id: 'act1',
    title: 'New deal pipeline created',
    description: 'Created pipeline "AI Expansion Deal" valued at $2.4M.',
    time: '10 mins ago',
    variant: 'success',
    iconName: 'Plus'
  },
  {
    id: 'act2',
    title: 'Lead contact details updated',
    description: 'Sarah Connor updated phone numbers for Google lead profiles.',
    time: '45 mins ago',
    variant: 'info',
    iconName: 'Edit'
  },
  {
    id: 'act3',
    title: 'Contract review scheduled',
    description: 'Scheduled draft review call with Apple legal team.',
    time: '2 hours ago',
    variant: 'warning',
    iconName: 'Calendar'
  }
];

export const NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'New Lead assigned to you',
    description: 'Sarah Connor transferred lead Weyland-Yutani Corp to your queue.',
    time: '15m ago',
    unread: true,
    variant: 'primary',
    iconName: 'Mail'
  },
  {
    id: 'n2',
    title: 'System backup complete',
    description: 'CRM backup nodes synced successfully with zero errors.',
    time: '2h ago',
    unread: false,
    variant: 'success',
    iconName: 'CheckCircle'
  },
  {
    id: 'n3',
    title: 'Pending task reminder',
    description: 'Task "Review EMEA Q3 target list" deadline is in 4 hours.',
    time: '3h ago',
    unread: false,
    variant: 'warning',
    iconName: 'Bell'
  }
];

export const QUICK_ACTIONS = [
  {
    id: 'qa-lead',
    title: 'Create Lead',
    description: 'Register a new customer lead to start followups.',
    iconName: 'Plus',
    actionKey: 'create-lead'
  },
  {
    id: 'qa-org',
    title: 'Create Organization',
    description: 'Add a new corporate entity profile to CRM.',
    iconName: 'Users',
    actionKey: 'create-org'
  },
  {
    id: 'qa-contact',
    title: 'Create Contact',
    description: 'Register a contact person linked to an org.',
    iconName: 'User',
    actionKey: 'create-contact'
  },
  {
    id: 'qa-task',
    title: 'Create Task',
    description: 'Add a todo activity task for follow-up reminders.',
    iconName: 'Activity',
    actionKey: 'create-task'
  }
];
