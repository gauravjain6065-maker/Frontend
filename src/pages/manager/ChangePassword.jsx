import React, { useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { KeyRound, Lock, Save, ShieldAlert } from 'lucide-react';

export function ChangePassword() {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!passwords.currentPassword) {
      newErrors.currentPassword = 'Current password is required.';
    }
    if (!passwords.newPassword) {
      newErrors.newPassword = 'New password is required.';
    } else if (passwords.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long.';
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccessMsg('Password updated successfully!');
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      setSuccessMsg('');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <PageHeader
        title="Change Password"
        subtitle="Ensure your account security by updating your account credentials regularly."
      />

      {successMsg && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800 font-medium">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Card title="Security Credentials" subtitle="Enter your current password and your new credentials.">
          <div className="space-y-4 mb-6">
            <Input
              label="Current Password"
              type="password"
              placeholder="••••••••"
              value={passwords.currentPassword}
              onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
              error={errors.currentPassword}
            />

            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              error={errors.newPassword}
              helperText="Minimum 8 characters with at least one number or special character."
            />

            <Input
              label="Confirm New Password"
              type="password"
              placeholder="••••••••"
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button type="submit" variant="primary" icon={Lock}>
              Update Password
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
