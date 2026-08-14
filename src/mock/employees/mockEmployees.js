/**
 * Mock Data & Storage Helpers for Employees Module.
 */

export const MOCK_EMPLOYEES = [
  {
    id: 'e-1',
    name: 'Agent Smith',
    email: 'smith@matrix.net',
    phone: '+1 (555) 777-8888',
    role: 'Senior Representative',
    manager: 'Sarah Connor',
    manager_id: 'm-1',
    status: 'Active',
    leadsCount: 22,
    closedDeals: 15,
    calls_made: 64,
    hot_leads_handled: 14,
    revenue_generated: 450000,
    dateJoined: '2026-01-20',
    daily_calls: [
      { day: 'Mon', calls: 24 },
      { day: 'Tue', calls: 38 },
      { day: 'Wed', calls: 45 },
      { day: 'Thu', calls: 52 },
      { day: 'Fri', calls: 64 },
      { day: 'Sat', calls: 18 },
      { day: 'Sun', calls: 8 }
    ]
  },
  {
    id: 'e-2',
    name: 'Thomas Anderson',
    email: 'neo@matrix.net',
    phone: '+1 (555) 999-0000',
    role: 'Representative',
    manager: 'John Connor',
    manager_id: 'm-2',
    status: 'Active',
    leadsCount: 11,
    closedDeals: 6,
    calls_made: 42,
    hot_leads_handled: 8,
    revenue_generated: 280000,
    dateJoined: '2026-02-15',
    daily_calls: [
      { day: 'Mon', calls: 18 },
      { day: 'Tue', calls: 25 },
      { day: 'Wed', calls: 30 },
      { day: 'Thu', calls: 42 },
      { day: 'Fri', calls: 35 },
      { day: 'Sat', calls: 12 },
      { day: 'Sun', calls: 0 }
    ]
  },
  {
    id: 'e-3',
    name: 'Trinity Bell',
    email: 'trinity@matrix.net',
    phone: '+1 (555) 888-9999',
    role: 'Representative',
    manager: 'Sarah Connor',
    manager_id: 'm-1',
    status: 'Active',
    leadsCount: 18,
    closedDeals: 12,
    calls_made: 56,
    hot_leads_handled: 12,
    revenue_generated: 390000,
    dateJoined: '2026-02-28',
    daily_calls: [
      { day: 'Mon', calls: 30 },
      { day: 'Tue', calls: 42 },
      { day: 'Wed', calls: 38 },
      { day: 'Thu', calls: 48 },
      { day: 'Fri', calls: 56 },
      { day: 'Sat', calls: 20 },
      { day: 'Sun', calls: 5 }
    ]
  },
  {
    id: 'e-4',
    name: 'Cypher Reagan',
    email: 'cypher@matrix.net',
    phone: '+1 (555) 666-5555',
    role: 'Representative',
    manager: 'John Connor',
    manager_id: 'm-2',
    status: 'Suspended',
    leadsCount: 0,
    closedDeals: 0,
    calls_made: 12,
    hot_leads_handled: 1,
    revenue_generated: 45000,
    dateJoined: '2026-03-05',
    daily_calls: [
      { day: 'Mon', calls: 5 },
      { day: 'Tue', calls: 8 },
      { day: 'Wed', calls: 12 },
      { day: 'Thu', calls: 0 },
      { day: 'Fri', calls: 0 },
      { day: 'Sat', calls: 0 },
      { day: 'Sun', calls: 0 }
    ]
  }
];

export const getEmployees = () => {
  try {
    const cached = localStorage.getItem('panorama_employees');
    if (cached) return JSON.parse(cached);
  } catch (e) {}
  localStorage.setItem('panorama_employees', JSON.stringify(MOCK_EMPLOYEES));
  return MOCK_EMPLOYEES;
};

export const saveEmployees = (list) => {
  localStorage.setItem('panorama_employees', JSON.stringify(list));
};
