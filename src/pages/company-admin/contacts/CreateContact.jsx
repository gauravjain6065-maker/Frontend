import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, PageHeader, Card, Stack } from '../../../components/layout';
import ContactForm from './components/ContactForm';
import { contactService } from '../../../services/contactService';

export default function CreateContact() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Contacts', href: '/company-admin/contacts' },
    { label: 'Create Contact' }
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await contactService.create(values);
      alert(`Contact "${values.name}" created successfully.`);
      navigate('/company-admin/contacts');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title="Add Contact Person"
          description="Register a new individual stakeholder associated with accounts."
          breadcrumbs={breadcrumbs}
        />

        <Card>
          <ContactForm onSubmit={handleSubmit} loading={loading} />
        </Card>
      </Stack>
    </PageContainer>
  );
}
