import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { PageContainer, PageHeader, Card, Stack } from '../../../components/layout';
import { DataTable, Pagination, Button, FilterBar, ActionMenu, ConfirmationModal } from '../../../components/ui';
import { contactService } from '../../../services/contactService';

export default function ContactList() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [sortCol, setSortCol] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Contacts' }
  ];

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const data = await contactService.getAll();
        setContacts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  // Filtering
  const filteredContacts = contacts.filter(c => {
    return c.name.toLowerCase().includes(search.toLowerCase()) || 
           c.email.toLowerCase().includes(search.toLowerCase()) ||
           c.organization.toLowerCase().includes(search.toLowerCase());
  });

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone', sortable: true },
    { key: 'organization', label: 'Organization', sortable: true },
    { key: 'role', label: 'Job Role', sortable: true }
  ];

  const handleSort = (columnKey) => {
    const direction = sortCol === columnKey && sortDir === 'asc' ? 'desc' : 'asc';
    setSortCol(columnKey);
    setSortDir(direction);
    setLoading(true);
    setTimeout(() => {
      const sorted = [...contacts].sort((a, b) => {
        const valA = String(a[columnKey]);
        const valB = String(b[columnKey]);
        return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
      setContacts(sorted);
      setLoading(false);
    }, 300);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const updated = await contactService.delete(selectedContact.id);
      setContacts(updated);
      setIsDeleteOpen(false);
      alert('Contact removed successfully.');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRowActions = (row) => [
    {
      label: 'View details',
      icon: Eye,
      onClick: () => navigate(`/company-admin/contacts/${row.id}`)
    },
    {
      label: 'Edit details',
      icon: Edit,
      onClick: () => navigate(`/company-admin/contacts/${row.id}/edit`)
    },
    {
      label: 'Remove contact',
      icon: Trash2,
      onClick: () => {
        setSelectedContact(row);
        setIsDeleteOpen(true);
      },
      danger: true
    }
  ];

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title="Contacts"
          description="Manage strategic partner accounts, leads delegates, and account directors."
          breadcrumbs={breadcrumbs}
          actions={
            <Button
              variant="primary"
              size="sm"
              leadingIcon={Plus}
              onClick={() => navigate('/company-admin/contacts/create')}
            >
              Add Contact
            </Button>
          }
        />

        <Card>
          <Stack space={4}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <FilterBar
                searchPlaceholder="Search contacts..."
                searchValue={search}
                onSearchChange={setSearch}
              />
            </div>

            <DataTable
              columns={columns}
              data={filteredContacts}
              loading={loading}
              sortColumn={sortCol}
              sortDirection={sortDir}
              onSort={handleSort}
              actions={(row) => <ActionMenu items={getRowActions(row)} />}
            />

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-neutral-500 font-medium">
                Showing {filteredContacts.length} contacts
              </span>
              <Pagination
                currentPage={page}
                totalPages={1}
                onPageChange={setPage}
              />
            </div>
          </Stack>
        </Card>
      </Stack>

      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Remove Contact Record"
        message={`Are you sure you want to permanently delete "${selectedContact?.name}" from your records? This cannot be undone.`}
        confirmText="Confirm Deletion"
        loading={loading}
      />
    </PageContainer>
  );
}
