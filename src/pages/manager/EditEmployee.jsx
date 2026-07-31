import React, { useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Input, Select, Textarea } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Save, X } from 'lucide-react';

export function EditEmployee({ onNavigate }) {
  const [formData, setFormData] = useState({
    firstName: 'Sarah',
    lastName: 'Jenkins',
    email: 'sarah.j@crmsaas.com',
    phone: '+1 (555) 019-2834',
    department: 'Enterprise Sales',
    role: 'Senior Sales Exec',
    quota: '75000',
    startDate: '2024-01-15',
    status: 'Active',
    address: '100 Broadway Ave, Suite 400, New York, NY 10005',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      if (onNavigate) onNavigate('EmployeeDetails');
    }, 1000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Edit Employee"
        subtitle="Update representative information, assigned quota, and department role."
      />

      {submitted && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800 font-semibold">
          ✓ Employee details updated successfully! Redirecting to profile...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Card title="Update Employee Profile" subtitle="Employee ID: EMP-101">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />

            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />

            <Input
              label="Work Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <Input
              label="Phone Number"
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
                { value: 'Customer Success', label: 'Customer Success' },
              ]}
            />

            <Select
              label="Job Role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              options={[
                { value: 'Senior Sales Exec', label: 'Senior Sales Exec' },
                { value: 'Sales Representative', label: 'Sales Representative' },
                { value: 'Account Executive', label: 'Account Executive' },
              ]}
            />

            <Input
              label="Monthly Quota Target ($)"
              type="number"
              value={formData.quota}
              onChange={(e) => setFormData({ ...formData, quota: e.target.value })}
            />

            <Select
              label="Status"
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
            label="Location / Office Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            rows={3}
          />

          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              icon={X}
              onClick={() => onNavigate && onNavigate('EmployeeDetails')}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" icon={Save}>
              Save Changes
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
