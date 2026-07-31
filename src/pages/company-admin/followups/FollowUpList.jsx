import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, CheckCircle, Trash2 } from 'lucide-react';
import { PageContainer, PageHeader, Card, Stack } from '../../../components/layout';
import { DataTable, Pagination, Button, FilterBar, ActionMenu, ConfirmationModal } from '../../../components/ui';
import { followupService } from '../../../services/followupService';

export default function FollowUpList() {
  const navigate = useNavigate();
  const [followups, setFollowups] = useState([]);
  const [search, setSearch] = useState('');
  const [sortCol, setSortCol] = useState('date');
  const [sortDir, setSortDir] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedFollow, setSelectedFollow] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Follow-ups' }
  ];

  useEffect(() => {
    const fetchFollowups = async () => {
      try {
        setLoading(true);
        const data = await followupService.getAll();
        setFollowups(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFollowups();
  }, []);

  // Filtering
  const filteredFollowups = followups.filter(f => {
    return f.subject.toLowerCase().includes(search.toLowerCase()) || 
           f.clientName.toLowerCase().includes(search.toLowerCase()) ||
           f.type.toLowerCase().includes(search.toLowerCase());
  });

  const columns = [
    { key: 'type', label: 'Type', sortable: true },
    { key: 'subject', label: 'Subject', sortable: true },
    { key: 'clientName', label: 'Client Partner', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'time', label: 'Time', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];

  const handleSort = (columnKey) => {
    const direction = sortCol === columnKey && sortDir === 'asc' ? 'desc' : 'asc';
    setSortCol(columnKey);
    setSortDir(direction);
    setLoading(true);
    setTimeout(() => {
      const sorted = [...followups].sort((a, b) => {
        const valA = String(a[columnKey]);
        const valB = String(b[columnKey]);
        return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
      setFollowups(sorted);
      setLoading(false);
    }, 300);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const updated = await followupService.delete(selectedFollow.id);
      setFollowups(updated);
      setIsDeleteOpen(false);
      alert('Follow-up schedule removed.');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (row) => {
    try {
      await followupService.update(row.id, { status: 'Completed' });
      const latest = await followupService.getAll();
      setFollowups(latest);
      alert('Follow-up status marked as Completed.');
    } catch (err) {
      console.error(err);
    }
  };

  const getRowActions = (row) => {
    const actions = [];

    if (row.status !== 'Completed') {
      actions.push({
        label: 'Mark Completed',
        icon: CheckCircle,
        onClick: () => handleComplete(row)
      });
    }

    actions.push({
      label: 'Delete Follow-up',
      icon: Trash2,
      onClick: () => {
        setSelectedFollow(row);
        setIsDeleteOpen(true);
      },
      danger: true
    });

    return actions;
  };

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title="Follow-ups"
          description="Schedule customer engagement calls, follow-up emails, and strategy sync meetings."
          breadcrumbs={breadcrumbs}
          actions={
            <Button
              variant="primary"
              size="sm"
              leadingIcon={Plus}
              onClick={() => navigate('/company-admin/followups/create')}
            >
              Schedule Follow-up
            </Button>
          }
        />

        <Card>
          <Stack space={4}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <FilterBar
                searchPlaceholder="Search follow-up subjects..."
                searchValue={search}
                onSearchChange={setSearch}
              />
            </div>

            <DataTable
              columns={columns}
              data={filteredFollowups}
              loading={loading}
              sortColumn={sortCol}
              sortDirection={sortDir}
              onSort={handleSort}
              actions={(row) => <ActionMenu items={getRowActions(row)} />}
            />

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-neutral-500 font-medium">
                Showing {filteredFollowups.length} scheduled items
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
        title="Remove Follow-up Schedule"
        message={`Are you sure you want to cancel the scheduled followup "${selectedFollow?.subject}"?`}
        confirmText="Confirm Cancellation"
        loading={loading}
      />
    </PageContainer>
  );
}
