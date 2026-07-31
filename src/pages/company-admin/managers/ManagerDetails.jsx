import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, Briefcase, ChevronRight, Activity } from 'lucide-react';
import { PageContainer, PageHeader, Section, Card, Grid, Stack, Divider, PageLoader } from '../../../components/layout';
import { InfoCard, ActivityCard, StatusBadge, Button } from '../../../components/ui';
import { managerService } from '../../../services/managerService';
import { MANAGER_ACTIVITIES } from '../../../mock/managers/mockManagers';

export default function ManagerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manager, setManager] = useState(null);
  const [loading, setLoading] = useState(true);

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
    { label: manager ? manager.name : 'Loading...' }
  ];

  if (loading && !manager) {
    return (
      <PageContainer>
        <PageLoader />
      </PageContainer>
    );
  }

  const infoItems = manager ? [
    { label: 'Email Address', value: manager.email },
    { label: 'Phone Number', value: manager.phone },
    { label: 'Department Sector', value: manager.department },
    { label: 'Assigned Leads', value: manager.leadsCount },
    { label: 'Active Reports', value: manager.employeesCount },
    { label: 'Registration Date', value: manager.dateJoined }
  ] : [];

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title={manager.name}
          description="Regional sales manager profile details and audit trail logs."
          breadcrumbs={breadcrumbs}
          actions={
            <Button
              variant="secondary"
              size="sm"
              leadingIcon={Edit}
              onClick={() => navigate(`/company-admin/managers/${manager.id}/edit`)}
            >
              Edit Account
            </Button>
          }
          leftSection={
            <div className="w-14 h-14 rounded-full bg-primary-100 border border-primary-200 text-primary-700 flex items-center justify-center font-bold text-lg">
              {manager.name.split(' ').map(n => n[0]).join('')}
            </div>
          }
        />

        <Grid cols={{ default: 1, lg: 3 }} gap={6}>
          {/* Main profile details spans 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            <InfoCard
              title="Employee Directory Profile"
              items={infoItems}
              cols={2}
            />

            <Card title="Direct Reports Team">
              <Stack space={3}>
                <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold">AS</div>
                    <div>
                      <p className="font-semibold text-neutral-800">Agent Smith</p>
                      <p className="text-[10px] text-neutral-400">Senior Representative</p>
                    </div>
                  </div>
                  <span className="crm-badge-success">Active</span>
                </div>
                <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold">TA</div>
                    <div>
                      <p className="font-semibold text-neutral-800">Thomas Anderson</p>
                      <p className="text-[10px] text-neutral-400">Representative</p>
                    </div>
                  </div>
                  <span className="crm-badge-success">Active</span>
                </div>
              </Stack>
            </Card>
          </div>

          {/* Sidebar spans 1 col */}
          <div className="space-y-6">
            <Card title="Status Summary">
              <Stack space={4}>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 font-medium">Pipeline Status</span>
                  <StatusBadge status={manager.status} />
                </div>
                <Divider />
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 font-medium">Monthly Target Met</span>
                  <span className="font-bold text-success-600">Yes (114%)</span>
                </div>
              </Stack>
            </Card>

            <Card title="Audit Action Trail">
              <div className="pl-1 pt-1">
                {MANAGER_ACTIVITIES.map((act) => (
                  <ActivityCard
                    key={act.id}
                    title={act.title}
                    description={act.description}
                    time={act.time}
                    variant={act.variant}
                    isLast={act.id === 3}
                  />
                ))}
              </div>
            </Card>
          </div>
        </Grid>
      </Stack>
    </PageContainer>
  );
}
