import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { CheckSquare, Calendar, User, Clock, CheckCircle, Edit3, Trash2 } from 'lucide-react';

export function TaskDetails() {
  const task = {
    id: 'TSK-901',
    title: 'Review Q3 Team Targets & Quotas',
    assignedTo: 'Self (Manager)',
    createdBy: 'Director of Sales',
    dueDate: 'Today, 5:00 PM',
    priority: 'High',
    status: 'In Progress',
    relatedTo: 'Team Strategy',
    description: 'Perform a comprehensive audit of current representative quotas vs achieved closed-won numbers for Q3. Adjust high-tier lead allocation for top performers.',
  };

  const activityLog = [
    { id: 1, action: 'Status updated to In Progress', time: 'Jul 30, 2026 - 10:15 AM', user: 'Manager' },
    { id: 2, action: 'Task created and assigned', time: 'Jul 29, 2026 - 04:00 PM', user: 'Director of Sales' },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Task Details"
        subtitle={`Viewing task #${task.id}`}
        actions={
          <>
            <Button variant="secondary" icon={CheckCircle}>Mark Complete</Button>
            <Button variant="primary" icon={Edit3}>Edit Task</Button>
          </>
        }
      />

      {/* Main Info */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
              <Badge variant="primary">{task.status}</Badge>
              <Badge variant="danger">{task.priority} Priority</Badge>
            </div>
            <p className="text-xs text-gray-500">Task ID: {task.id} • Category: {task.relatedTo}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t md:border-t-0 border-gray-200 pt-4 md:pt-0">
            <div>
              <span className="text-xs text-gray-400 block">Due Date</span>
              <span className="text-sm font-bold text-red-600 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {task.dueDate}
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-400 block">Assigned Representative</span>
              <span className="text-sm font-semibold text-gray-900">{task.assignedTo}</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Task Description & Objective">
            <p className="text-sm text-gray-700 leading-relaxed">{task.description}</p>
          </Card>

          <Card title="Task Activity History">
            <div className="space-y-3">
              {activityLog.map((log) => (
                <div key={log.id} className="p-3 border border-gray-100 rounded-lg text-xs space-y-0.5 bg-gray-50/50">
                  <p className="font-semibold text-gray-800">{log.action}</p>
                  <p className="text-gray-500">{log.time} • By: {log.user}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Task Meta">
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-400 block">Created By</span>
                <span className="font-medium text-gray-800">{task.createdBy}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Priority</span>
                <span className="font-medium text-gray-800">{task.priority}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Current Status</span>
                <span className="font-medium text-gray-800">{task.status}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
