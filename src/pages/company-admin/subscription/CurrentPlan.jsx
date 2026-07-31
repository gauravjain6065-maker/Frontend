import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Shield, UserPlus, ArrowUpCircle } from 'lucide-react';
import { PageContainer, PageHeader, Card, Grid, Stack, Divider, PageLoader } from '../../../components/layout';
import { Button, Tabs } from '../../../components/ui';
import { subscriptionService } from '../../../services/subscriptionService';

export default function CurrentPlan() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Subscription' }
  ];

  const subTabs = [
    { id: '', label: 'Current Plan' },
    { id: 'billing-history', label: 'Billing History' }
  ];

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        setLoading(true);
        const data = await subscriptionService.getPlanDetails();
        setPlan(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, []);

  if (loading && !plan) {
    return (
      <PageContainer>
        <PageLoader />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title="CRM License Subscription"
          description="View active license levels, seat capacities, and renew contracts."
          breadcrumbs={breadcrumbs}
          actions={
            <>
              <Button
                variant="secondary"
                size="sm"
                leadingIcon={UserPlus}
                onClick={() => alert('Opening purchase seat dialog...')}
              >
                Add User Seats
              </Button>
              <Button
                variant="primary"
                size="sm"
                leadingIcon={ArrowUpCircle}
                onClick={() => alert('Opening licensing upgrade pipeline...')}
              >
                Upgrade License Plan
              </Button>
            </>
          }
        />

        <Tabs
          tabs={subTabs}
          activeTab=""
          onChange={(tabId) => navigate(`/company-admin/subscription/${tabId}`)}
        />

        <Grid cols={{ default: 1, lg: 3 }} gap={6}>
          {/* Main Plan Overview */}
          <div className="lg:col-span-2 space-y-6">
            <Card title={`${plan.name} Account Summary`} hoverable>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary-50 text-primary-600 rounded-lg">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-neutral-800">{plan.name}</p>
                      <p className="text-xs text-neutral-500">Corporate License Tier</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-neutral-900">{plan.cost}</p>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase">{plan.billingCycle} Cycle</p>
                  </div>
                </div>

                <Divider />

                <div className="text-xs space-y-2">
                  <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">Plan Features Include</span>
                  <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                    {plan.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            <Card title="User Seat Utilizations">
              <div className="space-y-4 text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-neutral-500 font-semibold">User Seats Occupied</span>
                  <span className="font-bold text-neutral-800">
                    {plan.seatsUsed} / {plan.seatsTotal} Active Seats
                  </span>
                </div>
                <div className="w-full bg-neutral-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-primary-500 h-full rounded-full" style={{ width: `${(plan.seatsUsed / plan.seatsTotal) * 100}%` }} />
                </div>
                <p className="text-[10px] text-neutral-400">You have {plan.seatsTotal - plan.seatsUsed} remaining seats available to assign sales employees.</p>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card title="Payment Information">
              <Stack space={4} className="text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 font-medium">Account Status</span>
                  <span className="crm-badge-success">{plan.status}</span>
                </div>
                <Divider />
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 font-medium">Billing Renewal Date</span>
                  <span className="font-bold text-neutral-700">{plan.renewalDate}</span>
                </div>
                <Divider />
                <div className="flex items-center gap-2 text-neutral-600 bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <CreditCard className="w-5 h-5 text-neutral-400" />
                  <div>
                    <p className="font-bold">Auto-renew active</p>
                    <p className="text-[10px] text-neutral-400">MasterCard ending in *4242</p>
                  </div>
                </div>
              </Stack>
            </Card>
          </div>
        </Grid>
      </Stack>
    </PageContainer>
  );
}
