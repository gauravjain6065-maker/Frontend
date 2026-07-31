import React, { useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Input, Select, Textarea } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Save, X } from 'lucide-react';

export function EditLead({ onNavigate }) {
  const [formData, setFormData] = useState({
    company: 'Acme Corporation',
    contactName: 'John Smith',
    contactEmail: 'john.smith@acmecorp.com',
    contactPhone: '+1 (555) 234-5678',
    estimatedValue: '45000',
    assignedTo: 'Sarah Jenkins',
    status: 'Proposal Sent',
    priority: 'High',
    source: 'Website',
    notes: 'Client interested in Enterprise tier with multi-user SSO integration.',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      if (onNavigate) onNavigate('LeadDetails');
    }, 1000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Edit Lead"
        subtitle="Modify opportunity details, priority, stage, and representative allocation."
      />

      {submitted && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800 font-semibold">
          ✓ Lead details updated successfully! Redirecting to Lead Details...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Card title="Lead Information" subtitle="Lead ID: LD-4091">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <Input
              label="Company Name"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />

            <Input
              label="Primary Contact Name"
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
            />

            <Input
              label="Contact Email"
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
            />

            <Input
              label="Contact Phone"
              value={formData.contactPhone}
              onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
            />

            <Input
              label="Estimated Deal Value ($)"
              type="number"
              value={formData.estimatedValue}
              onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
            />

            <Select
              label="Assigned Representative"
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
              options={[
                { value: 'Sarah Jenkins', label: 'Sarah Jenkins' },
                { value: 'Alex Rivera', label: 'Alex Rivera' },
                { value: 'David Kim', label: 'David Kim' },
                { value: 'Marcus Johnson', label: 'Marcus Johnson' },
                { value: 'Unassigned', label: 'Unassigned' },
              ]}
            />

            <Select
              label="Pipeline Stage"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={[
                { value: 'New', label: 'New' },
                { value: 'Contacted', label: 'Contacted' },
                { value: 'Qualified', label: 'Qualified' },
                { value: 'Proposal Sent', label: 'Proposal Sent' },
                { value: 'Negotiation', label: 'Negotiation' },
                { value: 'Won', label: 'Won' },
                { value: 'Lost', label: 'Lost' },
              ]}
            />

            <Select
              label="Priority Level"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              options={[
                { value: 'Low', label: 'Low' },
                { value: 'Medium', label: 'Medium' },
                { value: 'High', label: 'High' },
              ]}
            />
          </div>

          <Textarea
            label="Additional Notes / Scope"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={4}
          />

          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              icon={X}
              onClick={() => onNavigate && onNavigate('LeadDetails')}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" icon={Save}>
              Save Lead Changes
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
