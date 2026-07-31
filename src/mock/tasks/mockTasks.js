/**
 * Mock Data & Storage Helpers for Tasks Module.
 */

export const MOCK_TASKS = [
  {
    id: 't-1',
    subject: 'Email final pricing schedule proposal',
    leadName: 'Office 365 migration deal',
    dueDate: '2026-08-05',
    priority: 'High',
    status: 'Pending',
    assignedTo: 'Raj Sonar',
    dateCreated: '2026-07-29'
  },
  {
    id: 't-2',
    subject: 'Complete discovery technical questionnaire',
    leadName: 'Hardware silicon supply deal',
    dueDate: '2026-08-10',
    priority: 'Normal',
    status: 'Pending',
    assignedTo: 'Sarah Connor',
    dateCreated: '2026-07-30'
  },
  {
    id: 't-3',
    subject: 'Review legal terms & master contract clauses',
    leadName: 'Adwords cloud expansion',
    dueDate: '2026-07-31',
    priority: 'High',
    status: 'Completed',
    assignedTo: 'John Connor',
    dateCreated: '2026-07-20'
  },
  {
    id: 't-4',
    subject: 'Schedule headset demo walkthrough',
    leadName: 'VR headset integration contract',
    dueDate: '2026-08-15',
    priority: 'Normal',
    status: 'Pending',
    assignedTo: 'Agent Smith',
    dateCreated: '2026-07-25'
  }
];

export const getTasks = () => {
  const cached = localStorage.getItem('panorama_tasks');
  if (cached) return JSON.parse(cached);
  localStorage.setItem('panorama_tasks', JSON.stringify(MOCK_TASKS));
  return MOCK_TASKS;
};

export const saveTasks = (list) => {
  localStorage.setItem('panorama_tasks', JSON.stringify(list));
};
