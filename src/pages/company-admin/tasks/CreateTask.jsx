import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, PageHeader, Card, Stack } from '../../../components/layout';
import TaskForm from './components/TaskForm';
import { taskService } from '../../../services/taskService';

export default function CreateTask() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Tasks', href: '/company-admin/tasks' },
    { label: 'Create Task' }
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await taskService.create(values);
      alert(`Task "${values.subject}" created successfully.`);
      navigate('/company-admin/tasks');
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
          title="Schedule CRM Action Task"
          description="Schedule activities, set priorities, and assign reps to client deals."
          breadcrumbs={breadcrumbs}
        />

        <Card>
          <TaskForm onSubmit={handleSubmit} loading={loading} />
        </Card>
      </Stack>
    </PageContainer>
  );
}
