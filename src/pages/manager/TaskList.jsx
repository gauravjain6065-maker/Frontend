import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Table } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Plus } from 'lucide-react';

export function TaskList({ onNavigate }) {
  const navigate = (page) => {
    if (onNavigate) onNavigate(page);
  };

  const tasks = [
    { id: 'TSK-901', title: 'Review Q3 Team Targets & Quotas', assignedTo: 'Self (Manager)', relatedTo: 'Team Strategy', dueDate: 'Today, 5:00 PM', priority: 'High', status: 'In Progress' },
    { id: 'TSK-902', title: 'Approve Enterprise Lead Allocation', assignedTo: 'Sarah Jenkins', relatedTo: 'Acme Corp Lead', dueDate: 'Tomorrow, 12:00 PM', priority: 'Medium', status: 'Pending' },
    { id: 'TSK-903', title: 'Schedule Client Onboarding Sync', assignedTo: 'David Kim', relatedTo: 'Apex Innovations', dueDate: 'Aug 02, 2026', priority: 'High', status: 'Pending' },
    { id: 'TSK-904', title: 'Send Contract Proposal Document', assignedTo: 'Alex Rivera', relatedTo: 'Starlight Tech', dueDate: 'Jul 29, 2026', priority: 'Low', status: 'Completed' },
    { id: 'TSK-905', title: 'Conduct Weekly Representative Review', assignedTo: 'Self (Manager)', relatedTo: 'Sales Ops', dueDate: 'Aug 05, 2026', priority: 'Medium', status: 'In Progress' },
  ];

  const columns = [
    {
      header: 'Task Title',
      accessorKey: 'title',
      render: (row) => (
        <div onClick={() => navigate('TaskDetails')} className="cursor-pointer hover:underline">
          <span className="font-semibold text-gray-900 block">{row.title}</span>
          <span className="text-xs text-gray-500">{row.id} • Related: {row.relatedTo}</span>
        </div>
      ),
    },
    { header: 'Assigned To', accessorKey: 'assignedTo' },
    { header: 'Due Date', accessorKey: 'dueDate' },
    {
      header: 'Priority',
      accessorKey: 'priority',
      render: (row) => (
        <Badge variant={row.priority === 'High' ? 'danger' : row.priority === 'Medium' ? 'warning' : 'neutral'}>
          {row.priority}
        </Badge>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      render: (row) => (
        <Badge variant={row.status === 'Completed' ? 'success' : row.status === 'In Progress' ? 'primary' : 'warning'}>
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Task Management"
        subtitle="Monitor, assign, and track operational tasks across team members."
        actions={
          <Button variant="primary" icon={Plus} onClick={() => navigate('CreateTask')}>
            Create Task
          </Button>
        }
      />

      <Table
        columns={columns}
        data={tasks}
        searchPlaceholder="Search tasks by title, assignee, or ID..."
        filters={true}
        sortOptions={true}
        totalItems={tasks.length}
        onViewRow={() => navigate('TaskDetails')}
        onEditRow={() => alert('Edit task details')}
        onDeleteRow={(row) => alert(`Deleted task: ${row.title}`)}
      />
    </div>
  );
}
