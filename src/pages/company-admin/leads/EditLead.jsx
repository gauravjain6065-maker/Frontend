import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageContainer, PageHeader, Card, Stack, PageLoader } from '../../../components/layout';
import LeadForm from './components/LeadForm';
import { leadService } from '../../../services/leadService';

export default function EditLead() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        setLoading(true);
        const data = await leadService.getById(id);
        setLead(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLead();
  }, [id]);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Leads', href: '/company-admin/leads' },
    { label: lead ? lead.name : 'Edit Lead' }
  ];

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      await leadService.update(lead.id, values);
      alert(`Lead "${values.name}" updated successfully.`);
      navigate('/company-admin/leads');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !lead) {
    return (
      <PageContainer>
        <PageLoader />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title="Edit Lead"
          description={`Update deal close dates, values, or metrics routing settings for ${lead?.name || 'Lead'}.`}
          breadcrumbs={breadcrumbs}
        />

        <Card>
          <LeadForm
            initialValues={lead}
            onSubmit={handleSubmit}
            isEdit
            loading={submitting}
          />
        </Card>
      </Stack>
    </PageContainer>
  );
}
