/**
 * Mock Data & Storage Helpers for Deals Module.
 */

export const MOCK_DEALS = [
  { id: 'd-1', deal_name: 'Acme Cloud Expansion', lead: 'Acme Corp', lead_id: 'l-1', employee_id: 'e-1', value: 240000, probability: 90, expected_close_date: '2026-08-30', status: 'Open' },
  { id: 'd-2', deal_name: 'TechStart Hardware License', lead: 'TechStart Inc', lead_id: 'l-2', employee_id: 'e-2', value: 85000, probability: 50, expected_close_date: '2026-09-15', status: 'Open' },
  { id: 'd-3', deal_name: 'Nexus Software Platform', lead: 'Nexus Software', lead_id: 'l-3', employee_id: 'e-3', value: 120000, probability: 90, expected_close_date: '2026-08-25', status: 'Won' },
  { id: 'd-4', deal_name: 'Apex Health Systems Integration', lead: 'Apex Health', lead_id: 'l-4', employee_id: 'e-1', value: 350000, probability: 90, expected_close_date: '2026-08-20', status: 'Won' },
  { id: 'd-5', deal_name: 'Vanguard Retail POS Upgrade', lead: 'Vanguard Retail', lead_id: 'l-5', employee_id: 'e-2', value: 45000, probability: 10, expected_close_date: '2026-08-01', status: 'Lost' },
  { id: 'd-6', deal_name: 'Global Logistics Fleet Tracking', lead: 'Global Logistics', lead_id: 'l-6', employee_id: 'e-3', value: 180000, probability: 50, expected_close_date: '2026-09-05', status: 'Open' },
  { id: 'd-7', deal_name: 'Solaris Energy Grid Software', lead: 'Solaris Energy', lead_id: 'l-7', employee_id: 'e-1', value: 520000, probability: 90, expected_close_date: '2026-08-28', status: 'Won' },
  { id: 'd-8', deal_name: 'FinTech Cloud Infrastructure', lead: 'FinTech Cloud', lead_id: 'l-8', employee_id: 'e-2', value: 95000, probability: 50, expected_close_date: '2026-09-10', status: 'Open' },
  { id: 'd-9', deal_name: 'BioGen Lab Automation', lead: 'BioGen Inc', lead_id: 'l-9', employee_id: 'e-3', value: 210000, probability: 90, expected_close_date: '2026-08-22', status: 'Won' },
  { id: 'd-10', deal_name: 'OmniMedia Streaming Pipeline', lead: 'OmniMedia', lead_id: 'l-10', employee_id: 'e-1', value: 160000, probability: 50, expected_close_date: '2026-09-01', status: 'Open' },
  { id: 'd-11', deal_name: 'CyberShield Security Renewal', lead: 'CyberShield', lead_id: 'l-11', employee_id: 'e-2', value: 115000, probability: 90, expected_close_date: '2026-08-18', status: 'Won' },
  { id: 'd-12', deal_name: 'HyperDrive Server Cluster', lead: 'HyperDrive', lead_id: 'l-12', employee_id: 'e-3', value: 290000, probability: 10, expected_close_date: '2026-08-10', status: 'Lost' },
  { id: 'd-13', deal_name: 'Quantum AI Research License', lead: 'Quantum AI', lead_id: 'l-13', employee_id: 'e-1', value: 410000, probability: 90, expected_close_date: '2026-09-20', status: 'Open' },
  { id: 'd-14', deal_name: 'Skyline Aviation CRM Rollout', lead: 'Skyline Aviation', lead_id: 'l-14', employee_id: 'e-2', value: 175000, probability: 50, expected_close_date: '2026-09-12', status: 'Open' },
  { id: 'd-15', deal_name: 'EcoEnergy Solar Analytics', lead: 'EcoEnergy', lead_id: 'l-15', employee_id: 'e-3', value: 135000, probability: 90, expected_close_date: '2026-08-26', status: 'Won' },
  { id: 'd-16', deal_name: 'UrbanMobility Fleet App', lead: 'UrbanMobility', lead_id: 'l-16', employee_id: 'e-1', value: 220000, probability: 50, expected_close_date: '2026-09-30', status: 'Open' },
  { id: 'd-17', deal_name: 'PrimeBank Payments Gateway', lead: 'PrimeBank', lead_id: 'l-17', employee_id: 'e-2', value: 600000, probability: 90, expected_close_date: '2026-08-15', status: 'Won' },
  { id: 'd-18', deal_name: 'DataPulse BI Dashboard Suite', lead: 'DataPulse', lead_id: 'l-18', employee_id: 'e-3', value: 90000, probability: 10, expected_close_date: '2026-08-05', status: 'Lost' },
  { id: 'd-19', deal_name: 'NextGen Robotics Automation', lead: 'NextGen Robotics', lead_id: 'l-19', employee_id: 'e-1', value: 380000, probability: 50, expected_close_date: '2026-10-01', status: 'Open' },
  { id: 'd-20', deal_name: 'AlphaPharma Compliance Engine', lead: 'AlphaPharma', lead_id: 'l-20', employee_id: 'e-2', value: 260000, probability: 90, expected_close_date: '2026-08-29', status: 'Open' }
];

export const getDeals = () => {
  try {
    const cached = localStorage.getItem('panorama_deals');
    if (cached) return JSON.parse(cached);
  } catch (e) {}
  localStorage.setItem('panorama_deals', JSON.stringify(MOCK_DEALS));
  return MOCK_DEALS;
};

export const saveDeals = (list) => {
  localStorage.setItem('panorama_deals', JSON.stringify(list));
};
