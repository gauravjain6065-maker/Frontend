import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, Briefcase, Plus, Users, DollarSign } from 'lucide-react';
import { PageContainer, PageHeader, Card, Grid, Stack, Divider, PageLoader } from '../../../components/layout';
import { InfoCard, StatusBadge, Button } from '../../../components/ui';
import { organizationService } from '../../../services/organizationService';

export default function OrganizationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);

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
    { label: org ? org.name : 'Loading...' }
  ];

  if (loading && !org) {
    return (
      <PageContainer>
        <PageLoader />
      </PageContainer>
    );
  }

  const infoItems = org ? [
    { label: 'Domain Address', value: org.domain },
    { label: 'Industry Sector', value: org.industry },
    { label: 'Employee headcount', value: org.employees },
    { label: 'Billing Headquarters', value: org.billingAddress },
    { label: 'Associated Contacts', value: org.contactsCount },
    { label: 'Active Pipeline Deals', value: org.leadsCount },
    { label: 'Created date', value: org.dateCreated }
  ] : [];

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title={org.name}
          description="Client organization details, active directory members, and deal history records."
          breadcrumbs={breadcrumbs}
          actions={
            <Button
              variant="secondary"
              size="sm"
              leadingIcon={Edit}
              onClick={() => navigate(`/company-admin/organizations/${org.id}/edit`)}
            >
              Edit Company Profile
            </Button>
          }
          leftSection={
            <div className="w-14 h-14 rounded-full bg-primary-100 border border-primary-200 text-primary-700 flex items-center justify-center font-bold text-lg">
              {org.name.split(' ').map(n => n[0]).join('')}
            </div>
          }
        />

        <Grid cols={{ default: 1, lg: 3 }} gap={6}>
          {/* Main details spans 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            <InfoCard
              title="Organization Profile"
              items={infoItems}
              cols={2}
            />

            <Card title="Active Deal Submissions">
              <Stack space={3}>
                <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-neutral-800">Office 365 cloud integration</p>
                    <p className="text-[10px] text-neutral-400">Proposal Sent</p>
                  </div>
                  <span className="font-bold text-neutral-700">$240,000</span>
                </div>
              </Stack>
            </Card>
          </div>

          {/* Sidebar spans 1 col */}
          <div className="space-y-6">
            <Card title="Status Summary">
              <Stack space={4}>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 font-medium">Account Access Status</span>
                  <StatusBadge status={org.status} />
                </div>
              </Stack>
            </Card>
          </div>
        </Grid>
      </Stack>
    </PageContainer>
  );
}
