import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Table } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { UserPlus, Mail, Phone } from 'lucide-react';

export function EmployeeList({ onNavigate }) {
  const navigate = (page) => {
    if (onNavigate) onNavigate(page);
  };

  const employees = [
    { id: 'EMP-101', name: 'Sarah Jenkins', email: 'sarah.j@crmsaas.com', phone: '+1 555-0192', role: 'Senior Sales Exec', department: 'Enterprise Sales', status: 'Active', leadsAssigned: 24 },
    { id: 'EMP-102', name: 'Alex Rivera', email: 'alex.r@crmsaas.com', phone: '+1 555-0143', role: 'Account Executive', department: 'SMB Sales', status: 'Active', leadsAssigned: 19 },
    { id: 'EMP-103', name: 'David Kim', email: 'david.k@crmsaas.com', phone: '+1 555-0188', role: 'Sales Exec', department: 'Enterprise Sales', status: 'Active', leadsAssigned: 22 },
    { id: 'EMP-104', name: 'Emily Zhang', email: 'emily.z@crmsaas.com', phone: '+1 555-0177', role: 'Junior Representative', department: 'Inbound Sales', status: 'On Leave', leadsAssigned: 15 },
    { id: 'EMP-105', name: 'Marcus Johnson', email: 'marcus.j@crmsaas.com', phone: '+1 555-0165', role: 'Sales Development Rep', department: 'Outbound', status: 'Active', leadsAssigned: 30 },
    { id: 'EMP-106', name: 'Rachel Adams', email: 'rachel.a@crmsaas.com', phone: '+1 555-0122', role: 'Account Manager', department: 'Customer Success', status: 'Inactive', leadsAssigned: 0 },
  ];

  const columns = [
    {
      header: 'Employee Name',
      accessorKey: 'name',
      render: (row) => (
        <div onClick={() => navigate('EmployeeDetails')} className="cursor-pointer hover:underline">
          <span className="font-semibold text-gray-900 block">{row.name}</span>
          <span className="text-xs text-gray-500">{row.id}</span>
        </div>
      ),
    },
    {
      header: 'Contact Info',
      accessorKey: 'email',
      render: (row) => (
        <div className="space-y-0.5 text-xs text-gray-600">
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-gray-400" />
            <span>{row.email}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-gray-400" />
            <span>{row.phone}</span>
          </div>
        </div>
      ),
    },
    { header: 'Role', accessorKey: 'role' },
    { header: 'Department', accessorKey: 'department' },
    {
      header: 'Active Leads',
      accessorKey: 'leadsAssigned',
      render: (row) => <span className="font-medium text-gray-800">{row.leadsAssigned}</span>,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      render: (row) => (
        <Badge
          variant={
            row.status === 'Active' ? 'success' : row.status === 'On Leave' ? 'warning' : 'danger'
          }
        >
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Employee Directory"
        subtitle="Manage and monitor all team members, assigned accounts, and activity status."
        actions={
          <Button variant="primary" icon={UserPlus} onClick={() => navigate('CreateEmployee')}>
            Create Employee
          </Button>
        }
      />

      <Table
        columns={columns}
        data={employees}
        searchPlaceholder="Search employees by name, role, or ID..."
        filters={true}
        sortOptions={true}
        totalItems={employees.length}
        onViewRow={() => navigate('EmployeeDetails')}
        onEditRow={() => navigate('EditEmployee')}
        onDeleteRow={(row) => alert(`Deleted employee record: ${row.name}`)}
      />
    </div>
  );
}
