import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, CheckCircle, Trash2 } from 'lucide-react';
import { PageContainer, PageHeader, Card, Stack } from '../../../components/layout';
import { DataTable, Pagination, Button, FilterBar, ActionMenu, ConfirmationModal } from '../../../components/ui';
import { taskService } from '../../../services/taskService';

export default function TaskList() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [sortCol, setSortCol] = useState('subject');
  const [sortDir, setSortDir] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Tasks' }
  ];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await taskService.getAll();
        setTasks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Filtering
  const filteredTasks = tasks.filter(t => {
    return t.subject.toLowerCase().includes(search.toLowerCase()) || 
           t.leadName.toLowerCase().includes(search.toLowerCase()) ||
           t.assignedTo.toLowerCase().includes(search.toLowerCase());
  });

  const columns = [
    { key: 'subject', label: 'Task Subject', sortable: true },
    { key: 'leadName', label: 'Associated Deal', sortable: true },
    { key: 'dueDate', label: 'Due Date', sortable: true },
    { key: 'priority', label: 'Priority', sortable: true },
    { key: 'assignedTo', label: 'Assigned To', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];

  const handleSort = (columnKey) => {
    const direction = sortCol === columnKey && sortDir === 'asc' ? 'desc' : 'asc';
    setSortCol(columnKey);
    setSortDir(direction);
    setLoading(true);
    setTimeout(() => {
      const sorted = [...tasks].sort((a, b) => {
        const valA = String(a[columnKey]);
        const valB = String(b[columnKey]);
        return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
      setTasks(sorted);
      setLoading(false);
    }, 300);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const updated = await taskService.delete(selectedTask.id);
      setTasks(updated);
      setIsDeleteOpen(false);
      alert('Task deleted successfully.');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (row) => {
    try {
      const updated = await taskService.update(row.id, { status: 'Completed' });
      // Fetch latest list to display
      const latest = await taskService.getAll();
      setTasks(latest);
      alert('Task status updated to Completed.');
    } catch (err) {
      console.error(err);
    }
  };

  const getRowActions = (row) => {
    const actions = [
      {
        label: 'View Details',
        icon: Eye,
        onClick: () => navigate(`/company-admin/tasks/${row.id}`)
      }
    ];

    if (row.status !== 'Completed') {
      actions.push({
        label: 'Mark Completed',
        icon: CheckCircle,
        onClick: () => handleComplete(row)
      });
    }

    actions.push({
      label: 'Delete Task',
      icon: Trash2,
      onClick: () => {
        setSelectedTask(row);
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
          title="Tasks Checklist"
          description="Track pipeline activities, scheduled followups, and close-deal targets."
          breadcrumbs={breadcrumbs}
          actions={
            <Button
              variant="primary"
              size="sm"
              leadingIcon={Plus}
              onClick={() => navigate('/company-admin/tasks/create')}
            >
              Add Task
            </Button>
          }
        />

        <Card>
          <Stack space={4}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <FilterBar
                searchPlaceholder="Search task subjects..."
                searchValue={search}
                onSearchChange={setSearch}
              />
            </div>

            <DataTable
              columns={columns}
              data={filteredTasks}
              loading={loading}
              sortColumn={sortCol}
              sortDirection={sortDir}
              onSort={handleSort}
              actions={(row) => <ActionMenu items={getRowActions(row)} />}
            />

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-neutral-500 font-medium">
                Showing {filteredTasks.length} tasks
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
        title="Delete Checklist Task"
        message={`Are you sure you want to delete task "${selectedTask?.subject}"? This item will be removed permanently.`}
        confirmText="Confirm Deletion"
        loading={loading}
      />
    </PageContainer>
  );
}
