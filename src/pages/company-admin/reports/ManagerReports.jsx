import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, RefreshCw, Eye } from 'lucide-react';
import { PageContainer, PageHeader, Section, Card, Grid, Stack } from '../../../components/layout';
import { DataTable, Button, Tabs, ChartPlaceholder, FilterBar } from '../../../components/ui';
import { MANAGER_PIPELINES } from '../../../mock/reports/mockReports';

export default function ManagerReports() {
  const navigate = useNavigate();
  const [managers, setManagers] = useState(MANAGER_PIPELINES);
  const [search, setSearch] = useState('');
  const [sortCol, setSortCol] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [loading, setLoading] = useState(false);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Reports', href: '/company-admin/reports' },
    { label: 'Managers' }
  ];

  const reportTabs = [
    { id: 'dashboard', label: 'Dashboard Reports' },
    { id: 'leads', label: 'Lead Reports' },
    { id: 'employees', label: 'Employee Reports' },
    { id: 'managers', label: 'Manager Reports' }
  ];

  // Filtering
  const filteredManagers = managers.filter(m => {
    return m.name.toLowerCase().includes(search.toLowerCase());
  });

  const columns = [
    { key: 'name', label: 'Manager Name', sortable: true },
    { key: 'teamSize', label: 'Team Size', sortable: true },
    { key: 'teamPipeline', label: 'Team Pipeline', sortable: true },
    { key: 'closedDeals', label: 'Team Closed Deals', sortable: true },
    { key: 'status', label: 'Quota Target Status', sortable: true }
  ];

  const handleSort = (columnKey) => {
    const direction = sortCol === columnKey && sortDir === 'asc' ? 'desc' : 'asc';
    setSortCol(columnKey);
    setSortDir(direction);
    setLoading(true);
    setTimeout(() => {
      const sorted = [...managers].sort((a, b) => {
        const valA = String(a[columnKey]);
        const valB = String(b[columnKey]);
        return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
      setManagers(sorted);
      setLoading(false);
    }, 300);
  };

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title="Manager Target Reports"
          description="Supervisor pipelines progress and overall regional quota tracking status."
          breadcrumbs={breadcrumbs}
          actions={
            <>
              <Button variant="secondary" size="sm" leadingIcon={RefreshCw} onClick={() => alert('Refreshing manager stats...')}>
                Refresh Data
              </Button>
              <Button variant="primary" size="sm" leadingIcon={Download} onClick={() => alert('Exporting Excel Manager reports...')}>
                Export CSV
              </Button>
            </>
          }
        />

        <Tabs
          tabs={reportTabs}
          activeTab="managers"
          onChange={(tabId) => navigate(`/company-admin/reports/${tabId}`)}
        />

        <Grid cols={{ default: 1, lg: 3 }} gap={6}>
          {/* Main profile details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <FilterBar
                searchQuery={search}
                onSearchChange={(e) => setSearch(e.target.value)}
                onSearchClear={() => setSearch('')}
                placeholder="Search managers..."
              />
            </Card>

            <Card title="Regional Team Pipeline Overview">
              <DataTable
                columns={columns}
                data={filteredManagers}
                loading={loading}
                sortColumn={sortCol}
                sortDirection={sortDir}
                onSort={handleSort}
              />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <ChartPlaceholder type="donut" title="Manager Quota Target Status Split" />
            </Card>
          </div>
        </Grid>
      </Stack>
    </PageContainer>
  );
}
