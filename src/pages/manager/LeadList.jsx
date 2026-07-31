import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Table } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Target } from 'lucide-react';

export function LeadList({ onNavigate }) {
  const navigate = (page) => {
    if (onNavigate) onNavigate(page);
  };

  const leads = [
    { id: 'LD-4091', company: 'Acme Corporation', contact: 'John Smith', assignedTo: 'Sarah Jenkins', value: '$45,000', priority: 'High', status: 'Proposal Sent', source: 'Website' },
    { id: 'LD-4090', company: 'Starlight Tech', contact: 'Elena Rostova', assignedTo: 'Alex Rivera', value: '$12,500', priority: 'Medium', status: 'New', source: 'LinkedIn' },
    { id: 'LD-4089', company: 'Global Logistics Corp', contact: 'Marcus Vance', assignedTo: 'Unassigned', value: '$85,000', priority: 'High', status: 'Contacted', source: 'Referral' },
    { id: 'LD-4088', company: 'TechGlobal Inc', contact: 'Alice Wong', assignedTo: 'Sarah Jenkins', value: '$28,000', priority: 'Low', status: 'Qualified', source: 'Inbound Call' },
    { id: 'LD-4087', company: 'Apex Innovations', contact: 'David Miller', assignedTo: 'David Kim', value: '$54,000', priority: 'High', status: 'Negotiation', source: 'Webinar' },
    { id: 'LD-4086', company: 'Nexus Retail Solutions', contact: 'Chloe Bennett', assignedTo: 'Marcus Johnson', value: '$31,000', priority: 'Medium', status: 'Won', source: 'Cold Email' },
    { id: 'LD-4085', company: 'Horizon Media', contact: 'Brian O\'Connor', assignedTo: 'Emily Zhang', value: '$18,000', priority: 'Low', status: 'Lost', source: 'Website' },
  ];

  const columns = [
    {
      header: 'Lead / Company',
      accessorKey: 'company',
      render: (row) => (
        <div onClick={() => navigate('LeadDetails')} className="cursor-pointer hover:underline">
          <span className="font-semibold text-gray-900 block">{row.company}</span>
          <span className="text-xs text-gray-500">{row.id} • Source: {row.source}</span>
        </div>
      ),
    },
    { header: 'Contact Person', accessorKey: 'contact' },
    {
      header: 'Assigned To',
      accessorKey: 'assignedTo',
      render: (row) => (
        <span
          onClick={() => navigate(row.assignedTo === 'Unassigned' ? 'AssignLead' : 'EmployeeDetails')}
          className={`cursor-pointer hover:underline ${
            row.assignedTo === 'Unassigned' ? 'text-red-500 font-semibold text-xs' : 'text-gray-700 font-medium'
          }`}
        >
          {row.assignedTo}
        </span>
      ),
    },
    {
      header: 'Value',
      accessorKey: 'value',
      render: (row) => <span className="font-semibold text-gray-900">{row.value}</span>,
    },
    {
      header: 'Priority',
      accessorKey: 'priority',
      render: (row) => (
        <Badge variant={row.priority === 'High' ? 'danger' : row.priority === 'Medium' ? 'warning' : 'neutral'}>
          {row.priority}
        </Badge>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      render: (row) => (
        <Badge variant={row.status === 'Won' ? 'success' : row.status === 'Lost' ? 'danger' : 'primary'}>
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Lead Directory"
        subtitle="View, filter, and manage sales opportunities and lead assignments across the pipeline."
        actions={
          <Button variant="primary" icon={Target} onClick={() => navigate('AssignLead')}>
            Assign / Create Lead
          </Button>
        }
      />

      <Table
        columns={columns}
        data={leads}
        searchPlaceholder="Search leads by company, contact, or ID..."
        filters={true}
        sortOptions={true}
        totalItems={leads.length}
        onViewRow={() => navigate('LeadDetails')}
        onEditRow={() => navigate('EditLead')}
        onDeleteRow={(row) => alert(`Deleted lead record: ${row.company}`)}
      />
    </div>
  );
}
