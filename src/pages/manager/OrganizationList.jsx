import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Table } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Plus } from 'lucide-react';

export function OrganizationList({ onNavigate }) {
  const navigate = (page) => {
    if (onNavigate) onNavigate(page);
  };

  const organizations = [
    { id: 'ORG-101', name: 'Acme Corporation', industry: 'Manufacturing', location: 'New York, USA', contacts: 14, leads: 3, tier: 'Enterprise' },
    { id: 'ORG-102', name: 'TechGlobal Inc', industry: 'Software / IT', location: 'San Francisco, USA', contacts: 8, leads: 2, tier: 'Mid-Market' },
    { id: 'ORG-103', name: 'Starlight Tech', industry: 'Telecommunications', location: 'Austin, USA', contacts: 5, leads: 1, tier: 'SMB' },
    { id: 'ORG-104', name: 'Apex Innovations', industry: 'Financial Services', location: 'London, UK', contacts: 22, leads: 5, tier: 'Enterprise' },
    { id: 'ORG-105', name: 'Global Logistics Corp', industry: 'Logistics', location: 'Chicago, USA', contacts: 11, leads: 4, tier: 'Enterprise' },
  ];

  const columns = [
    {
      header: 'Organization Name',
      accessorKey: 'name',
      render: (row) => (
        <div onClick={() => navigate('OrganizationDetails')} className="cursor-pointer hover:underline">
          <span className="font-semibold text-gray-900 block">{row.name}</span>
          <span className="text-xs text-gray-500">{row.id}</span>
        </div>
      ),
    },
    { header: 'Industry', accessorKey: 'industry' },
    { header: 'Location', accessorKey: 'location' },
    {
      header: 'Contacts',
      accessorKey: 'contacts',
      render: (row) => <span className="font-medium text-gray-800">{row.contacts}</span>,
    },
    {
      header: 'Active Opportunities',
      accessorKey: 'leads',
      render: (row) => (
        <span onClick={() => navigate('LeadList')} className="font-medium text-blue-600 cursor-pointer hover:underline">
          {row.leads}
        </span>
      ),
    },
    {
      header: 'Account Tier',
      accessorKey: 'tier',
      render: (row) => (
        <Badge variant={row.tier === 'Enterprise' ? 'purple' : row.tier === 'Mid-Market' ? 'primary' : 'neutral'}>
          {row.tier}
        </Badge>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Organizations"
        subtitle="Manage client companies, enterprise accounts, and institutional contacts."
        actions={
          <Button variant="primary" icon={Plus} onClick={() => alert('New Organization modal opened')}>
            Add Organization
          </Button>
        }
      />

      <Table
        columns={columns}
        data={organizations}
        searchPlaceholder="Search organizations by name, industry, or location..."
        filters={true}
        sortOptions={true}
        totalItems={organizations.length}
        onViewRow={() => navigate('OrganizationDetails')}
        onEditRow={() => alert('Editing Organization details...')}
        onDeleteRow={(row) => alert(`Deleted organization: ${row.name}`)}
      />
    </div>
  );
}
