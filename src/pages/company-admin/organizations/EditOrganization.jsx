import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageContainer, PageHeader, Card, Stack, PageLoader } from '../../../components/layout';
import OrganizationForm from './components/OrganizationForm';
import { organizationService } from '../../../services/organizationService';

export default function EditOrganization() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchOrg = async () => {
      try {
        setLoading(true);
        const data = await organizationService.getById(id);
        setOrg(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrg();
  }, [id]);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Organizations', href: '/company-admin/organizations' },
    { label: org ? org.name : 'Edit Organization' }
  ];

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      await organizationService.update(org.id, values);
      alert(`Organization "${values.name}" updated successfully.`);
      navigate('/company-admin/organizations');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !org) {
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
          title="Edit Organization"
          description={`Update sector taxonomy or metadata settings for ${org?.name || 'Organization'}.`}
          breadcrumbs={breadcrumbs}
        />

        <Card>
          <OrganizationForm
            initialValues={org}
            onSubmit={handleSubmit}
            isEdit
            loading={submitting}
          />
        </Card>
      </Stack>
    </PageContainer>
  );
}
