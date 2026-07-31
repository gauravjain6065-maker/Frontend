import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageContainer, PageHeader, Card, Stack, PageLoader } from '../../../components/layout';
import ManagerForm from './components/ManagerForm';
import { managerService } from '../../../services/managerService';

export default function EditManager() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manager, setManager] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchManager = async () => {
      try {
        setLoading(true);
        const data = await managerService.getById(id);
        setManager(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchManager();
  }, [id]);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Managers', href: '/company-admin/managers' },
    { label: manager ? manager.name : 'Edit Manager' }
  ];

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      await managerService.update(manager.id, values);
      alert(`Manager "${values.name}" updated successfully.`);
      navigate('/company-admin/managers');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !manager) {
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
          title="Edit Manager"
          description={`Update profile settings, department routing or account status for ${manager?.name || 'Manager'}.`}
          breadcrumbs={breadcrumbs}
        />

        <Card>
          <ManagerForm
            initialValues={manager}
            onSubmit={handleSubmit}
            isEdit
            loading={submitting}
          />
        </Card>
      </Stack>
    </PageContainer>
  );
}
