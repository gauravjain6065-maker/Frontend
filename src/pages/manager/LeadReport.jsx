import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Download, PieChart, TrendingUp, Filter } from 'lucide-react';

export function LeadReport() {
  const statusBreakdown = [
    { stage: 'New Leads', count: 42, percentage: '28.0%', color: 'bg-blue-500' },
    { stage: 'Contacted', count: 35, percentage: '23.3%', color: 'bg-amber-500' },
    { stage: 'Qualified', count: 28, percentage: '18.6%', color: 'bg-indigo-500' },
    { stage: 'Proposal Sent', count: 22, percentage: '14.6%', color: 'bg-purple-500' },
    { stage: 'Negotiation', count: 12, percentage: '8.0%', color: 'bg-orange-500' },
    { stage: 'Closed Won', count: 11, percentage: '7.3%', color: 'bg-green-500' },
  ];

  const leadSources = [
    { source: 'Website Organic', leads: 54, conversion: '18.5%' },
    { source: 'Inbound Calls', leads: 32, conversion: '31.2%' },
    { source: 'LinkedIn Outbound', leads: 28, conversion: '14.0%' },
    { source: 'Client Referrals', leads: 22, conversion: '45.4%' },
    { source: 'Events & Webinars', leads: 14, conversion: '21.4%' },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Lead Analytics Report"
        subtitle="Distribution of opportunities across pipeline stages, conversion rates, and acquisition channels."
        actions={
          <Button variant="secondary" icon={Download}>
            Export Lead Report
          </Button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <Card>
          <p className="text-xs text-gray-500 font-medium">Total Active Pipeline</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">150 Leads</p>
          <span className="text-xs font-medium text-green-600">+12 new this week</span>
        </Card>
        <Card>
          <p className="text-xs text-gray-500 font-medium">Overall Conversion Rate</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">22.4%</p>
          <span className="text-xs font-medium text-green-600">+3.1% benchmark</span>
        </Card>
        <Card>
          <p className="text-xs text-gray-500 font-medium">Total Pipeline Value</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">$1,240,000</p>
          <span className="text-xs text-gray-500">Across 6 stages</span>
        </Card>
        <Card>
          <p className="text-xs text-gray-500 font-medium">Top Converting Source</p>
          <p className="text-xl font-bold text-gray-900 mt-1">Referrals</p>
          <span className="text-xs font-medium text-green-600">45.4% win rate</span>
        </Card>
      </div>

      {/* Funnel & Stage Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Breakdown Card */}
        <Card title="Pipeline Stage Breakdown" subtitle="Distribution of current leads by stage.">
          <div className="space-y-4 py-2">
            {statusBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-800">{item.stage}</span>
                  <span className="text-gray-500 font-medium">{item.count} leads ({item.percentage})</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: item.percentage }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Lead Source Table */}
        <Card title="Lead Acquisition Channels" subtitle="Performance metrics by lead channel.">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500">
                  <th className="pb-3">Source Channel</th>
                  <th className="pb-3">Total Leads</th>
                  <th className="pb-3 text-right">Win Conversion Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leadSources.map((src, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td className="py-3 font-semibold text-gray-900">{src.source}</td>
                    <td className="py-3 text-gray-700">{src.leads}</td>
                    <td className="py-3 text-right">
                      <Badge variant={parseFloat(src.conversion) >= 30 ? 'success' : 'primary'}>
                        {src.conversion}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
