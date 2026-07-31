import React, { useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Input, Select, Textarea } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Save, X } from 'lucide-react';

export function CreateTask({ onNavigate }) {
  const [formData, setFormData] = useState({
    title: '',
    assignedTo: 'Sarah Jenkins',
    relatedType: 'Lead',
    relatedId: 'LD-4091 (Acme Corporation)',
    priority: 'Medium',
    dueDate: '',
    status: 'Pending',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return alert('Please enter a task title');

    setSubmitted(true);
    setTimeout(() => {
      if (onNavigate) onNavigate('TaskList');
    }, 1000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Create Task"
        subtitle="Assign a new task or action item to a representative or yourself."
      />

      {submitted && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800 font-semibold">
          ✓ Task created successfully! Redirecting to Task List...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Card title="Task Information" subtitle="Fill out the details to dispatch a new task.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div className="md:col-span-2">
              <Input
                label="Task Title"
                placeholder="e.g. Prepare Enterprise SLA Deck"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <Select
              label="Assigned Representative"
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
              options={[
                { value: 'Sarah Jenkins', label: 'Sarah Jenkins' },
                { value: 'Alex Rivera', label: 'Alex Rivera' },
                { value: 'David Kim', label: 'David Kim' },
                { value: 'Self (Manager)', label: 'Self (Manager)' },
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

            <Input
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />

            <Select
              label="Related Module"
              value={formData.relatedType}
              onChange={(e) => setFormData({ ...formData, relatedType: e.target.value })}
              options={[
                { value: 'Lead', label: 'Lead Opportunity' },
                { value: 'Organization', label: 'Organization' },
                { value: 'Contact', label: 'Contact' },
                { value: 'Internal', label: 'Internal Ops' },
              ]}
            />
          </div>

          <Textarea
            label="Detailed Task Description / Context"
            placeholder="Specify clear deliverables or steps..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
          />

          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              icon={X}
              onClick={() => onNavigate && onNavigate('TaskList')}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" icon={Save}>
              Create Task
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
