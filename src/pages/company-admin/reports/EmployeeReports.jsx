import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, RefreshCw, Eye } from 'lucide-react';
import { PageContainer, PageHeader, Section, Card, Grid, Stack } from '../../../components/layout';
import { DataTable, Button, Tabs, ChartPlaceholder, FilterBar, Pagination } from '../../../components/ui';
import { EMPLOYEE_PERFORMANCE } from '../../../mock/reports/mockReports';

export default function EmployeeReports() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState(EMPLOYEE_PERFORMANCE);
  const [search, setSearch] = useState('');
  const [sortCol, setSortCol] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [loading, setLoading] = useState(false);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Reports', href: '/company-admin/reports' },
    { label: 'Employees' }
  ];

  const reportTabs = [
    { id: 'dashboard', label: 'Dashboard Reports' },
    { id: 'leads', label: 'Lead Reports' },
    { id: 'employees', label: 'Employee Reports' },
    { id: 'managers', label: 'Manager Reports' }
  ];

  // Filtering
  const filteredEmployees = employees.filter(e => {
    return e.name.toLowerCase().includes(search.toLowerCase());
  });

  const columns = [
    { key: 'name', label: 'Employee Name', sortable: true },
    { key: 'closedDeals', label: 'Closed Deals', sortable: true },
    { key: 'pipelineValue', label: 'Team Pipeline', sortable: true },
    { key: 'conversion', label: 'Conversion Rate', sortable: true },
    { key: 'activityCount', label: 'Total Logs', sortable: true }
  ];

  const handleSort = (columnKey) => {
    const direction = sortCol === columnKey && sortDir === 'asc' ? 'desc' : 'asc';
    setSortCol(columnKey);
    setSortDir(direction);
    setLoading(true);
    setTimeout(() => {
      const sorted = [...employees].sort((a, b) => {
        const valA = String(a[columnKey]);
        const valB = String(b[columnKey]);
        return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
      setEmployees(sorted);
      setLoading(false);
    }, 300);
  };

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title="Employee Performance Reports"
          description="Closed deals totals, pipeline values, and conversion rates company-wide."
          breadcrumbs={breadcrumbs}
          actions={
            <>
              <Button variant="secondary" size="sm" leadingIcon={RefreshCw} onClick={() => alert('Refreshing representative logs...')}>
                Refresh Data
              </Button>
              <Button variant="primary" size="sm" leadingIcon={Download} onClick={() => alert('Exporting Excel Employee logs...')}>
                Export CSV
              </Button>
            </>
          }
        />

        <Tabs
          tabs={reportTabs}
          activeTab="employees"
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
                placeholder="Search representatives..."
              />
            </Card>

            <Card title="Sales Agent Standings">
              <DataTable
                columns={columns}
                data={filteredEmployees}
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
              <ChartPlaceholder type="bar" title="Representative Pipeline Value Contribution" />
            </Card>
          </div>
        </Grid>
      </Stack>
    </PageContainer>
  );
}
