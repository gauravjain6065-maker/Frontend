import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Edit3 } from 'lucide-react';

export function EmployeeDetails({ onNavigate }) {
  const navigate = (page) => {
    if (onNavigate) onNavigate(page);
  };

  const employee = {
    id: 'EMP-101',
    name: 'Sarah Jenkins',
    role: 'Senior Sales Executive',
    department: 'Enterprise Sales',
    email: 'sarah.j@crmsaas.com',
    phone: '+1 (555) 019-2834',
    location: 'New York, USA',
    startDate: 'Jan 15, 2024',
    status: 'Active',
    quota: '$75,000 / month',
    achieved: '$68,400 (91%)',
    leadsAssigned: 24,
    dealsClosed: 8,
  };

  const assignedLeads = [
    { id: 'LD-4091', company: 'Acme Corporation', contact: 'John Smith', status: 'Proposal Sent', value: '$45,000' },
    { id: 'LD-4088', company: 'TechGlobal Inc', contact: 'Alice Wong', status: 'Qualified', value: '$28,000' },
    { id: 'LD-4075', company: 'Nexus Logistics', contact: 'Robert Vance', status: 'Negotiation', value: '$62,000' },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Employee Details"
        subtitle={`Viewing profile and performance for ${employee.name}`}
        actions={
          <Button variant="secondary" icon={Edit3} onClick={() => navigate('EditEmployee')}>
            Edit Profile
          </Button>
        }
      />

      {/* Header Info Card */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl border-2 border-blue-200">
              SJ
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900">{employee.name}</h2>
                <Badge variant="success">{employee.status}</Badge>
              </div>
              <p className="text-sm text-gray-600 font-medium">{employee.role} • {employee.department}</p>
              <p className="text-xs text-gray-400 mt-1">ID: {employee.id} • Joined: {employee.startDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6">
            <div>
              <span className="text-gray-400 block">Email</span>
              <span className="font-semibold text-gray-800">{employee.email}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Phone</span>
              <span className="font-semibold text-gray-800">{employee.phone}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Location</span>
              <span className="font-semibold text-gray-800">{employee.location}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Performance Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <Card>
          <p className="text-xs text-gray-500 font-medium">Monthly Quota</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{employee.quota}</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-500 font-medium">Current Achievement</p>
          <p className="text-xl font-bold text-green-600 mt-1">{employee.achieved}</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-500 font-medium">Leads Assigned</p>
          <p className="text-xl font-bold text-blue-600 mt-1">{employee.leadsAssigned}</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-500 font-medium">Deals Closed</p>
          <p className="text-xl font-bold text-purple-600 mt-1">{employee.dealsClosed}</p>
        </Card>
      </div>

      {/* Assigned Leads Table */}
      <Card title="Assigned Leads" subtitle="Leads currently managed by Sarah Jenkins.">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500">
                <th className="pb-3">Lead ID</th>
                <th className="pb-3">Company</th>
                <th className="pb-3">Primary Contact</th>
                <th className="pb-3">Est. Value</th>
                <th className="pb-3 text-right">Stage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assignedLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => navigate('LeadDetails')}
                >
                  <td className="py-3 font-medium text-blue-600">{lead.id}</td>
                  <td className="py-3 font-semibold text-gray-900">{lead.company}</td>
                  <td className="py-3 text-gray-600">{lead.contact}</td>
                  <td className="py-3 font-medium text-gray-800">{lead.value}</td>
                  <td className="py-3 text-right">
                    <Badge variant="primary">{lead.status}</Badge>
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
