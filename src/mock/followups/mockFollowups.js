/**
 * Mock Data & Storage Helpers for Followups Module.
 */

export const MOCK_FOLLOWUPS = [
  {
    id: 'f-1',
    type: 'Call',
    subject: 'Introductory pricing walkthrough',
    clientName: 'Jane Cooper (Microsoft)',
    date: '2026-07-31',
    time: '10:00 AM',
    notes: 'Review initial product integration requirements. Focus on security.',
    status: 'Scheduled',
    owner: 'Raj Sonar'
  },
  {
    id: 'f-2',
    type: 'Meeting',
    subject: 'Silicon supply tech discovery',
    clientName: 'Cody Fisher (Apple)',
    date: '2026-07-31',
    time: '01:30 PM',
    notes: 'In-depth architecture details for supply-chain integrations.',
    status: 'Scheduled',
    owner: 'Sarah Connor'
  },
  {
    id: 'f-3',
    type: 'Proposal',
    subject: 'Adwords proposal review',
    clientName: 'Esther Howard (Google)',
    date: '2026-07-31',
    time: '04:00 PM',
    notes: 'Review draft contract clauses. Ready for signatures.',
    status: 'Scheduled',
    owner: 'John Connor'
  },
  {
    id: 'f-4',
    type: 'Email',
    subject: 'Check-in on headset integration proposal',
    clientName: 'Jenny Wilson (Facebook Meta)',
    date: '2026-07-31',
    time: '06:00 PM',
    notes: 'Mailed followups reminder regarding the VR project proposal timeline.',
    status: 'Scheduled',
    owner: 'Raj Sonar'
  },
  {
    id: 'f-5',
    type: 'Call',
    subject: 'Node license contract check-in',
    clientName: 'Kristin Watson (Amazon)',
    date: '2026-07-30',
    time: '11:00 AM',
    notes: 'License fee adjustments approved by representative.',
    status: 'Completed',
    owner: 'Sarah Connor'
  }
];

export const getFollowups = () => {
  const cached = localStorage.getItem('panorama_followups');
  if (cached) return JSON.parse(cached);
  localStorage.setItem('panorama_followups', JSON.stringify(MOCK_FOLLOWUPS));
  return MOCK_FOLLOWUPS;
};

export const saveFollowups = (list) => {
  localStorage.setItem('panorama_followups', JSON.stringify(list));
};
