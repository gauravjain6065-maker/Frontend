/**
 * Mock Data for Subscription Module.
 */

export const CURRENT_PLAN = {
  name: 'Enterprise Premium',
  cost: '$249/month',
  billingCycle: 'Monthly',
  seatsUsed: 14,
  seatsTotal: 25,
  features: [
    'Unlimited leads, contacts & organizations',
    'Advanced workflow routing pipelines',
    'Custom reports & SVG analytics generation',
    'Enterprise SLA support (24/7/365)',
    '100 GB database storage limit'
  ],
  renewalDate: '2026-08-15',
  status: 'Active'
};

export const BILLING_HISTORY = [
  {
    id: 'inv-4581',
    date: '2026-07-15',
    amount: '$249.00',
    status: 'Paid',
    method: 'Credit Card (*4242)'
  },
  {
    id: 'inv-4520',
    date: '2026-06-15',
    amount: '$249.00',
    status: 'Paid',
    method: 'Credit Card (*4242)'
  },
  {
    id: 'inv-4458',
    date: '2026-05-15',
    amount: '$249.00',
    status: 'Paid',
    method: 'Credit Card (*4242)'
  },
  {
    id: 'inv-4392',
    date: '2026-04-15',
    amount: '$249.00',
    status: 'Paid',
    method: 'Credit Card (*4242)'
  }
];
