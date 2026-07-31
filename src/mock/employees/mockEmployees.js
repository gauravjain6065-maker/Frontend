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
    status: 'Active',
    leadsCount: 22,
    closedDeals: 15,
    dateJoined: '2026-01-20'
  },
  {
    id: 'e-2',
    name: 'Thomas Anderson',
    email: 'neo@matrix.net',
    phone: '+1 (555) 999-0000',
    role: 'Representative',
    manager: 'John Connor',
    status: 'Active',
    leadsCount: 11,
    closedDeals: 6,
    dateJoined: '2026-02-15'
  },
  {
    id: 'e-3',
    name: 'Trinity Bell',
    email: 'trinity@matrix.net',
    phone: '+1 (555) 888-9999',
    role: 'Representative',
    manager: 'Sarah Connor',
    status: 'Active',
    leadsCount: 18,
    closedDeals: 12,
    dateJoined: '2026-02-28'
  },
  {
    id: 'e-4',
    name: 'Cypher Reagan',
    email: 'cypher@matrix.net',
    phone: '+1 (555) 666-5555',
    role: 'Representative',
    manager: 'Marcus Wright',
    status: 'Suspended',
    leadsCount: 0,
    closedDeals: 0,
    dateJoined: '2026-03-05'
  }
];

export const getEmployees = () => {
  const cached = localStorage.getItem('panorama_employees');
  if (cached) return JSON.parse(cached);
  localStorage.setItem('panorama_employees', JSON.stringify(MOCK_EMPLOYEES));
  return MOCK_EMPLOYEES;
};

export const saveEmployees = (list) => {
  localStorage.setItem('panorama_employees', JSON.stringify(list));
};
