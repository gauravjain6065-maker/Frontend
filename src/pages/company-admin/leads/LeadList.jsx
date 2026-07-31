import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Edit, UserPlus, Trash2 } from 'lucide-react';
import { PageContainer, PageHeader, Card, Stack } from '../../../components/layout';
import { DataTable, Pagination, Button, FilterBar, ActionMenu, ConfirmationModal } from '../../../components/ui';
import { leadService } from '../../../services/leadService';

export default function LeadList() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [sortCol, setSortCol] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Leads' }
  ];

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const data = await leadService.getAll();
        setLeads(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  // Filtering
  const filteredLeads = leads.filter(l => {
    return l.name.toLowerCase().includes(search.toLowerCase()) || 
           l.company.toLowerCase().includes(search.toLowerCase()) ||
           l.stage.toLowerCase().includes(search.toLowerCase());
  });

  const columns = [
    { key: 'name', label: 'Lead Name', sortable: true },
    { key: 'company', label: 'Organization', sortable: true },
    { key: 'value', label: 'Deal Value', sortable: true },
    { key: 'owner', label: 'Deal Owner', sortable: true },
    { key: 'stage', label: 'Pipeline Stage', sortable: true }
  ];

  const handleSort = (columnKey) => {
    const direction = sortCol === columnKey && sortDir === 'asc' ? 'desc' : 'asc';
    setSortCol(columnKey);
    setSortDir(direction);
    setLoading(true);
    setTimeout(() => {
      const sorted = [...leads].sort((a, b) => {
        const valA = String(a[columnKey]);
        const valB = String(b[columnKey]);
        return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
      setLeads(sorted);
      setLoading(false);
    }, 300);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const updated = await leadService.delete(selectedLead.id);
      setLeads(updated);
      setIsDeleteOpen(false);
      alert('Lead entry deleted.');
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
      onClick: () => navigate(`/company-admin/leads/${row.id}`)
    },
    {
      label: 'Edit details',
      icon: Edit,
      onClick: () => navigate(`/company-admin/leads/${row.id}/edit`)
    },
    {
      label: 'Assign owner',
      icon: UserPlus,
      onClick: () => navigate(`/company-admin/leads/${row.id}/assign`)
    },
    {
      label: 'Delete lead',
      icon: Trash2,
      onClick: () => {
        setSelectedLead(row);
        setIsDeleteOpen(true);
      },
      danger: true
    }
  ];

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title="Leads"
          description="Manage active pipeline contracts, customer targets, and assigned team reps."
          breadcrumbs={breadcrumbs}
          actions={
            <Button
              variant="primary"
              size="sm"
              leadingIcon={Plus}
              onClick={() => navigate('/company-admin/leads/create')}
            >
              Add Lead
            </Button>
          }
        />

        <Card>
          <Stack space={4}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <FilterBar
                searchPlaceholder="Search leads..."
                searchValue={search}
                onSearchChange={setSearch}
              />
            </div>

            <DataTable
              columns={columns}
              data={filteredLeads}
              loading={loading}
              sortColumn={sortCol}
              sortDirection={sortDir}
              onSort={handleSort}
              actions={(row) => <ActionMenu items={getRowActions(row)} />}
            />

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-neutral-500 font-medium">
                Showing {filteredLeads.length} pipeline items
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
        title="Delete Lead Entry"
        message={`Are you sure you want to permanently delete lead "${selectedLead?.name}"? All associated communications history will be purged.`}
        confirmText="Confirm Purge"
        loading={loading}
      />
    </PageContainer>
  );
}
