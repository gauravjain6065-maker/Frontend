/**
 * Mock Data & Storage Helpers for Contacts Module.
 */

export const MOCK_CONTACTS = [
  {
    id: 'c-1',
    name: 'Jane Cooper',
    email: 'jane.cooper@microsoft.com',
    phone: '+1 (555) 123-4567',
    organization: 'Microsoft Corp',
    role: 'Procurement Director',
    status: 'Active',
    owner: 'Raj Sonar',
    dateCreated: '2026-01-20'
  },
  {
    id: 'c-2',
    name: 'Cody Fisher',
    email: 'cody.fisher@apple.com',
    phone: '+1 (555) 234-5678',
    organization: 'Apple Inc',
    role: 'Lead hardware engineer',
    status: 'Inactive',
    owner: 'Sarah Connor',
    dateCreated: '2026-02-10'
  },
  {
    id: 'c-3',
    name: 'Esther Howard',
    email: 'esther.howard@google.com',
    phone: '+1 (555) 345-6789',
    organization: 'Google LLC',
    role: 'Strategic Partnerships Manager',
    status: 'Active',
    owner: 'John Connor',
    dateCreated: '2026-02-18'
  },
  {
    id: 'c-4',
    name: 'Jenny Wilson',
    email: 'jenny.wilson@meta.com',
    phone: '+1 (555) 456-7890',
    organization: 'Facebook Meta',
    role: 'VP Corporate Relations',
    status: 'Suspended',
    owner: 'Raj Sonar',
    dateCreated: '2026-03-02'
  }
];

export const getContacts = () => {
  const cached = localStorage.getItem('panorama_contacts');
  if (cached) return JSON.parse(cached);
  localStorage.setItem('panorama_contacts', JSON.stringify(MOCK_CONTACTS));
  return MOCK_CONTACTS;
};

export const saveContacts = (list) => {
  localStorage.setItem('panorama_contacts', JSON.stringify(list));
};
