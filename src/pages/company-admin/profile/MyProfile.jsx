import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import { PageContainer, PageHeader, Card, Stack, Grid, Divider } from '../../../components/layout';
import { Input, Button, Tabs } from '../../../components/ui';

export default function MyProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState('Raj');
  const [lastName, setLastName] = useState('Sonar');
  const [email, setEmail] = useState('raj.sonar@panorama.io');
  const [phone, setPhone] = useState('+1 (555) 019-2831');
  const [role, setRole] = useState('Company Administrator');

  const [errors, setErrors] = useState({});

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Profile' }
  ];

  const profileTabs = [
    { id: '', label: 'My Profile' },
    { id: 'change-password', label: 'Change Password' }
  ];

  const handleSave = (e) => {
    e.preventDefault();
    const tempErrors = {};
    if (!firstName.trim()) tempErrors.firstName = 'First Name is required.';
    if (!lastName.trim()) tempErrors.lastName = 'Last Name is required.';
    if (!email.trim()) tempErrors.email = 'Email address is required.';

    setErrors(tempErrors);
    if (Object.keys(tempErrors).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Personal Profile updated successfully.');
    }, 800);
  };

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title="My Profile Settings"
          description="View and administer personal contact details and user role privileges."
          breadcrumbs={breadcrumbs}
        />

        <Tabs
          tabs={profileTabs}
          activeTab=""
          onChange={(tabId) => navigate(`/company-admin/profile/${tabId}`)}
        />

        <Card title="Account Profile Form">
          <form onSubmit={handleSave}>
            <Stack space={5}>
              <Grid cols={{ default: 1, md: 2 }} gap={5}>
                <Input
                  label="First Name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  error={errors.firstName}
                  disabled={loading}
                />
                <Input
                  label="Last Name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  error={errors.lastName}
                  disabled={loading}
                />
                <Input
                  label="Email Address"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  disabled={loading}
                />
                <Input
                  label="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading}
                />
                <Input
                  label="Corporate User Role"
                  value={role}
                  disabled
                />
              </Grid>

              <Divider className="my-2" />

              <div className="flex items-center justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  leadingIcon={Save}
                  loading={loading}
                  size="md"
                >
                  Save Profile
                </Button>
              </div>
            </Stack>
          </form>
        </Card>
      </Stack>
    </PageContainer>
  );
}
