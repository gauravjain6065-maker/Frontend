/**
 * Mock Data for Reports Module.
 */

export const OVERVIEW_METRICS = [
  { id: 'rep-1', title: 'Average Sales Velocity', value: '18.4 Days', change: '-2.4 Days', trend: 'up', trendLabel: 'faster than last month' },
  { id: 'rep-2', title: 'Lead Conversion Rate', value: '14.82%', change: '+1.62%', trend: 'up', trendLabel: 'from Q1 average' },
  { id: 'rep-3', title: 'Average Deal Value', value: '$642,800', change: '+$84,500', trend: 'up', trendLabel: 'from last quarter' },
  { id: 'rep-4', title: 'Quota Attainment', value: '94.2%', change: '+4.8%', trend: 'up', trendLabel: 'average company wide' }
];

export const LEAD_REPORT_STATS = [
  { id: 'ls-1', title: 'Inbound Leads', value: '452', change: '+24.5%', trend: 'up', trendLabel: 'from organic/search' },
  { id: 'ls-2', title: 'Outbound Leads', value: '124', change: '+12.1%', trend: 'up', trendLabel: 'from email/outreach' },
  { id: 'ls-3', title: 'MQL to SQL Ratio', value: '38.4%', change: '+2.1%', trend: 'up', trendLabel: 'qualification rate' },
  { id: 'ls-4', title: 'Rejected Leads', value: '18', change: '-4.8%', trend: 'up', trendLabel: 'bad contact data' }
];

export const EMPLOYEE_PERFORMANCE = [
  { name: 'Agent Smith', closedDeals: 15, pipelineValue: '$1,840,000', conversion: '18.2%', activityCount: 142 },
  { name: 'Trinity Bell', closedDeals: 12, pipelineValue: '$1,420,000', conversion: '15.6%', activityCount: 118 },
  { name: 'Thomas Anderson', closedDeals: 6, pipelineValue: '$920,000', conversion: '12.4%', activityCount: 98 },
  { name: 'Cypher Reagan', closedDeals: 0, pipelineValue: '$0', conversion: '0.0%', activityCount: 0 }
];

export const MANAGER_PIPELINES = [
  { name: 'Sarah Connor', teamSize: 2, teamPipeline: '$3,260,000', closedDeals: 27, status: 'On Target' },
  { name: 'John Connor', teamSize: 1, teamPipeline: '$920,000', closedDeals: 6, status: 'On Target' },
  { name: 'Marcus Wright', teamSize: 1, teamPipeline: '$0', closedDeals: 0, status: 'Below Target' },
  { name: 'Kyle Reese', teamSize: 0, teamPipeline: '$0', closedDeals: 0, status: 'Inactive' }
];
