import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, PageHeader, Card, Stack } from '../../../components/layout';
import LeadForm from './components/LeadForm';
import { leadService } from '../../../services/leadService';

export default function CreateLead() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Leads', href: '/company-admin/leads' },
    { label: 'Create Lead' }
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await leadService.create(values);
      alert(`Lead "${values.name}" created successfully.`);
      navigate('/company-admin/leads');
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
          title="Create Lead"
          description="Register a new contract deal opportunity into the pipeline."
          breadcrumbs={breadcrumbs}
        />

        <Card>
          <LeadForm onSubmit={handleSubmit} loading={loading} />
        </Card>
      </Stack>
    </PageContainer>
  );
}
