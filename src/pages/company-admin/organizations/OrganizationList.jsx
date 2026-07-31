import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { PageContainer, PageHeader, Card, Stack } from '../../../components/layout';
import { DataTable, Pagination, Button, FilterBar, ActionMenu, ConfirmationModal } from '../../../components/ui';
import { organizationService } from '../../../services/organizationService';

export default function OrganizationList() {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [search, setSearch] = useState('');
  const [sortCol, setSortCol] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Organizations' }
  ];

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        setLoading(true);
        const data = await organizationService.getAll();
        setOrganizations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrgs();
  }, []);

  // Filtering
  const filteredOrgs = organizations.filter(o => {
    return o.name.toLowerCase().includes(search.toLowerCase()) || 
           o.domain.toLowerCase().includes(search.toLowerCase()) ||
           o.industry.toLowerCase().includes(search.toLowerCase());
  });

  const columns = [
    { key: 'name', label: 'Company Name', sortable: true },
    { key: 'domain', label: 'Domain', sortable: true },
    { key: 'industry', label: 'Industry', sortable: true },
    { key: 'employees', label: 'Employees', sortable: true },
    { key: 'leadsCount', label: 'Active Leads', sortable: true },
    { key: 'contactsCount', label: 'Contacts', sortable: true }
  ];

  const handleSort = (columnKey) => {
    const direction = sortCol === columnKey && sortDir === 'asc' ? 'desc' : 'asc';
    setSortCol(columnKey);
    setSortDir(direction);
    setLoading(true);
    setTimeout(() => {
      const sorted = [...organizations].sort((a, b) => {
        const valA = String(a[columnKey]);
        const valB = String(b[columnKey]);
        return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
      setOrganizations(sorted);
      setLoading(false);
    }, 300);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const updated = await organizationService.delete(selectedOrg.id);
      setOrganizations(updated);
      setIsDeleteOpen(false);
      alert('Organization account removed.');
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
      onClick: () => navigate(`/company-admin/organizations/${row.id}`)
    },
    {
      label: 'Edit details',
      icon: Edit,
      onClick: () => navigate(`/company-admin/organizations/${row.id}/edit`)
    },
    {
      label: 'Delete organization',
      icon: Trash2,
      onClick: () => {
        setSelectedOrg(row);
        setIsDeleteOpen(true);
      },
      danger: true
    }
  ];

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title="Organizations"
          description="Manage client company directory profiles, associate staff members, and track deal accounts."
          breadcrumbs={breadcrumbs}
          actions={
            <Button
              variant="primary"
              size="sm"
              leadingIcon={Plus}
              onClick={() => navigate('/company-admin/organizations/create')}
            >
              Add Organization
            </Button>
          }
        />

        <Card>
          <Stack space={4}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <FilterBar
                searchPlaceholder="Search organizations..."
                searchValue={search}
                onSearchChange={setSearch}
              />
            </div>

            <DataTable
              columns={columns}
              data={filteredOrgs}
              loading={loading}
              sortColumn={sortCol}
              sortDirection={sortDir}
              onSort={handleSort}
              actions={(row) => <ActionMenu items={getRowActions(row)} />}
            />

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-neutral-500 font-medium">
                Showing {filteredOrgs.length} companies
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
        title="Remove Organization Account"
        message={`Are you sure you want to permanently delete "${selectedOrg?.name}"? All associated contacts and deals will be unlinked.`}
        confirmText="Confirm Deletion"
        loading={loading}
      />
    </PageContainer>
  );
}
