import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageContainer, PageHeader, Card, Stack, PageLoader } from '../../../components/layout';
import ContactForm from './components/ContactForm';
import { contactService } from '../../../services/contactService';

export default function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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
    { label: contact ? contact.name : 'Edit Contact' }
  ];

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      await contactService.update(contact.id, values);
      alert(`Contact "${values.name}" updated successfully.`);
      navigate('/company-admin/contacts');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !contact) {
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
          title="Edit Contact"
          description={`Update email routing or phone directory records for ${contact?.name || 'Contact'}.`}
          breadcrumbs={breadcrumbs}
        />

        <Card>
          <ContactForm
            initialValues={contact}
            onSubmit={handleSubmit}
            isEdit
            loading={submitting}
          />
        </Card>
      </Stack>
    </PageContainer>
  );
}
