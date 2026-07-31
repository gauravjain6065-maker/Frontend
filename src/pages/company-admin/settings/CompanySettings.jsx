import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import { PageContainer, PageHeader, Card, Stack, Grid, Divider } from '../../../components/layout';
import { Button, Tabs, Select, ToggleSwitch, Checkbox } from '../../../components/ui';

export default function CompanySettings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [autoRoute, setAutoRoute] = useState(true);
  const [ruleType, setRuleType] = useState('Round Robin');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [currency, setCurrency] = useState('USD ($)');

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Settings' }
  ];

  const settingsTabs = [
    { id: 'company-profile', label: 'Company Profile' },
    { id: 'company-settings', label: 'Company Settings' }
  ];

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Company Settings updated successfully.');
    }, 800);
  };

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title="Company CRM Settings"
          description="Configure workflow routing, notification setups, and account currencies."
          breadcrumbs={breadcrumbs}
        />

        <Tabs
          tabs={settingsTabs}
          activeTab="company-settings"
          onChange={(tabId) => navigate(`/company-admin/settings/${tabId}`)}
        />

        <Card title="CRM Global Configurations">
          <form onSubmit={handleSave}>
            <Stack space={5}>
              <Grid cols={{ default: 1, md: 2 }} gap={6}>
                <Stack space={2}>
                  <span className="text-xs font-semibold text-neutral-700">Lead Auto-routing Pipeline</span>
                  <ToggleSwitch
                    checked={autoRoute}
                    onChange={(checked) => setAutoRoute(checked)}
                    label={autoRoute ? 'Enabled (System auto-delegates leads)' : 'Disabled (Manual delegation only)'}
                  />
                </Stack>

                <Select
                  label="Routing Algorithm Rules"
                  options={['Round Robin', 'Least Busy Agent', 'Geographic Matching']}
                  value={ruleType}
                  onChange={(e) => setRuleType(e.target.value)}
                  disabled={!autoRoute}
                />

                <Select
                  label="Default CRM Currency"
                  options={['USD ($)', 'EUR (€)', 'GBP (£)', 'INR (₹)']}
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                />

                <Stack space={3.5}>
                  <span className="text-xs font-semibold text-neutral-700">Alert Routing Subscriptions</span>
                  <Checkbox
                    id="chk-email"
                    label="Email notifications for new leads assignment"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                  />
                  <Checkbox
                    id="chk-sms"
                    label="SMS notification reminders for priority task deadlines"
                    checked={smsAlerts}
                    onChange={(e) => setSmsAlerts(e.target.checked)}
                  />
                </Stack>
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
                  Save Configuration
                </Button>
              </div>
            </Stack>
          </form>
        </Card>
      </Stack>
    </PageContainer>
  );
}
