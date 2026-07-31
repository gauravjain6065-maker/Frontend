import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { User, Mail, Phone, Building2, Calendar, Edit3, MessageSquare, PhoneCall } from 'lucide-react';

export function ContactDetails() {
  const contact = {
    id: 'CNT-501',
    name: 'John Smith',
    title: 'VP of Operations',
    company: 'Acme Corporation',
    email: 'john.smith@acmecorp.com',
    phone: '+1 (555) 234-5678',
    location: 'New York, USA',
    createdDate: 'May 10, 2025',
  };

  const activities = [
    { id: 1, type: 'Email Sent', note: 'Sent revised product proposal v2.4 with customized SLAs', date: 'Jul 28, 2026', by: 'Sarah Jenkins' },
    { id: 2, type: 'Phone Call', note: '30-minute discovery call discussing Q4 cloud migration timeline', date: 'Jul 20, 2026', by: 'Sarah Jenkins' },
    { id: 3, type: 'Meeting Scheduled', note: 'In-person meeting at Acme HQ scheduled for Aug 05', date: 'Jul 15, 2026', by: 'David Kim' },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Contact Details"
        subtitle={`Profile overview for ${contact.name}`}
        actions={
          <>
            <Button variant="secondary" icon={PhoneCall}>Log Call</Button>
            <Button variant="primary" icon={Edit3}>Edit Contact</Button>
          </>
        }
      />

      {/* Overview Card */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 font-bold text-xl flex items-center justify-center border border-blue-200">
              JS
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{contact.name}</h2>
              <p className="text-sm font-medium text-gray-600">{contact.title} at <span className="text-blue-600 font-semibold">{contact.company}</span></p>
              <p className="text-xs text-gray-400 mt-0.5">ID: {contact.id} • Added: {contact.createdDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs border-t md:border-t-0 border-gray-200 pt-4 md:pt-0">
            <div>
              <span className="text-gray-400 block">Email Address</span>
              <span className="font-medium text-gray-900">{contact.email}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Phone Number</span>
              <span className="font-medium text-gray-900">{contact.phone}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Grid: Org Info & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Card title="Organization Overview">
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-400 block">Company</span>
                <span className="font-bold text-gray-900 text-sm">{contact.company}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Location</span>
                <span className="font-medium text-gray-700">{contact.location}</span>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <a href="/organization-details" className="text-blue-600 hover:underline font-medium">
                  View Organization Profile →
                </a>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card title="Recent Activity & Touchpoints">
            <div className="space-y-4">
              {activities.map((act) => (
                <div key={act.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="primary">{act.type}</Badge>
                    <span className="text-xs text-gray-400">{act.date}</span>
                  </div>
                  <p className="text-sm text-gray-800 font-medium">{act.note}</p>
                  <p className="text-xs text-gray-400 mt-1">Logged by: {act.by}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
