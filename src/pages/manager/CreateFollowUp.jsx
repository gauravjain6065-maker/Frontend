import React, { useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Input, Select, Textarea } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Save, X } from 'lucide-react';

export function CreateFollowUp({ onNavigate }) {
  const [formData, setFormData] = useState({
    leadId: 'LD-4091 (Acme Corporation)',
    contactPerson: 'John Smith',
    interactionType: 'Phone Call',
    date: '',
    time: '10:00',
    assignedTo: 'Sarah Jenkins',
    reminder: '15 minutes before',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      if (onNavigate) onNavigate('FollowUpList');
    }, 1000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Schedule Follow-up"
        subtitle="Set up a sales call, product demo, or check-in reminder for an active lead."
      />

      {submitted && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800 font-semibold">
          ✓ Follow-up event scheduled successfully! Redirecting to Follow-up List...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Card title="Follow-up Details" subtitle="Specify date, time, and reminder preference.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <Select
              label="Select Lead / Opportunity"
              value={formData.leadId}
              onChange={(e) => setFormData({ ...formData, leadId: e.target.value })}
              options={[
                { value: 'LD-4091 (Acme Corporation)', label: 'Acme Corporation ($45,000)' },
                { value: 'LD-4090 (Starlight Tech)', label: 'Starlight Tech ($12,500)' },
                { value: 'LD-4089 (Global Logistics)', label: 'Global Logistics Corp ($85,000)' },
              ]}
            />

            <Select
              label="Interaction Type"
              value={formData.interactionType}
              onChange={(e) => setFormData({ ...formData, interactionType: e.target.value })}
              options={[
                { value: 'Phone Call', label: 'Phone Call' },
                { value: 'Product Demo', label: 'Product Demo' },
                { value: 'Email Follow-up', label: 'Email Follow-up' },
                { value: 'In-Person Meeting', label: 'In-Person Meeting' },
              ]}
            />

            <Input
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />

            <Input
              label="Time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />

            <Select
              label="Assigned Representative"
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
              options={[
                { value: 'Sarah Jenkins', label: 'Sarah Jenkins' },
                { value: 'Alex Rivera', label: 'Alex Rivera' },
                { value: 'David Kim', label: 'David Kim' },
              ]}
            />

            <Select
              label="Notification Reminder"
              value={formData.reminder}
              onChange={(e) => setFormData({ ...formData, reminder: e.target.value })}
              options={[
                { value: 'At time of event', label: 'At time of event' },
                { value: '15 minutes before', label: '15 minutes before' },
                { value: '1 hour before', label: '1 hour before' },
                { value: '1 day before', label: '1 day before' },
              ]}
            />
          </div>

          <Textarea
            label="Agenda / Notes"
            placeholder="Key points to discuss during the call..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
          />

          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              icon={X}
              onClick={() => onNavigate && onNavigate('FollowUpList')}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" icon={Save}>
              Schedule Follow-up
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
