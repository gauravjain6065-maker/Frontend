/**
 * Mock Data & Storage Helpers for Managers Module.
 */

export const MOCK_MANAGERS = [
  {
    id: 'm-1',
    name: 'Sarah Connor',
    email: 'sarah.connor@sky.net',
    phone: '+1 (555) 111-2222',
    department: 'Sales Ops',
    status: 'Active',
    leadsCount: 14,
    employeesCount: 3,
    dateJoined: '2026-01-15'
  },
  {
    id: 'm-2',
    name: 'John Connor',
    email: 'john.connor@sky.net',
    phone: '+1 (555) 222-3333',
    department: 'Customer Success',
    status: 'Active',
    leadsCount: 8,
    employeesCount: 2,
    dateJoined: '2026-02-10'
  },
  {
    id: 'm-3',
    name: 'Marcus Wright',
    email: 'marcus.wright@sky.net',
    phone: '+1 (555) 333-4444',
    department: 'Sales Ops',
    status: 'Suspended',
    leadsCount: 0,
    employeesCount: 0,
    dateJoined: '2026-03-01'
  },
  {
    id: 'm-4',
    name: 'Kyle Reese',
    email: 'kyle.reese@sky.net',
    phone: '+1 (555) 444-5555',
    department: 'Inbound Leads',
    status: 'Inactive',
    leadsCount: 3,
    employeesCount: 1,
    dateJoined: '2026-04-12'
  }
];

export const MANAGER_ACTIVITIES = [
  { id: 1, title: 'Lead transferred', description: 'Transferred Weyland Corp to Agent Bob.', time: '10 mins ago', variant: 'info', iconName: 'Users' },
  { id: 2, title: 'Settings modified', description: 'Updated pipeline notification rules.', time: '2 hours ago', variant: 'warning', iconName: 'Edit' },
  { id: 3, title: 'Plan approved', description: 'Approved Q3 hiring targets.', time: 'Yesterday', variant: 'success', iconName: 'CheckCircle' }
];

export const getManagers = () => {
  const cached = localStorage.getItem('panorama_managers');
  if (cached) return JSON.parse(cached);
  localStorage.setItem('panorama_managers', JSON.stringify(MOCK_MANAGERS));
  return MOCK_MANAGERS;
};

export const saveManagers = (list) => {
  localStorage.setItem('panorama_managers', JSON.stringify(list));
};
