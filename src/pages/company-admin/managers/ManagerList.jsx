import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { PageContainer, PageHeader, Card, Stack } from '../../../components/layout';
import { DataTable, Pagination, Button, FilterBar, ActionMenu, ConfirmationModal } from '../../../components/ui';
import { managerService } from '../../../services/managerService';

export default function ManagerList() {
  const navigate = useNavigate();
  const [managers, setManagers] = useState([]);
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortCol, setSortCol] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedManager, setSelectedManager] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Managers' }
  ];

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        setLoading(true);
        const data = await managerService.getAll();
        setManagers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchManagers();
  }, []);

  // Filtering
  const filteredManagers = managers.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || 
                          m.email.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'leadsCount', label: 'Assigned Leads', sortable: true },
    { key: 'employeesCount', label: 'Direct Reports', sortable: true }
  ];

  const handleSort = (columnKey) => {
    const direction = sortCol === columnKey && sortDir === 'asc' ? 'desc' : 'asc';
    setSortCol(columnKey);
    setSortDir(direction);
    setLoading(true);
    setTimeout(() => {
      const sorted = [...managers].sort((a, b) => {
        const valA = String(a[columnKey]);
        const valB = String(b[columnKey]);
        return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
      setManagers(sorted);
      setLoading(false);
    }, 300);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const updated = await managerService.delete(selectedManager.id);
      setManagers(updated);
      setIsDeleteOpen(false);
      alert('Manager removed successfully.');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRowActions = (row) => [
    { label: 'View Profile', icon: Eye, onClick: () => navigate(`/company-admin/managers/${row.id}`) },
    { label: 'Edit Account', icon: Edit, onClick: () => navigate(`/company-admin/managers/${row.id}/edit`) },
    { 
      label: 'Delete Manager', 
      icon: Trash2, 
      danger: true, 
      onClick: () => {
        setSelectedManager(row);
        setIsDeleteOpen(true);
      }
    }
  ];

  return (
    <PageContainer>
      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Manager Account"
        message={`Are you sure you want to delete the manager account for ${selectedManager?.name}? Direct report employees will need to be re-assigned.`}
      />

      <Stack space={6}>
        <PageHeader
          title="CRM Managers"
          description="View and administer regional managers and corporate sales operations pipelines."
          breadcrumbs={breadcrumbs}
          actions={
            <Button
              variant="primary"
              size="sm"
              leadingIcon={Plus}
              onClick={() => navigate('/company-admin/managers/create')}
            >
              Add Manager
            </Button>
          }
        />

        <Card>
          <FilterBar
            searchQuery={search}
            onSearchChange={(e) => setSearch(e.target.value)}
            onSearchClear={() => setSearch('')}
            placeholder="Search managers..."
          />
        </Card>

        <Card>
          <DataTable
            columns={columns}
            data={filteredManagers}
            loading={loading}
            sortColumn={sortCol}
            sortDirection={sortDir}
            onSort={handleSort}
            onRowClick={(row) => navigate(`/company-admin/managers/${row.id}`)}
            renderRowActions={(row) => <ActionMenu items={getRowActions(row)} />}
          />
          <Pagination
            currentPage={page}
            totalItems={filteredManagers.length}
            pageSize={5}
            onPageChange={setPage}
          />
        </Card>
      </Stack>
    </PageContainer>
  );
}
