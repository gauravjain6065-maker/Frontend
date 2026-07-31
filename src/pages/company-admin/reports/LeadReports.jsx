import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, RefreshCw, BarChart } from 'lucide-react';
import { PageContainer, PageHeader, Section, Card, Grid, Stack } from '../../../components/layout';
import { StatCard, ChartPlaceholder, Button, Tabs } from '../../../components/ui';
import { LEAD_REPORT_STATS } from '../../../mock/reports/mockReports';

export default function LeadReports() {
  const navigate = useNavigate();

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Reports', href: '/company-admin/reports' },
    { label: 'Leads' }
  ];

  const reportTabs = [
    { id: 'dashboard', label: 'Dashboard Reports' },
    { id: 'leads', label: 'Lead Reports' },
    { id: 'employees', label: 'Employee Reports' },
    { id: 'managers', label: 'Manager Reports' }
  ];

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title="Lead Analysis Reports"
          description="Inbound vs. Outbound generation, qualification ratios, and lead status logs."
          breadcrumbs={breadcrumbs}
          actions={
            <>
              <Button variant="secondary" size="sm" leadingIcon={RefreshCw} onClick={() => alert('Refreshing lead stats...')}>
                Refresh Data
              </Button>
              <Button variant="primary" size="sm" leadingIcon={Download} onClick={() => alert('Exporting Excel Lead log spreadsheet...')}>
                Export CSV
              </Button>
            </>
          }
        />

        <Tabs
          tabs={reportTabs}
          activeTab="leads"
          onChange={(tabId) => navigate(`/company-admin/reports/${tabId}`)}
        />

        <Section title="Funnel Ratios">
          <Grid cols={{ default: 1, sm: 2, lg: 4 }} gap={6}>
            {LEAD_REPORT_STATS.map((stat) => (
              <StatCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                trend={stat.trend}
                trendLabel={stat.trendLabel}
                icon={BarChart}
              />
            ))}
          </Grid>
        </Section>

        <Section title="Funnel Pipelines Analysis">
          <Grid cols={{ default: 1, lg: 2 }} gap={6}>
            <Card>
              <ChartPlaceholder type="area" title="Lead Volume - Inbound vs. Outbound Growth" />
            </Card>
            <Card>
              <ChartPlaceholder type="donut" title="Lead Qualification Status Breakdown" />
            </Card>
          </Grid>
        </Section>
      </Stack>
    </PageContainer>
  );
}
