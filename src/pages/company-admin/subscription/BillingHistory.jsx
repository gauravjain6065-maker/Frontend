import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, FileText } from 'lucide-react';
import { PageContainer, PageHeader, Card, Stack } from '../../../components/layout';
import { DataTable, Tabs, ActionMenu } from '../../../components/ui';
import { subscriptionService } from '../../../services/subscriptionService';

export default function BillingHistory() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Subscription', href: '/company-admin/subscription' },
    { label: 'Billing History' }
  ];

  const subTabs = [
    { id: '', label: 'Current Plan' },
    { id: 'billing-history', label: 'Billing History' }
  ];

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const data = await subscriptionService.getBillingHistory();
        setInvoices(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  const columns = [
    { key: 'id', label: 'Invoice ID', sortable: false },
    { key: 'date', label: 'Bill Date', sortable: true },
    { key: 'amount', label: 'Invoice Amount', sortable: true },
    { key: 'status', label: 'Payment Status', sortable: true },
    { key: 'method', label: 'Payment Method', sortable: false }
  ];

  const getRowActions = (row) => [
    { label: 'Print Invoice', icon: FileText, onClick: () => alert(`Printing invoice ${row.id}...`) },
    { label: 'Download PDF', icon: Download, onClick: () => alert(`Downloading PDF invoice ${row.id}...`) }
  ];

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title="Billing History"
          description="View recent invoices, payment statuses, and print billing summaries."
          breadcrumbs={breadcrumbs}
        />

        <Tabs
          tabs={subTabs}
          activeTab="billing-history"
          onChange={(tabId) => navigate(`/company-admin/subscription/${tabId}`)}
        />

        <Card>
          <DataTable
            columns={columns}
            data={invoices}
            loading={loading}
            renderRowActions={(row) => <ActionMenu items={getRowActions(row)} />}
          />
        </Card>
      </Stack>
    </PageContainer>
  );
}
