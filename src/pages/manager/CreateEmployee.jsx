import React, { useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Input, Select, Textarea } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Save, X } from 'lucide-react';

export function CreateEmployee({ onNavigate }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: 'Enterprise Sales',
    role: 'Sales Representative',
    quota: '50000',
    startDate: '',
    status: 'Active',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email address is required';
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setTimeout(() => {
        if (onNavigate) onNavigate('EmployeeList');
      }, 1000);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Create Employee"
        subtitle="Add a new representative to your sales team with role permissions and quotas."
      />

      {submitted && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800 font-semibold animate-fade-in">
          ✓ Employee account successfully created! Redirecting to Employee Directory...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Card title="Employee Details" subtitle="Personal and professional profile information.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <Input
              label="First Name"
              placeholder="e.g. John"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              error={errors.firstName}
            />

            <Input
              label="Last Name"
              placeholder="e.g. Doe"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              error={errors.lastName}
            />

            <Input
              label="Work Email"
              type="email"
              placeholder="john.doe@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
            />

            <Input
              label="Phone Number"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            <Select
              label="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              options={[
                { value: 'Enterprise Sales', label: 'Enterprise Sales' },
                { value: 'SMB Sales', label: 'SMB Sales' },
                { value: 'Inbound Sales', label: 'Inbound Sales' },
                { value: 'Outbound Sales', label: 'Outbound Sales' },
                { value: 'Customer Success', label: 'Customer Success' },
              ]}
            />

            <Select
              label="Job Role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              options={[
                { value: 'Sales Representative', label: 'Sales Representative' },
                { value: 'Account Executive', label: 'Account Executive' },
                { value: 'Senior Sales Exec', label: 'Senior Sales Exec' },
                { value: 'Sales Development Rep', label: 'Sales Development Rep' },
                { value: 'Account Manager', label: 'Account Manager' },
              ]}
            />

            <Input
              label="Monthly Quota Target ($)"
              type="number"
              value={formData.quota}
              onChange={(e) => setFormData({ ...formData, quota: e.target.value })}
            />

            <Input
              label="Joining Date"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />

            <Select
              label="Employment Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={[
                { value: 'Active', label: 'Active' },
                { value: 'On Leave', label: 'On Leave' },
                { value: 'Inactive', label: 'Inactive' },
              ]}
            />
          </div>

          <Textarea
            label="Work Address / Location Notes"
            placeholder="Office branch or remote location info..."
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            rows={3}
          />

          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              icon={X}
              onClick={() => onNavigate && onNavigate('EmployeeList')}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" icon={Save}>
              Save Employee
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
