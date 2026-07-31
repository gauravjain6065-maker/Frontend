import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, PageHeader, Card, Stack } from '../../../components/layout';
import FollowUpForm from './components/FollowUpForm';
import { followupService } from '../../../services/followupService';

export default function CreateFollowUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Follow-ups', href: '/company-admin/followups' },
    { label: 'Schedule Follow-up' }
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await followupService.create(values);
      alert(`Follow-up scheduled successfully for ${values.clientName}.`);
      navigate('/company-admin/followups');
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
          title="Schedule Follow-up"
          description="Establish follow-up call, email, or meeting markers for active deals."
          breadcrumbs={breadcrumbs}
        />

        <Card>
          <FollowUpForm onSubmit={handleSubmit} loading={loading} />
        </Card>
      </Stack>
    </PageContainer>
  );
}
