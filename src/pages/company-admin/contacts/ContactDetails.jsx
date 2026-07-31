import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, User, Phone, Mail, Briefcase } from 'lucide-react';
import { PageContainer, PageHeader, Card, Grid, Stack, Divider, PageLoader } from '../../../components/layout';
import { InfoCard, StatusBadge, Button } from '../../../components/ui';
import { contactService } from '../../../services/contactService';

export default function ContactDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        const data = await contactService.getById(id);
        setContact(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, [id]);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Contacts', href: '/company-admin/contacts' },
    { label: contact ? contact.name : 'Loading...' }
  ];

  if (loading && !contact) {
    return (
      <PageContainer>
        <PageLoader />
      </PageContainer>
    );
  }

  const infoItems = contact ? [
    { label: 'Email Address', value: contact.email },
    { label: 'Phone Number', value: contact.phone },
    { label: 'Associated Company', value: contact.organization },
    { label: 'Operational Role', value: contact.role },
    { label: 'Deal Owner Representative', value: contact.owner },
    { label: 'Creation date', value: contact.dateCreated }
  ] : [];

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title={contact.name}
          description="Account contact card and communication parameters."
          breadcrumbs={breadcrumbs}
          actions={
            <Button
              variant="secondary"
              size="sm"
              leadingIcon={Edit}
              onClick={() => navigate(`/company-admin/contacts/${contact.id}/edit`)}
            >
              Edit Contact Card
            </Button>
          }
          leftSection={
            <div className="w-14 h-14 rounded-full bg-primary-100 border border-primary-200 text-primary-700 flex items-center justify-center font-bold text-lg">
              {contact.name.split(' ').map(n => n[0]).join('')}
            </div>
          }
        />

        <Grid cols={{ default: 1, lg: 3 }} gap={6}>
          {/* Main info card spans 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            <InfoCard
              title="Stakeholder Profile Information"
              items={infoItems}
              cols={2}
            />
          </div>

          {/* Sidebar status card spans 1 col */}
          <div className="space-y-6">
            <Card title="Status Summary">
              <Stack space={4}>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 font-medium">Record Verification status</span>
                  <StatusBadge status={contact.status} />
                </div>
              </Stack>
            </Card>
          </div>
        </Grid>
      </Stack>
    </PageContainer>
  );
}
