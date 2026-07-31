import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, PageHeader, Card, Stack } from '../../../components/layout';
import ManagerForm from './components/ManagerForm';
import { managerService } from '../../../services/managerService';

export default function CreateManager() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Managers', href: '/company-admin/managers' },
    { label: 'Create Manager' }
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await managerService.create(values);
      alert(`Manager "${values.name}" created successfully.`);
      navigate('/company-admin/managers');
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
          title="Create Manager"
          description="Register a new regional manager or sales director in the system."
          breadcrumbs={breadcrumbs}
        />

        <Card>
          <ManagerForm onSubmit={handleSubmit} loading={loading} />
        </Card>
      </Stack>
    </PageContainer>
  );
}
