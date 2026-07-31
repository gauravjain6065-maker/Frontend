import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Building2, Globe, UserPlus, PlusCircle, Edit3 } from 'lucide-react';

export function OrganizationDetails({ onNavigate }) {
  const navigate = (page) => {
    if (onNavigate) onNavigate(page);
  };

  const org = {
    id: 'ORG-101',
    name: 'Acme Corporation',
    industry: 'Industrial Manufacturing',
    tier: 'Enterprise Tier',
    website: 'https://www.acmecorp.com',
    phone: '+1 (800) 555-0199',
    headquarters: '100 Broadway Ave, New York, NY',
    totalValue: '$340,000',
    contactsCount: 14,
    activeLeadsCount: 3,
  };

  const contacts = [
    { id: 'CNT-501', name: 'John Smith', title: 'VP of Operations', email: 'john.smith@acmecorp.com', phone: '+1 555-234-5678' },
    { id: 'CNT-502', name: 'Karen Davis', title: 'Director of Procurement', email: 'karen.d@acmecorp.com', phone: '+1 555-234-5690' },
    { id: 'CNT-503', name: 'Robert Vance', title: 'IT Systems Lead', email: 'r.vance@acmecorp.com', phone: '+1 555-234-5611' },
  ];

  const assignedLeads = [
    { id: 'LD-4091', title: 'Acme ERP Cloud Migration', value: '$45,000', owner: 'Sarah Jenkins', stage: 'Proposal Sent' },
    { id: 'LD-4022', title: 'Supply Chain Analytics Add-on', value: '$120,000', owner: 'Alex Rivera', stage: 'Qualified' },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Organization Details"
        subtitle={`Viewing company profile for ${org.name}`}
        actions={
          <Button variant="secondary" icon={Edit3} onClick={() => alert('Editing Organization details')}>
            Edit Organization
          </Button>
        }
      />

      {/* Overview Card */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-900">{org.name}</h2>
                <Badge variant="purple">{org.tier}</Badge>
              </div>
              <p className="text-sm text-gray-500">{org.industry} • ID: {org.id}</p>
              <a href={org.website} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1">
                <Globe className="w-3.5 h-3.5" />
                {org.website}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t md:border-t-0 border-gray-200 pt-4 md:pt-0">
            <div>
              <span className="text-xs text-gray-400 block">Total Lifetime Value</span>
              <span className="text-xl font-bold text-gray-900">{org.totalValue}</span>
            </div>
            <div>
              <span className="text-xs text-gray-400 block">Headquarters</span>
              <span className="text-sm font-medium text-gray-800">{org.headquarters}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Grid: Contacts & Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contacts Card */}
        <Card
          title="Key Contacts"
          subtitle="Stakeholders associated with this account."
          action={<Button variant="secondary" size="sm" icon={UserPlus} onClick={() => navigate('ContactList')}>View All</Button>}
        >
          <div className="space-y-3">
            {contacts.map((c) => (
              <div
                key={c.id}
                onClick={() => navigate('ContactDetails')}
                className="p-3 border border-gray-200 rounded-lg flex items-center justify-between hover:bg-blue-50/50 cursor-pointer transition-colors"
              >
                <div>
                  <h4 className="text-sm font-semibold text-blue-600">{c.name}</h4>
                  <p className="text-xs text-gray-500">{c.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{c.email} • {c.phone}</p>
                </div>
                <span className="text-xs text-gray-400 font-mono">{c.id}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Active Leads Card */}
        <Card
          title="Associated Deals & Opportunities"
          subtitle="Active pipeline deals for this organization."
          action={<Button variant="secondary" size="sm" icon={PlusCircle} onClick={() => navigate('AssignLead')}>New Lead</Button>}
        >
          <div className="space-y-3">
            {assignedLeads.map((lead) => (
              <div
                key={lead.id}
                onClick={() => navigate('LeadDetails')}
                className="p-3 border border-gray-200 rounded-lg flex items-center justify-between hover:bg-blue-50/50 cursor-pointer transition-colors"
              >
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{lead.title}</h4>
                  <p className="text-xs text-gray-500">Owner: <span className="text-gray-800 font-medium">{lead.owner}</span></p>
                  <p className="text-xs text-blue-600 font-bold mt-1">{lead.value}</p>
                </div>
                <Badge variant="primary">{lead.stage}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
