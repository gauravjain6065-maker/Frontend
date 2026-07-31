import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Trash2 } from 'lucide-react';
import { PageContainer, PageHeader, Card, Stack } from '../../../components/layout';
import { DataTable, Pagination, FilterBar, ActionMenu, ConfirmationModal } from '../../../components/ui';
import { employeeService } from '../../../services/employeeService';

export default function EmployeeList() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [sortCol, setSortCol] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Employees' }
  ];

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const data = await employeeService.getAll();
        setEmployees(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // Filtering
  const filteredEmployees = employees.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) || 
                          e.email.toLowerCase().includes(search.toLowerCase()) ||
                          e.role.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const columns = [
    { key: 'name', label: 'Employee Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role Title', sortable: true },
    { key: 'manager', label: 'Supervisor Manager', sortable: true },
    { key: 'leadsCount', label: 'Leads count', sortable: true }
  ];

  const handleSort = (columnKey) => {
    const direction = sortCol === columnKey && sortDir === 'asc' ? 'desc' : 'asc';
    setSortCol(columnKey);
    setSortDir(direction);
    setLoading(true);
    setTimeout(() => {
      const sorted = [...employees].sort((a, b) => {
        const valA = String(a[columnKey]);
        const valB = String(b[columnKey]);
        return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
      setEmployees(sorted);
      setLoading(false);
    }, 300);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const updated = await employeeService.delete(selectedEmp.id);
      setEmployees(updated);
      setIsDeleteOpen(false);
      alert('Employee account suspended successfully.');
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
      onClick: () => navigate(`/company-admin/employees/${row.id}`)
    },
    {
      label: 'Suspend access',
      icon: Trash2,
      onClick: () => {
        setSelectedEmp(row);
        setIsDeleteOpen(true);
      },
      danger: true
    }
  ];

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title="Employees"
          description="Manage corporate sales representatives, view closed deals and pipeline targets."
          breadcrumbs={breadcrumbs}
        />

        <Card>
          <Stack space={4}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <FilterBar
                searchPlaceholder="Search representatives..."
                searchValue={search}
                onSearchChange={setSearch}
              />
            </div>

            <DataTable
              columns={columns}
              data={filteredEmployees}
              loading={loading}
              sortColumn={sortCol}
              sortDirection={sortDir}
              onSort={handleSort}
              actions={(row) => <ActionMenu items={getRowActions(row)} />}
            />

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-neutral-500 font-medium">
                Showing {filteredEmployees.length} employee accounts
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
        title="Suspend Employee Account"
        message={`Are you sure you want to suspend access credentials for "${selectedEmp?.name}"? They will lose all active dashboard access.`}
        confirmText="Confirm Suspension"
        loading={loading}
      />
    </PageContainer>
  );
}
