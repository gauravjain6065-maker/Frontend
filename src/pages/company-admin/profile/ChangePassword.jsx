import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import { PageContainer, PageHeader, Card, Stack, Grid, Divider } from '../../../components/layout';
import { Input, Button, Tabs } from '../../../components/ui';

export default function ChangePassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Profile', href: '/company-admin/profile' },
    { label: 'Change Password' }
  ];

  const profileTabs = [
    { id: '', label: 'My Profile' },
    { id: 'change-password', label: 'Change Password' }
  ];

  const handleSave = (e) => {
    e.preventDefault();
    const tempErrors = {};
    if (!currentPassword) tempErrors.currentPassword = 'Current Password is required.';
    if (!newPassword) {
      tempErrors.newPassword = 'New Password is required.';
    } else if (newPassword.length < 8) {
      tempErrors.newPassword = 'Password must be at least 8 characters long.';
    }
    if (newPassword !== confirmPassword) {
      tempErrors.confirmPassword = 'New passwords do not match.';
    }

    setErrors(tempErrors);
    if (Object.keys(tempErrors).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      alert('Password updated successfully.');
    }, 800);
  };

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title="Change Password Settings"
          description="Update account authentication credentials and password complexities."
          breadcrumbs={breadcrumbs}
        />

        <Tabs
          tabs={profileTabs}
          activeTab="change-password"
          onChange={(tabId) => navigate(`/company-admin/profile/${tabId}`)}
        />

        <Card title="Update Password Form">
          <form onSubmit={handleSave} className="max-w-md">
            <Stack space={4}>
              <Input
                label="Current Password"
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                error={errors.currentPassword}
                disabled={loading}
              />
              <Input
                label="New Password"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                error={errors.newPassword}
                disabled={loading}
              />
              <Input
                label="Confirm New Password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                disabled={loading}
              />

              <Divider className="my-2" />

              <div className="flex items-center justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  leadingIcon={Save}
                  loading={loading}
                  size="sm"
                >
                  Update Password
                </Button>
              </div>
            </Stack>
          </form>
        </Card>
      </Stack>
    </PageContainer>
  );
}
