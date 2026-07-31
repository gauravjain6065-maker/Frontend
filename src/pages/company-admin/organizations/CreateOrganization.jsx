import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, PageHeader, Card, Stack } from '../../../components/layout';
import OrganizationForm from './components/OrganizationForm';
import { organizationService } from '../../../services/organizationService';

export default function CreateOrganization() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Organizations', href: '/company-admin/organizations' },
    { label: 'Create Organization' }
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await organizationService.create(values);
      alert(`Organization "${values.name}" created successfully.`);
      navigate('/company-admin/organizations');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title="Add Organization Account"
          description="Register a new company client directory profile."
          breadcrumbs={breadcrumbs}
        />

        <Card>
          <OrganizationForm onSubmit={handleSubmit} loading={loading} />
        </Card>
      </Stack>
    </PageContainer>
  );
}
