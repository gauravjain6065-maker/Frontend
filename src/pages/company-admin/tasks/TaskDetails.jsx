import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, CheckCircle, Clock } from 'lucide-react';
import { PageContainer, PageHeader, Card, Grid, Stack, Divider, PageLoader } from '../../../components/layout';
import { InfoCard, StatusBadge, Button } from '../../../components/ui';
import { taskService } from '../../../services/taskService';

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const data = await taskService.getById(id);
        setTask(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Tasks', href: '/company-admin/tasks' },
    { label: task ? task.subject : 'Loading...' }
  ];

  const handleMarkComplete = async () => {
    try {
      const updated = await taskService.update(task.id, { status: 'Completed' });
      setTask({ ...task, status: 'Completed' });
      alert('Task status marked as Completed.');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading && !task) {
    return (
      <PageContainer>
        <PageLoader />
      </PageContainer>
    );
  }

  const infoItems = task ? [
    { label: 'Task Subject', value: task.subject },
    { label: 'Associated Opportunity', value: task.leadName },
    { label: 'Task Due Date', value: task.dueDate },
    { label: 'Priority level', value: task.priority },
    { label: 'Assigned Representative', value: task.assignedTo },
    { label: 'Date created', value: task.dateCreated }
  ] : [];

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title={task.subject}
          description="Pipeline checklist task metrics and activity targets."
          breadcrumbs={breadcrumbs}
          actions={
            task.status !== 'Completed' && (
              <Button
                variant="primary"
                size="sm"
                leadingIcon={CheckCircle}
                onClick={handleMarkComplete}
              >
                Mark Completed
              </Button>
            )
          }
          leftSection={
            <div className="w-14 h-14 rounded-full bg-primary-100 border border-primary-200 text-primary-700 flex items-center justify-center font-bold text-lg">
              <FileText className="w-6 h-6 text-primary-600" />
            </div>
          }
        />

        <Grid cols={{ default: 1, lg: 3 }} gap={6}>
          {/* Main task info spans 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            <InfoCard
              title="Scheduled Task Details"
              items={infoItems}
              cols={2}
            />
          </div>

          {/* Sidebar status spans 1 col */}
          <div className="space-y-6">
            <Card title="Status Summary">
              <Stack space={4}>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 font-medium">Task Action status</span>
                  <StatusBadge status={task.status} />
                </div>
              </Stack>
            </Card>
          </div>
        </Grid>
      </Stack>
    </PageContainer>
  );
}
