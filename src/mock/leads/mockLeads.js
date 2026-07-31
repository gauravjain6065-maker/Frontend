/**
 * Mock Data & Storage Helpers for Leads Module.
 */

export const MOCK_LEADS = [
  {
    id: 'l-1',
    name: 'Office 365 migration deal',
    company: 'Microsoft Corp',
    owner: 'Raj Sonar',
    status: 'Active',
    value: '$240,000',
    stage: 'Proposal Sent',
    dateCreated: '2026-07-20',
    email: 'procurement@microsoft.com'
  },
  {
    id: 'l-2',
    name: 'Hardware silicon supply deal',
    company: 'Apple Inc',
    owner: 'Sarah Connor',
    status: 'Inactive',
    value: '$850,000',
    stage: 'Discovery',
    dateCreated: '2026-07-18',
    email: 'silicon@apple.com'
  },
  {
    id: 'l-3',
    name: 'Adwords cloud expansion',
    company: 'Google LLC',
    owner: 'John Connor',
    status: 'Active',
    value: '$1,200,000',
    stage: 'Negotiation',
    dateCreated: '2026-07-15',
    email: 'partnerships@google.com'
  },
  {
    id: 'l-4',
    name: 'VR headset integration contract',
    company: 'Facebook Meta',
    owner: 'Raj Sonar',
    status: 'Suspended',
    value: '$620,000',
    stage: 'On Hold',
    dateCreated: '2026-07-10',
    email: 'vr@meta.com'
  },
  {
    id: 'l-5',
    name: 'Amazon Web Services node license',
    company: 'Amazon Web Services',
    owner: 'Agent Smith',
    status: 'Active',
    value: '$480,000',
    stage: 'Deal Won',
    dateCreated: '2026-07-05',
    email: 'aws@amazon.com'
  }
];

export const PIPELINE_STAGES = [
  { value: 'Discovery', label: 'Discovery' },
  { value: 'Qualification', label: 'Qualification' },
  { value: 'Proposal Sent', label: 'Proposal Sent' },
  { value: 'Negotiation', label: 'Negotiation' },
  { value: 'Deal Won', label: 'Deal Won' },
  { value: 'Deal Lost', label: 'Deal Lost' }
];

export const LEAD_ACTIVITIES = [
  { id: 1, title: 'Proposal emailed', description: 'Emailed pricing draft model to procurement committee.', time: 'July 28, 2026', variant: 'info' },
  { id: 2, title: 'Discovery call logged', description: '30-minute introductory meeting on infrastructure expectations.', time: 'July 24, 2026', variant: 'success' },
  { id: 3, title: 'Lead registered', description: 'Assigned initial deal owner: Raj Sonar.', time: 'July 20, 2026', variant: 'primary' }
];

export const getLeads = () => {
  const cached = localStorage.getItem('panorama_leads');
  if (cached) return JSON.parse(cached);
  localStorage.setItem('panorama_leads', JSON.stringify(MOCK_LEADS));
  return MOCK_LEADS;
};

export const saveLeads = (list) => {
  localStorage.setItem('panorama_leads', JSON.stringify(list));
};
