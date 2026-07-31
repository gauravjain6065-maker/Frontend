import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, RefreshCw, BarChart } from 'lucide-react';
import { PageContainer, PageHeader, Section, Card, Grid, Stack } from '../../../components/layout';
import { StatCard, ChartPlaceholder, Button, Tabs } from '../../../components/ui';
import { OVERVIEW_METRICS } from '../../../mock/reports/mockReports';

export default function DashboardReports() {
  const navigate = useNavigate();

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Reports' }
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
          title="Executive Dashboard Reports"
          description="High-level corporate CRM metrics, quota progress, sales velocity, and analytics."
          breadcrumbs={breadcrumbs}
          actions={
            <>
              <Button variant="secondary" size="sm" leadingIcon={RefreshCw} onClick={() => alert('Refreshing dashboard logs...')}>
                Refresh Data
              </Button>
              <Button variant="primary" size="sm" leadingIcon={Download} onClick={() => alert('Exporting PDF Executive Summary...')}>
                Export PDF
              </Button>
            </>
          }
        />

        <Tabs
          tabs={reportTabs}
          activeTab="dashboard"
          onChange={(tabId) => navigate(`/company-admin/reports/${tabId}`)}
        />

        <Section title="High-Level Corporate Health KPI">
          <Grid cols={{ default: 1, sm: 2, lg: 4 }} gap={6}>
            {OVERVIEW_METRICS.map((stat) => (
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

        <Section title="CRM Analytics Dashboard Overview">
          <Grid cols={{ default: 1, lg: 2 }} gap={6}>
            <Card>
              <ChartPlaceholder type="area" title="Monthly Sales Pipeline Value (Millions USD)" />
            </Card>
            <Card>
              <ChartPlaceholder type="line" title="Lead Conversion Ratio Trend" />
            </Card>
            <Card>
              <ChartPlaceholder type="bar" title="Lead Generation per Origin Channel" />
            </Card>
            <Card>
              <ChartPlaceholder type="donut" title="Lead Status Breakdown" />
            </Card>
          </Grid>
        </Section>
      </Stack>
    </PageContainer>
  );
}
