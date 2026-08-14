/**
 * Mock Data & Storage Helpers for Leads Module.
 */

export const MOCK_LEADS = [
  {
    id: 'l-1',
    name: 'Sarah Jenkins',
    company: 'Acme Corp',
    owner: 'Agent Smith',
    employee_id: 'e-1',
    status: 'New',
    priority: 'High',
    score: 92,
    follow_up_date: '2026-08-14',
    phone: '+1 (555) 234-5678',
    email: 'sarah@acme.com',
    value: '$240,000',
    numeric_value: 240000,
    stage: 'Discovery',
    dateCreated: '2026-08-10'
  },
  {
    id: 'l-2',
    name: 'Mike Ross',
    company: 'TechStart Inc',
    owner: 'Thomas Anderson',
    employee_id: 'e-2',
    status: 'Contacted',
    priority: 'Medium',
    score: 75,
    follow_up_date: '2026-08-14',
    phone: '+1 (555) 987-6543',
    email: 'mike@techstart.io',
    value: '$85,000',
    numeric_value: 85000,
    stage: 'Qualification',
    dateCreated: '2026-08-11'
  },
  {
    id: 'l-3',
    name: 'David Miller',
    company: 'Nexus Software',
    owner: 'Trinity Bell',
    employee_id: 'e-3',
    status: 'Qualified',
    priority: 'High',
    score: 88,
    follow_up_date: '2026-08-14',
    phone: '+1 (555) 345-6789',
    email: 'david@nexus.com',
    value: '$120,000',
    numeric_value: 120000,
    stage: 'Proposal Sent',
    dateCreated: '2026-08-08'
  },
  {
    id: 'l-4',
    name: 'Emily Blunt',
    company: 'Apex Health',
    owner: 'Agent Smith',
    employee_id: 'e-1',
    status: 'Proposal',
    priority: 'High',
    score: 95,
    follow_up_date: '2026-08-15',
    phone: '+1 (555) 876-5432',
    email: 'emily@apexhealth.com',
    value: '$350,000',
    numeric_value: 350000,
    stage: 'Negotiation',
    dateCreated: '2026-08-05'
  },
  {
    id: 'l-5',
    name: 'Robert Fox',
    company: 'Vanguard Retail',
    owner: 'Thomas Anderson',
    employee_id: 'e-2',
    status: 'Lost',
    priority: 'Low',
    score: 30,
    follow_up_date: '2026-08-12',
    phone: '+1 (555) 456-7890',
    email: 'robert@vanguard.com',
    value: '$45,000',
    numeric_value: 45000,
    stage: 'Deal Lost',
    dateCreated: '2026-08-01'
  },
  {
    id: 'l-6',
    name: 'Jessica Taylor',
    company: 'Global Logistics',
    owner: 'Trinity Bell',
    employee_id: 'e-3',
    status: 'Call Back Later',
    priority: 'High',
    score: 90,
    follow_up_date: '2026-08-14',
    phone: '+1 (555) 789-0123',
    email: 'jessica@globallogistics.com',
    value: '$180,000',
    numeric_value: 180000,
    stage: 'Qualification',
    dateCreated: '2026-08-09'
  },
  {
    id: 'l-7',
    name: 'Carlos Mendez',
    company: 'Solaris Energy',
    owner: 'Agent Smith',
    employee_id: 'e-1',
    status: 'Hot',
    priority: 'High',
    score: 98,
    follow_up_date: '2026-08-14',
    phone: '+1 (555) 654-3210',
    email: 'carlos@solaris.io',
    value: '$520,000',
    numeric_value: 520000,
    stage: 'Negotiation',
    dateCreated: '2026-08-07'
  },
  {
    id: 'l-8',
    name: 'Amanda Palmer',
    company: 'FinTech Cloud',
    owner: 'Thomas Anderson',
    employee_id: 'e-2',
    status: 'Qualified',
    priority: 'Medium',
    score: 78,
    follow_up_date: '2026-08-16',
    phone: '+1 (555) 432-1098',
    email: 'amanda@fintechcloud.com',
    value: '$95,000',
    numeric_value: 95000,
    stage: 'Proposal Sent',
    dateCreated: '2026-08-06'
  }
];

export const PIPELINE_STAGES = [
  { value: 'New', label: 'New' },
  { value: 'Contacted', label: 'Contacted' },
  { value: 'Qualified', label: 'Qualified' },
  { value: 'Proposal', label: 'Proposal' },
  { value: 'Hot', label: 'Hot' },
  { value: 'Call Back Later', label: 'Call Back Later' },
  { value: 'Lost', label: 'Lost' }
];

export const LEAD_ACTIVITIES = [
  { id: 1, title: 'Proposal emailed', description: 'Emailed pricing draft model to procurement committee.', time: 'Aug 12, 2026', variant: 'info' },
  { id: 2, title: 'Discovery call logged', description: '30-minute introductory meeting on infrastructure expectations.', time: 'Aug 10, 2026', variant: 'success' },
  { id: 3, title: 'Lead registered', description: 'Assigned initial deal owner: Agent Smith.', time: 'Aug 08, 2026', variant: 'primary' }
];

export const getLeads = () => {
  try {
    const cached = localStorage.getItem('panorama_leads');
    if (cached) return JSON.parse(cached);
  } catch (e) {}
  localStorage.setItem('panorama_leads', JSON.stringify(MOCK_LEADS));
  return MOCK_LEADS;
};

export const saveLeads = (list) => {
  localStorage.setItem('panorama_leads', JSON.stringify(list));
};
