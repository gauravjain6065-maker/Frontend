import React, { useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Input, Select } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { User, Mail, Phone, MapPin, Save, ShieldCheck } from 'lucide-react';

export function MyProfile() {
  const [profile, setProfile] = useState({
    name: 'Michael Brown',
    role: 'Sales Manager',
    department: 'Enterprise & SMB Sales',
    email: 'michael.b@crmsaas.com',
    phone: '+1 (555) 019-9988',
    location: 'Headquarters - New York, NY',
    timezone: 'EST (UTC-5)',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="My Profile"
        subtitle="Manage your personal information, contact details, and account preferences."
      />

      {/* Header Profile Card */}
      <Card>
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-blue-600 text-white font-bold text-2xl flex items-center justify-center border-4 border-white shadow-sm shrink-0">
            MB
          </div>
          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
              <Badge variant="primary">Sales Manager</Badge>
            </div>
            <p className="text-sm text-gray-600 font-medium">{profile.department}</p>
            <p className="text-xs text-gray-400">Manager ID: MGR-8042</p>
          </div>
        </div>
      </Card>

      {/* Edit Personal Info */}
      <form onSubmit={handleSubmit}>
        <Card title="Personal Information" subtitle="Update your official manager profile details.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <Input
              label="Full Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />

            <Input
              label="Email Address"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />

            <Input
              label="Phone Number"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />

            <Input
              label="Office Location"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
            />

            <Select
              label="Timezone"
              value={profile.timezone}
              onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
              options={[
                { value: 'EST (UTC-5)', label: 'Eastern Standard Time (EST)' },
                { value: 'CST (UTC-6)', label: 'Central Standard Time (CST)' },
                { value: 'PST (UTC-8)', label: 'Pacific Standard Time (PST)' },
              ]}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button type="submit" variant="primary" icon={Save}>
              Save Profile Changes
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
