import React, { useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Select, Textarea } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { UserCheck, CheckCircle2 } from 'lucide-react';

export function AssignLead({ onNavigate }) {
  const [selectedLeadId, setSelectedLeadId] = useState('LD-4089');
  const [selectedEmpId, setSelectedEmpId] = useState('EMP-101');
  const [notes, setNotes] = useState('');
  const [assignedSuccess, setAssignedSuccess] = useState(false);

  const leads = [
    { id: 'LD-4089', company: 'Global Logistics Corp', value: '$85,000', current: 'Unassigned', priority: 'High' },
    { id: 'LD-4090', company: 'Starlight Tech', value: '$12,500', current: 'Alex Rivera', priority: 'Medium' },
    { id: 'LD-4091', company: 'Acme Corporation', value: '$45,000', current: 'Sarah Jenkins', priority: 'High' },
  ];

  const employees = [
    { id: 'EMP-101', name: 'Sarah Jenkins', role: 'Senior Sales Exec', currentLeads: 24, capacity: 'High' },
    { id: 'EMP-102', name: 'Alex Rivera', role: 'Account Executive', currentLeads: 19, capacity: 'Optimal' },
    { id: 'EMP-103', name: 'David Kim', role: 'Sales Exec', currentLeads: 22, capacity: 'Optimal' },
    { id: 'EMP-105', name: 'Marcus Johnson', role: 'SDR', currentLeads: 30, capacity: 'At Limit' },
  ];

  const selectedLead = leads.find((l) => l.id === selectedLeadId);
  const selectedEmp = employees.find((e) => e.id === selectedEmpId);

  const handleConfirm = () => {
    setAssignedSuccess(true);
    setTimeout(() => {
      if (onNavigate) onNavigate('LeadList');
    }, 1200);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Assign Lead"
        subtitle="Distribute inbound or unassigned sales leads to specific sales representatives."
      />

      {assignedSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800 font-semibold">
          ✓ Lead successfully assigned to {selectedEmp?.name}! Redirecting to Lead Directory...
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="1. Select Lead">
          <Select
            label="Opportunity / Lead"
            value={selectedLeadId}
            onChange={(e) => setSelectedLeadId(e.target.value)}
            options={leads.map((l) => ({
              value: l.id,
              label: `${l.company} (${l.value} - ${l.priority} Priority)`,
            }))}
          />
          {selectedLead && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs space-y-1">
              <p className="font-semibold text-gray-800">{selectedLead.company}</p>
              <p className="text-gray-500">Value: <span className="font-medium text-gray-900">{selectedLead.value}</span></p>
              <p className="text-gray-500">Currently: <span className="font-medium text-red-600">{selectedLead.current}</span></p>
            </div>
          )}
        </Card>

        <Card title="2. Select Sales Representative">
          <Select
            label="Representative"
            value={selectedEmpId}
            onChange={(e) => setSelectedEmpId(e.target.value)}
            options={employees.map((e) => ({
              value: e.id,
              label: `${e.name} (${e.role} - ${e.currentLeads} Leads)`,
            }))}
          />
          {selectedEmp && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs space-y-1">
              <p className="font-semibold text-gray-800">{selectedEmp.name}</p>
              <p className="text-gray-500">Role: {selectedEmp.role}</p>
              <p className="text-gray-500">Active Workload: <span className="font-medium text-gray-900">{selectedEmp.currentLeads} leads</span></p>
            </div>
          )}
        </Card>
      </div>

      <Card title="3. Assignment Summary & Instructions">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4 flex items-start gap-3">
          <UserCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs text-blue-900">
            <p className="font-semibold">Reassignment Confirmation</p>
            <p>
              Assigning <span className="font-bold">{selectedLead?.company}</span> ({selectedLead?.value}) to{' '}
              <span className="font-bold">{selectedEmp?.name}</span>. An automated notification will be dispatched immediately.
            </p>
          </div>
        </div>

        <Textarea
          label="Transfer Notes / Instructions for Representative"
          placeholder="Add instructions or context regarding this lead..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <Button variant="secondary" onClick={() => onNavigate && onNavigate('LeadList')}>
            Cancel
          </Button>
          <Button variant="primary" icon={CheckCircle2} onClick={handleConfirm}>
            Confirm Assignment
          </Button>
        </div>
      </Card>
    </div>
  );
}
