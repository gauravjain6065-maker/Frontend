import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer, PageHeader, Card, Grid, Stack, Divider, PageLoader } from '../../../components/layout';
import { InfoCard, StatusBadge, Button } from '../../../components/ui';
import { employeeService } from '../../../services/employeeService';

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const data = await employeeService.getById(id);
        setEmployee(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Employees', href: '/company-admin/employees' },
    { label: employee ? employee.name : 'Loading...' }
  ];

  if (loading && !employee) {
    return (
      <PageContainer>
        <PageLoader />
      </PageContainer>
    );
  }

  const infoItems = employee ? [
    { label: 'Email Address', value: employee.email },
    { label: 'Phone Number', value: employee.phone },
    { label: 'Active Role Title', value: employee.role },
    { label: 'Supervisor Manager', value: employee.manager },
    { label: 'Assigned Leads', value: employee.leadsCount },
    { label: 'Closed Deals', value: employee.closedDeals },
    { label: 'Registration Date', value: employee.dateJoined }
  ] : [];

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title={employee.name}
          description="Corporate sales representative details, pipeline counts, and target metrics."
          breadcrumbs={breadcrumbs}
          leftSection={
            <div className="w-14 h-14 rounded-full bg-primary-100 border border-primary-200 text-primary-700 flex items-center justify-center font-bold text-lg">
              {employee.name.split(' ').map(n => n[0]).join('')}
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

            <Card title="Sales Performance Target Status">
              <div className="space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 font-medium">Monthly Quota Met</span>
                  <span className="font-bold text-success-600">Yes (105%)</span>
                </div>
                <Divider />
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 font-medium">Pipeline Conversion Ratio</span>
                  <span className="font-bold text-neutral-800">42%</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar spans 1 col */}
          <div className="space-y-6">
            <Card title="Status Summary">
              <Stack space={4}>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 font-medium">Account Access status</span>
                  <StatusBadge status={employee.status} />
                </div>
                <Divider />
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 font-medium">Last Login session</span>
                  <span className="text-neutral-600 font-medium">3 hours ago</span>
                </div>
              </Stack>
            </Card>
          </div>
        </Grid>
      </Stack>
    </PageContainer>
  );
}
