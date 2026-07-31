import React, { useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Table } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Plus } from 'lucide-react';

export function FollowUpList({ onNavigate }) {
  const [tab, setTab] = useState('upcoming');

  const navigate = (page) => {
    if (onNavigate) onNavigate(page);
  };

  const followUps = [
    { id: 'FL-201', lead: 'Acme Corporation', contact: 'John Smith', assignedTo: 'Sarah Jenkins', type: 'Call', date: 'Aug 02, 2026', time: '10:00 AM', status: 'Scheduled' },
    { id: 'FL-202', lead: 'Starlight Tech', contact: 'Elena Rostova', assignedTo: 'Alex Rivera', type: 'Email', date: 'Aug 03, 2026', time: '02:30 PM', status: 'Scheduled' },
    { id: 'FL-203', lead: 'Global Logistics Corp', contact: 'Marcus Vance', assignedTo: 'David Kim', type: 'Demo Meeting', date: 'Aug 04, 2026', time: '11:15 AM', status: 'Scheduled' },
    { id: 'FL-198', lead: 'TechGlobal Inc', contact: 'Alice Wong', assignedTo: 'Sarah Jenkins', type: 'Call', date: 'Jul 28, 2026', time: '04:00 PM', status: 'Completed' },
    { id: 'FL-197', lead: 'Apex Innovations', contact: 'David Miller', assignedTo: 'Marcus Johnson', type: 'Review', date: 'Jul 27, 2026', time: '01:00 PM', status: 'Completed' },
  ];

  const filteredData = followUps.filter((item) =>
    tab === 'upcoming' ? item.status === 'Scheduled' : item.status === 'Completed'
  );

  const columns = [
    {
      header: 'Lead / Company',
      accessorKey: 'lead',
      render: (row) => (
        <div onClick={() => navigate('LeadDetails')} className="cursor-pointer hover:underline">
          <span className="font-semibold text-gray-900 block">{row.lead}</span>
          <span className="text-xs text-gray-500">Contact: {row.contact}</span>
        </div>
      ),
    },
    { header: 'Assigned To', accessorKey: 'assignedTo' },
    {
      header: 'Interaction Type',
      accessorKey: 'type',
      render: (row) => <Badge variant="neutral">{row.type}</Badge>,
    },
    {
      header: 'Date & Time',
      accessorKey: 'date',
      render: (row) => (
        <span className="text-xs font-medium text-gray-800">
          {row.date} at {row.time}
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      render: (row) => (
        <Badge variant={row.status === 'Completed' ? 'success' : 'warning'}>
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Follow-ups"
        subtitle="Track upcoming sales calls, scheduled product demos, and completed touchpoints."
        actions={
          <Button variant="primary" icon={Plus} onClick={() => navigate('CreateFollowUp')}>
            Schedule Follow-up
          </Button>
        }
      />

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-1">
        <button
          onClick={() => setTab('upcoming')}
          className={`px-4 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
            tab === 'upcoming' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Upcoming Follow-ups (3)
        </button>
        <button
          onClick={() => setTab('completed')}
          className={`px-4 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
            tab === 'completed' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Completed (2)
        </button>
      </div>

      <Table
        columns={columns}
        data={filteredData}
        searchPlaceholder="Search follow-ups by lead name or contact..."
        filters={true}
        sortOptions={true}
        totalItems={filteredData.length}
        onViewRow={() => navigate('LeadDetails')}
        onEditRow={() => navigate('CreateFollowUp')}
        onDeleteRow={(row) => alert(`Cancelled follow-up for: ${row.lead}`)}
      />
    </div>
  );
}
