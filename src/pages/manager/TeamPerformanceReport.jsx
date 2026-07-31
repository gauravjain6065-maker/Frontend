import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Trophy, TrendingUp, DollarSign, Award, Download } from 'lucide-react';

export function TeamPerformanceReport() {
  const leaderboard = [
    { rank: 1, name: 'Sarah Jenkins', role: 'Senior Sales Exec', closedRevenue: '$145,000', quotaTarget: '$120,000', achievement: '120.8%', leadsWon: 14 },
    { rank: 2, name: 'David Kim', role: 'Sales Exec', closedRevenue: '$98,000', quotaTarget: '$90,000', achievement: '108.8%', leadsWon: 9 },
    { rank: 3, name: 'Alex Rivera', role: 'Account Executive', closedRevenue: '$84,000', quotaTarget: '$80,000', achievement: '105.0%', leadsWon: 8 },
    { rank: 4, name: 'Marcus Johnson', role: 'SDR', closedRevenue: '$62,000', quotaTarget: '$70,000', achievement: '88.5%', leadsWon: 6 },
    { rank: 5, name: 'Emily Zhang', role: 'Junior Representative', closedRevenue: '$41,000', quotaTarget: '$50,000', achievement: '82.0%', leadsWon: 4 },
  ];

  const monthlyTrend = [
    { month: 'Jan', revenue: 65 },
    { month: 'Feb', revenue: 78 },
    { month: 'Mar', revenue: 92 },
    { month: 'Apr', revenue: 85 },
    { month: 'May', revenue: 110 },
    { month: 'Jun', revenue: 135 },
    { month: 'Jul', revenue: 148 },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Team Performance Report"
        subtitle="Analytical insights into sales team revenue generation, quota attainment, and leaderboards."
        actions={
          <Button variant="secondary" icon={Download}>
            Export PDF Report
          </Button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <Card>
          <p className="text-xs text-gray-500 font-medium">Total Team Revenue</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">$430,000</p>
          <span className="text-xs font-medium text-green-600">+14.2% vs target</span>
        </Card>
        <Card>
          <p className="text-xs text-gray-500 font-medium">Avg Deal Cycle</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">18 Days</p>
          <span className="text-xs font-medium text-green-600">-3 days faster</span>
        </Card>
        <Card>
          <p className="text-xs text-gray-500 font-medium">Top Performer</p>
          <p className="text-xl font-bold text-blue-600 mt-1">Sarah Jenkins</p>
          <span className="text-xs text-gray-500">120.8% of Quota</span>
        </Card>
        <Card>
          <p className="text-xs text-gray-500 font-medium">Overall Team Win Rate</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">34.2%</p>
          <span className="text-xs font-medium text-green-600">+2.1% this quarter</span>
        </Card>
      </div>

      {/* Chart & Quota breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend Chart */}
        <Card title="Monthly Team Revenue Trend ($k)" className="lg:col-span-2">
          <div className="h-64 flex items-end justify-between gap-4 pt-8 pb-4 px-2">
            {monthlyTrend.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="text-xs font-semibold text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  ${item.revenue}k
                </div>
                <div
                  className="w-full bg-blue-600 hover:bg-blue-700 rounded-t transition-all"
                  style={{ height: `${(item.revenue / 160) * 100}%` }}
                />
                <span className="text-xs text-gray-500 font-medium">{item.month}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Rep Card */}
        <Card title="Quarterly MVP">
          <div className="text-center py-4 space-y-3">
            <div className="w-16 h-16 bg-amber-50 border-2 border-amber-300 rounded-full flex items-center justify-center mx-auto text-amber-600">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Sarah Jenkins</h3>
              <p className="text-xs text-gray-500">Senior Sales Exec</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-xs space-y-1">
              <p className="text-gray-600">Closed Revenue: <span className="font-bold text-gray-900">$145,000</span></p>
              <p className="text-gray-600">Deals Won: <span className="font-bold text-green-600">14 Deals</span></p>
            </div>
          </div>
        </Card>
      </div>

      {/* Leaderboard Table */}
      <Card title="Team Quota Leaderboard" subtitle="Detailed breakdown of sales rep performance against targets.">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500">
                <th className="pb-3">Rank</th>
                <th className="pb-3">Representative</th>
                <th className="pb-3">Closed Revenue</th>
                <th className="pb-3">Quota Target</th>
                <th className="pb-3">Deals Won</th>
                <th className="pb-3 text-right">Quota Attainment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leaderboard.map((rep) => (
                <tr key={rep.rank} className="hover:bg-gray-50/50">
                  <td className="py-3 font-bold text-gray-700">#{rep.rank}</td>
                  <td className="py-3 font-semibold text-gray-900">{rep.name}</td>
                  <td className="py-3 font-medium text-gray-900">{rep.closedRevenue}</td>
                  <td className="py-3 text-gray-500">{rep.quotaTarget}</td>
                  <td className="py-3 text-gray-800 font-medium">{rep.leadsWon}</td>
                  <td className="py-3 text-right">
                    <Badge variant={parseFloat(rep.achievement) >= 100 ? 'success' : 'warning'}>
                      {rep.achievement}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
