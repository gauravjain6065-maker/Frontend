import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, Briefcase, Plus, UserPlus, DollarSign, Activity } from 'lucide-react';
import { PageContainer, PageHeader, Card, Grid, Stack, Divider, PageLoader } from '../../../components/layout';
import { InfoCard, StatusBadge, Button, ActivityCard } from '../../../components/ui';
import { leadService } from '../../../services/leadService';
import { LEAD_ACTIVITIES } from '../../../mock/leads/mockLeads';

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

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
    { label: lead ? lead.name : 'Loading...' }
  ];

  if (loading && !lead) {
    return (
      <PageContainer>
        <PageLoader />
      </PageContainer>
    );
  }

  const infoItems = lead ? [
    { label: 'Associated Company', value: lead.company },
    { label: 'Lead Owner / Agent', value: lead.owner },
    { label: 'Estimated Value', value: lead.value },
    { label: 'Communication Email', value: lead.email || 'N/A' },
    { label: 'Deal Stage', value: lead.stage },
    { label: 'Registration Date', value: lead.dateCreated }
  ] : [];

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title={lead.name}
          description="Pipeline opportunity metadata and correspondence logs."
          breadcrumbs={breadcrumbs}
          actions={
            <>
              <Button
                variant="secondary"
                size="sm"
                leadingIcon={UserPlus}
                onClick={() => navigate(`/company-admin/leads/${lead.id}/assign`)}
              >
                Assign Owner
              </Button>
              <Button
                variant="primary"
                size="sm"
                leadingIcon={Edit}
                onClick={() => navigate(`/company-admin/leads/${lead.id}/edit`)}
              >
                Edit Deal
              </Button>
            </>
          }
          leftSection={
            <div className="w-14 h-14 rounded-full bg-primary-100 border border-primary-200 text-primary-700 flex items-center justify-center font-bold text-lg">
              <DollarSign className="w-6 h-6 text-primary-600" />
            </div>
          }
        />

        <Grid cols={{ default: 1, lg: 3 }} gap={6}>
          {/* Main profile details spans 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            <InfoCard
              title="Pipeline Opportunity Details"
              items={infoItems}
              cols={2}
            />

            <Card title="Activity log timeline">
              <div className="pl-1 pt-1">
                {LEAD_ACTIVITIES.map((act) => (
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

          {/* Sidebar spans 1 col */}
          <div className="space-y-6">
            <Card title="Status Summary">
              <Stack space={4}>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 font-medium">Record Verification status</span>
                  <StatusBadge status={lead.status} />
                </div>
              </Stack>
            </Card>
          </div>
        </Grid>
      </Stack>
    </PageContainer>
  );
}
