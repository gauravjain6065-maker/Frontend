/**
 * Mock Data & Storage Helpers for Organizations Module.
 */

export const MOCK_ORGANIZATIONS = [
  {
    id: 'org-1',
    name: 'Microsoft Corp',
    domain: 'microsoft.com',
    industry: 'Technology',
    employees: '100,000+',
    status: 'Active',
    leadsCount: 5,
    contactsCount: 4,
    billingAddress: 'One Microsoft Way, Redmond, WA',
    dateCreated: '2026-01-10'
  },
  {
    id: 'org-2',
    name: 'Apple Inc',
    domain: 'apple.com',
    industry: 'Consumer Electronics',
    employees: '50,000+',
    status: 'Active',
    leadsCount: 3,
    contactsCount: 2,
    billingAddress: 'One Apple Park Way, Cupertino, CA',
    dateCreated: '2026-02-05'
  },
  {
    id: 'org-3',
    name: 'Google LLC',
    domain: 'google.com',
    industry: 'Technology',
    employees: '100,000+',
    status: 'Active',
    leadsCount: 4,
    contactsCount: 3,
    billingAddress: '1600 Amphitheatre Pkwy, Mountain View, CA',
    dateCreated: '2026-02-12'
  },
  {
    id: 'org-4',
    name: 'Facebook Meta',
    domain: 'meta.com',
    industry: 'Social Media',
    employees: '20,000+',
    status: 'Suspended',
    leadsCount: 1,
    contactsCount: 1,
    billingAddress: '1 Hacker Way, Menlo Park, CA',
    dateCreated: '2026-03-01'
  }
];

export const getOrganizations = () => {
  const cached = localStorage.getItem('panorama_organizations');
  if (cached) return JSON.parse(cached);
  localStorage.setItem('panorama_organizations', JSON.stringify(MOCK_ORGANIZATIONS));
  return MOCK_ORGANIZATIONS;
};

export const saveOrganizations = (list) => {
  localStorage.setItem('panorama_organizations', JSON.stringify(list));
};
