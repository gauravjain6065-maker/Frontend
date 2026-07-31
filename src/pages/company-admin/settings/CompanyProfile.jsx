import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, RefreshCw } from 'lucide-react';
import { PageContainer, PageHeader, Card, Stack, Grid, Divider } from '../../../components/layout';
import { Input, Button, Tabs, Select } from '../../../components/ui';

export default function CompanyProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [companyName, setCompanyName] = useState('Panorama Solutions Inc');
  const [companyEmail, setCompanyEmail] = useState('admin@panorama.io');
  const [companyPhone, setCompanyPhone] = useState('+1 (555) 700-1200');
  const [companyDomain, setCompanyDomain] = useState('panorama.io');
  const [companyIndustry, setCompanyIndustry] = useState('Technology');
  
  const [errors, setErrors] = useState({});

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
    const tempErrors = {};
    if (!companyName.trim()) tempErrors.name = 'Company Name is required.';
    if (!companyEmail.trim()) tempErrors.email = 'Business Email is required.';
    
    setErrors(tempErrors);
    if (Object.keys(tempErrors).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Company Profile saved successfully.');
    }, 800);
  };

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title="Company Profile Settings"
          description="View and administer firm-wide contact directories, domain scopes, and corporate fields."
          breadcrumbs={breadcrumbs}
        />

        <Tabs
          tabs={settingsTabs}
          activeTab="company-profile"
          onChange={(tabId) => navigate(`/company-admin/settings/${tabId}`)}
        />

        <Card title="Corporate Details Form">
          <form onSubmit={handleSave}>
            <Stack space={5}>
              <Grid cols={{ default: 1, md: 2 }} gap={5}>
                <Input
                  label="Company Name"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  error={errors.name}
                  disabled={loading}
                />
                <Input
                  label="Business Email"
                  required
                  type="email"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  error={errors.email}
                  disabled={loading}
                />
                <Input
                  label="Corporate Phone"
                  value={companyPhone}
                  onChange={(e) => setCompanyPhone(e.target.value)}
                  disabled={loading}
                />
                <Input
                  label="Domain Scope"
                  value={companyDomain}
                  onChange={(e) => setCompanyDomain(e.target.value)}
                  disabled={loading}
                />
                <Select
                  label="Primary Sector"
                  options={['Technology', 'Biotech', 'Finance', 'Logistics', 'Manufacturing']}
                  value={companyIndustry}
                  onChange={(e) => setCompanyIndustry(e.target.value)}
                  disabled={loading}
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
                  Save Changes
                </Button>
              </div>
            </Stack>
          </form>
        </Card>
      </Stack>
    </PageContainer>
  );
}
