import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { UserPlus } from 'lucide-react';

export function ContactList({ onNavigate }) {
  const navigate = (page) => {
    if (onNavigate) onNavigate(page);
  };

  const contacts = [
    { id: 'CNT-501', name: 'John Smith', title: 'VP of Operations', company: 'Acme Corporation', email: 'john.smith@acmecorp.com', phone: '+1 555-234-5678', lastActive: '2 hours ago' },
    { id: 'CNT-502', name: 'Karen Davis', title: 'Director of Procurement', company: 'Acme Corporation', email: 'karen.d@acmecorp.com', phone: '+1 555-234-5690', lastActive: 'Yesterday' },
    { id: 'CNT-503', name: 'Elena Rostova', title: 'Chief Technology Officer', company: 'Starlight Tech', email: 'elena@starlighttech.io', phone: '+1 555-443-1200', lastActive: '3 days ago' },
    { id: 'CNT-504', name: 'Marcus Vance', title: 'Supply Chain Lead', company: 'Global Logistics Corp', email: 'mvance@globallogistics.com', phone: '+1 555-980-3344', lastActive: 'Today' },
    { id: 'CNT-505', name: 'Alice Wong', title: 'Head of IT', company: 'TechGlobal Inc', email: 'alice.wong@techglobal.com', phone: '+1 555-881-9922', lastActive: '4 hours ago' },
  ];

  const columns = [
    {
      header: 'Contact Name',
      accessorKey: 'name',
      render: (row) => (
        <div onClick={() => navigate('ContactDetails')} className="cursor-pointer hover:underline">
          <span className="font-semibold text-gray-900 block">{row.name}</span>
          <span className="text-xs text-gray-500">{row.title}</span>
        </div>
      ),
    },
    {
      header: 'Company / Organization',
      accessorKey: 'company',
      render: (row) => (
        <span onClick={() => navigate('OrganizationDetails')} className="font-medium text-blue-600 cursor-pointer hover:underline">
          {row.company}
        </span>
      ),
    },
    {
      header: 'Email & Phone',
      accessorKey: 'email',
      render: (row) => (
        <div className="text-xs text-gray-600 space-y-0.5">
          <p>{row.email}</p>
          <p className="text-gray-400">{row.phone}</p>
        </div>
      ),
    },
    {
      header: 'Last Interaction',
      accessorKey: 'lastActive',
      render: (row) => <span className="text-xs text-gray-500">{row.lastActive}</span>,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Contact Directory"
        subtitle="Full list of enterprise client representatives, decision-makers, and key personnel."
        actions={
          <Button variant="primary" icon={UserPlus} onClick={() => alert('New Contact modal opened')}>
            Add Contact
          </Button>
        }
      />

      <Table
        columns={columns}
        data={contacts}
        searchPlaceholder="Search contacts by name, company, or email..."
        filters={true}
        sortOptions={true}
        totalItems={contacts.length}
        onViewRow={() => navigate('ContactDetails')}
        onEditRow={() => alert('Edit Contact dialog opened')}
        onDeleteRow={(row) => alert(`Deleted contact: ${row.name}`)}
      />
    </div>
  );
}
