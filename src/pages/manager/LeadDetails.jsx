import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Edit3, UserCheck, PlusCircle, MessageSquare } from 'lucide-react';

export function LeadDetails({ onNavigate }) {
  const navigate = (page) => {
    if (onNavigate) onNavigate(page);
  };

  const lead = {
    id: 'LD-4091',
    company: 'Acme Corporation',
    contact: 'John Smith',
    contactTitle: 'VP of Operations',
    email: 'john.smith@acmecorp.com',
    phone: '+1 (555) 234-5678',
    assignedTo: 'Sarah Jenkins',
    value: '$45,000',
    status: 'Proposal Sent',
    priority: 'High',
    source: 'Website Organic',
    createdDate: 'Jul 12, 2026',
  };

  const timeline = [
    { id: 1, action: 'Proposal Document Sent', date: 'Jul 28, 2026 - 02:30 PM', by: 'Sarah Jenkins' },
    { id: 2, action: 'Discovery Call Completed', date: 'Jul 20, 2026 - 11:00 AM', by: 'Sarah Jenkins' },
    { id: 3, action: 'Lead Assigned to Sarah Jenkins', date: 'Jul 14, 2026 - 09:15 AM', by: 'Manager' },
    { id: 4, action: 'Lead Created from Web Form', date: 'Jul 12, 2026 - 04:45 PM', by: 'System' },
  ];

  const followUps = [
    { id: 1, title: 'Contract Review Sync', date: 'Aug 02, 2026, 10:00 AM', status: 'Scheduled' },
    { id: 2, title: 'Follow-up Email regarding Pricing', date: 'Jul 29, 2026, 04:00 PM', status: 'Completed' },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Lead Details"
        subtitle={`Opportunity overview for ${lead.company}`}
        actions={
          <>
            <Button variant="secondary" icon={UserCheck} onClick={() => navigate('AssignLead')}>Reassign</Button>
            <Button variant="primary" icon={Edit3} onClick={() => navigate('EditLead')}>Edit Lead</Button>
          </>
        }
      />

      {/* Header Info */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">{lead.company}</h2>
              <Badge variant="primary">{lead.status}</Badge>
              <Badge variant="danger">{lead.priority} Priority</Badge>
            </div>
            <p className="text-sm text-gray-500">Lead ID: {lead.id} • Created: {lead.createdDate} • Source: {lead.source}</p>
          </div>

          <div className="flex items-center gap-6 border-t md:border-t-0 border-gray-200 pt-4 md:pt-0">
            <div>
              <span className="text-xs text-gray-400 block">Est. Deal Value</span>
              <span className="text-xl font-bold text-gray-900">{lead.value}</span>
            </div>
            <div>
              <span className="text-xs text-gray-400 block">Owner</span>
              <span onClick={() => navigate('EmployeeDetails')} className="text-sm font-semibold text-blue-600 cursor-pointer hover:underline">
                {lead.assignedTo}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Contact & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Contact & Organization Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div
                onClick={() => navigate('ContactDetails')}
                className="p-3 border border-gray-100 rounded-lg bg-gray-50/50 cursor-pointer hover:bg-blue-50/50 transition-colors"
              >
                <span className="text-xs text-gray-400 font-medium block">Contact Person</span>
                <span className="font-semibold text-blue-600">{lead.contact}</span>
                <span className="text-xs text-gray-500 block">{lead.contactTitle}</span>
              </div>
              <div className="p-3 border border-gray-100 rounded-lg bg-gray-50/50">
                <span className="text-xs text-gray-400 font-medium block">Email Address</span>
                <span className="font-medium text-gray-800">{lead.email}</span>
              </div>
              <div className="p-3 border border-gray-100 rounded-lg bg-gray-50/50">
                <span className="text-xs text-gray-400 font-medium block">Phone Number</span>
                <span className="font-medium text-gray-800">{lead.phone}</span>
              </div>
              <div
                onClick={() => navigate('EmployeeDetails')}
                className="p-3 border border-gray-100 rounded-lg bg-gray-50/50 cursor-pointer hover:bg-blue-50/50 transition-colors"
              >
                <span className="text-xs text-gray-400 font-medium block">Assigned Representative</span>
                <span className="font-medium text-blue-600">{lead.assignedTo}</span>
              </div>
            </div>
          </Card>

          {/* Activity Timeline */}
          <Card title="Lead Timeline" subtitle="History of interactions and stage changes.">
            <div className="space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
              {timeline.map((item) => (
                <div key={item.id} className="flex items-start gap-4 relative pl-6">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600 absolute left-0 top-1.5 ring-4 ring-white" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{item.action}</p>
                    <p className="text-xs text-gray-500">{item.date} • By: {item.by}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Col: Notes & Follow-ups */}
        <div className="space-y-6">
          <Card 
            title="Scheduled Follow-ups" 
            action={<Button variant="secondary" size="sm" icon={PlusCircle} onClick={() => navigate('CreateFollowUp')}>Add</Button>}
          >
            <div className="space-y-3">
              {followUps.map((fu) => (
                <div
                  key={fu.id}
                  onClick={() => navigate('FollowUpList')}
                  className="p-3 border border-gray-200 rounded-lg text-xs space-y-1 cursor-pointer hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800">{fu.title}</span>
                    <Badge variant={fu.status === 'Completed' ? 'success' : 'warning'}>{fu.status}</Badge>
                  </div>
                  <p className="text-gray-500">{fu.date}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Manager Notes">
            <textarea
              placeholder="Add manager internal notes..."
              className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              rows={4}
            />
            <Button variant="primary" size="sm" icon={MessageSquare} className="w-full" onClick={() => alert('Internal note posted successfully')}>
              Post Note
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
